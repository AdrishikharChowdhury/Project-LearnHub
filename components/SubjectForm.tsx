"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubject } from "@/lib/actions/subject.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const SubjectForm = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState("#FFDA6E");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = displayName.toLowerCase().replace(/\s+/g, "-");
    await createSubject({ name, display_name: displayName, color, description, is_public: isPublic });
    router.push("/companions/new");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
          <Input
            id="display-name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="e.g. Physics"
            required
            autoComplete="off"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="subject-color">Color</FieldLabel>
          <input
            id="subject-color"
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="h-10 w-20 cursor-pointer rounded-lg border"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Brief description of the subject"
            className="resize-none"
          />
        </Field>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={e => setIsPublic(e.target.checked)}
            className="size-4"
          />
          <span className="text-sm">Make this subject visible to everyone</span>
        </label>
      </FieldGroup>
      <Button type="submit" className="w-full cursor-pointer">Create Subject</Button>
    </form>
  );
};

export default SubjectForm;
