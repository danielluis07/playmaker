"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { useSearch } from "@/hooks/use-search";
import { useRouter } from "next/navigation";

export const SearchSheet = () => {
  const [query, setQuery] = useState<string>("");
  const { isOpen, onClose } = useSearch();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
    router.push(`/search?q=${query}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top">
        <div className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="flex items-center h-12">
            <Input
              className="h-12 focus-visible:ring-0 border-black"
              placeholder="Procurar..."
              onChange={handleChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center border-t border-r border-b border-black w-14 h-full">
              <IoSearchOutline className="mx-auto" />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
