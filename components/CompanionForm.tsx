"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
import * as z from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { voices } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.action";
import { getSubjects, type SubjectData } from "@/lib/actions/subject.action";
import { redirect } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is Required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
});

const CompanionForm = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 10,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const companion=await createCompanion(data)

    if(companion){
      redirect(`/companions/${companion.id}`)
    }else{
      console.log("Failed to create a companion")
      redirect("/")
    }
  };
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Companion Name:
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter the Companion name"
                autoComplete="off"
                className="input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Subject</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                
              >
                <SelectTrigger className="capitalize input">
                  <SelectValue placeholder="Choose Subject" className="input" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem value={s.name} className='capitalize' key={s.id}>
                      <div className="flex items-center gap-2">
                        {s.icon_url && (
                          <img src={s.icon_url} alt="" width={20} height={20} className="rounded-full size-5" />
                        )}
                        {s.display_name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/subjects/new" className="block text-xs text-center mt-1 text-primary underline">
                + Add New Subject
              </Link>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">What should the companion help with?</FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Ex. Derivatives & Integrals"
                autoComplete="off"
                className="input resize-none"
                
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="voice"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Voice:</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                
              >
                <SelectTrigger className="capitalize input">
                  <SelectValue placeholder="Choose The Voice" className="input" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male' className='capitalize' >Male</SelectItem>
                  <SelectItem value='female' className='capitalize'>Female</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="style"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Style:</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                
              >
                <SelectTrigger className="capitalize input">
                  <SelectValue placeholder="Choose The Style" className="input" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='formal' className='capitalize' >formal</SelectItem>
                  <SelectItem value='casual' className='capitalize'>casual</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className='w-full cursor-pointer mt-4 py-5' type="submit">Build Your Companion</Button>
    </form>
  );
};

export default CompanionForm;
