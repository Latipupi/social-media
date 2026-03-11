"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
//import { Link, useNavigate } from "react-router-dom";
//import { useSearchDropdown } from "../../features/book-store/hooks/use-book-detail";
//import { useDebounce } from "use-debounce";
//import type { Book } from "@/features/book-store/types/book";

export const SearchBar = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  //const [debouncedSearch] = useDebounce(text, 500);
  //const navigate = useNavigate();

  //const { data: results, isLoading } = useSearchDropdown(debouncedSearch);

  const handleSelectBook = (id: number) => {
    //navigate(`/book/${id}`);
    setText(""); // Reset input setelah klik
    setIsFocused(false);
  };

  //console.log(results, "result");

  return (
    <div className="w-122 hidden md:block">
      <div className="relative rounded-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search"
          value={text}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setText(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-neutral-500 transition-all bg-neutral-900 border-neutral-900"
        />
        {/* {isLoading && debouncedSearch && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-slate-400" />
        )} */}
      </div>

      {/* Dropdown Hasil Pencarian */}
      {/* {isFocused && debouncedSearch.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          {results && results?.books?.length > 0 ? (
            <div className="py-2">
              {results?.books?.map((book: Book) => (
                <button
                  key={book.id}
                  onMouseDown={() => handleSelectBook(book.id)} // Gunakan onMouseDown agar terpicu sebelum onBlur
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {book.author.name}
                    </p>
                  </div>
                </button>
              ))}
              <div className="border-t px-4 py-2 bg-slate-50">
                <Link
                  to={`/?q=${debouncedSearch}`}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Lihat semua hasil...
                </Link>
              </div>
            </div>
          ) : !isLoading ? (
            <div className="p-4 text-center text-sm text-slate-500">
              Buku "{debouncedSearch}" tidak ditemukan.
            </div>
          ) : null}
        </div>
      )} */}
    </div>
  );
};
