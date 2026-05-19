"use server";

import { auth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";
import { error } from "next/dist/build/output/log";
import { createSupabaseClient } from "../supabase";
import { getAssistantMessages } from "../utils";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateQuiz = async (companionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User Not Found");
  const supabase = createSupabaseClient();
  const { data: sessions, error: sessionsError } = await supabase
    .from("session_messages")
    .select("messages,created_at")
    .eq("companion_id", companionId)
    .eq("author", userId)
    .order("created_at", { ascending: true });

  if (sessionsError) throw new Error(sessionsError.message);
  const allMessages: SavedMessage[] = sessions.flatMap(
    (s) => s.messages as SavedMessage[],
  );
  const trimmed = allMessages.slice(-200);
  const tutorMessages = getAssistantMessages(trimmed);
  const transcript = tutorMessages.map((m) => `Tutor: ${m.content}`).join("\n");

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are a quiz generator. Based on the tutoring conversation below, generate 10 multiple-choice questions testing key concepts.
        Return ONLY a valid JSON array. No markdown, no explanation, no extra text.
        Each object must have:
        - "question": string
        - "options": [4 strings]
        - "correctAnswer": number (0-3)
        - "explanation": string`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("No response from Groq");
  const questions: QuizQuestion[] = JSON.parse(content);
  return questions;
};

export const saveQuizScore = async (companionId: string, score: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const supabase = createSupabaseClient();
  // Read current scores
  const { data, error: fetchError } = await supabase
    .from("companions")
    .select("score_data")
    .eq("id", companionId)
    .single();
  if (fetchError) throw new Error(fetchError.message);
  const existing = (data?.score_data as QuizScoreEntry[]) ?? [];
  const updated = [
    ...existing,
    { score, completed_at: new Date().toISOString() },
  ];
  const { error: updateError } = await supabase
    .from("companions")
    .update({ score_data: updated })
    .eq("id", companionId);
  if (updateError) throw new Error(updateError.message);
};
