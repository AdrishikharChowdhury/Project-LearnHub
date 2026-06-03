import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/api";
import { string } from "zod";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

interface Conversation {
  role: string;
  content: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
  
                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [] as unknown as CreateAssistantDTO["clientMessages"],
    serverMessages: [] as unknown as CreateAssistantDTO["serverMessages"],
  };
  return vapiAssistant;
};

export const mergeConsecutiveSameRoleMessages = (
  messages: SavedMessage[],
): SavedMessage[] => {
  if (messages.length === 0) return [];

  const merged: SavedMessage[] = [];
  let current = { ...messages[0] };

  for (let i = 1; i < messages.length; i++) {
    const next = messages[i];
    if (next.role === current.role) {
      // Append with a space, then clean up extra whitespace
      current.content = `${current.content} ${next.content}`.trim();
    } else {
      merged.push(current);
      current = { ...next };
    }
  }

  // Don't forget the last accumulated message
  merged.push(current);
  return merged;
};

export const formatTimestamp = (
  timestamp: string | Date,
  locale: string = "en-US",
) => {
  const date = new Date(timestamp);

  return date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getAssistantMessages = (messages: SavedMessage[]) =>
  messages.filter((m) => m.role !== "user");
