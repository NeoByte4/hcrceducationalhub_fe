"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  redirectRoute?: string;
  extraParams?: Record<string, string>;
}

const KeywordSearch = ({
  redirectRoute = routes.program,
  extraParams,
}: Props) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = keyword.trim();
    const params: Record<string, string> = { ...(extraParams ?? {}) };

    if (trimmed) {
      params.keyword = trimmed;
    }

    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `${redirectRoute}?${queryString}#results`
      : `${redirectRoute}#results`;

    router.push(url);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 w-full">
      <Input
        type="text"
        placeholder="Type here to Search..."
        value={keyword}
        className="p-2"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Button type="submit">
        <Search size={16} />
        Search
      </Button>
    </form>
  );
};

export default KeywordSearch;
