"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";
  const [searchQuery, setsearchQuery] = useState(query);

  useEffect(() => {
    setsearchQuery(query);
  }, [query]);

  useEffect(() => {
    const searchInterval = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(searchInterval);
  }, [searchQuery]);

  return (
    <div className="relative border boder-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        type="text"
        placeholder="Search Companions"
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
