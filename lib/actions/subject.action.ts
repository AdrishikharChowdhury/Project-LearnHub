"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export interface SubjectData {
  id: string;
  name: string;
  display_name: string;
  color: string;
  icon_url: string;
  description: string;
  is_default: boolean;
  is_public: boolean;
  created_by: string | null;
}

export const getSubjects = async (): Promise<SubjectData[]> => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .or(`is_public.eq.true,created_by.eq.${userId}`)
    .order("is_default", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getSubject = async (name: string): Promise<SubjectData | null> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("name", name)
    .single();

  if (error) return null;
  return data;
};

export const createSubject = async (formData: {
  name: string;
  display_name: string;
  color: string;
  description?: string;
  is_public: boolean;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const supabase = createSupabaseClient();

  const iconUrl = `https://api.dicebear.com/10.x/adventurer/svg?seed=${encodeURIComponent(formData.display_name)}-${formData.color.replace("#", "")}&size=40`;

  const { data, error } = await supabase
    .from("subjects")
    .insert({
      name: formData.name,
      display_name: formData.display_name,
      color: formData.color,
      icon_url: iconUrl,
      description: formData.description || "",
      is_default: false,
      is_public: formData.is_public,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};


