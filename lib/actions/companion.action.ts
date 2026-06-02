"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import da from "zod/v4/locales/da.cjs";
import { mergeConsecutiveSameRoleMessages } from "../utils";

export const sessionRecorded = async (
  messages: SavedMessage[],
  companionId: string,
) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();
  messages = mergeConsecutiveSameRoleMessages(messages);

  const { data, error } = await supabase
    .from("session_messages")
    .insert({
      author,
      messages,
      companion_id: companionId,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to save session messages");
  }

  return data; // Returns all inserted records
};

export const createCompanion = async (formatData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formatData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.error(error);

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();
  let query = supabase.from("companions").select().eq("author",userId);

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .order("created_at", { ascending: false })
    .limit(limit)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const getUserHistory = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_messages")
    .select("id,companion_id,created_at")
    .eq("author", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const getMessages = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_messages")
    .select("messages")
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data[0];
};

export const sessionHistoryPermission = async () => {
  const { has } = await auth();
  if (has({ plan: "champion" })) {
    return true;
  } else if (has({ feature: "save_conversation_history" })) {
    return true;
  } else if (has({ plan: "bugcatcher" })) {
    return false;
  }
};

export const quizPermission = async () => {
  const { has } = await auth();
  if (has({ plan: "champion" })) {
    return true;
  } else if (has({ feature: "inline_quizzes_recaps" })) {
    return true;
  } else if (has({ plan: "elite" })) {
    return true;
  } else {
    return false;
  }
};

export const newCompanionPermission = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();
  let limit = 0;
  if (has({ plan: "champion" })) {
    return true;
  } else if (has({ feature: "5_active_companions" })) {
    limit = 5;
  } else if (has({ feature: "20_active_companions" })) {
    limit = 20;
  } else if (has({ feature: "40_active_companions" })) {
    limit = 40;
  } else if (has({ feature: "60_active_companions" })) {
    limit = 60;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);
  const companionCount = data?.length;

  if (companionCount > limit) {
    return false;
  } else {
    return true;
  }
};

export const getCompanionSession = async (companionId: string) => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();
  const { count, error } = await supabase
    .from("session_history")
    .select("id", { count: "exact", head: true })
    .eq("companion_id", companionId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return (count ?? 0) >= 5;
};
