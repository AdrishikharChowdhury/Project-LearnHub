"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getSubjects, type SubjectData } from "@/lib/actions/subject.action";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "all";
  const [subject, setsubject] = useState(query);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  useEffect(() => {
    const searchInterval = setTimeout(() => {
        let newUrl=""
      if (subject==="all" || !subject) {
        newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });

          router.push(newUrl, { scroll: false });
        
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(searchInterval);
  }, [subject]);
  return (
    <Select value={subject} onValueChange={(value) => setsubject(value ?? "")}>
      <SelectTrigger className="capitalize input">
        <SelectValue placeholder="Choose Subject" className="input" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all' >All Subjects</SelectItem>
        {subjects.map((s) => (
          <SelectItem value={s.name} className="capitalize" key={s.id}>
            {s.display_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
