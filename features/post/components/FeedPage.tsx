"use client";

import { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePost";
import { PostCard } from "./PostCard";
import FloatingNav from "@/shared/components/floating-nav/FloatingNav";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setToken(Cookies.get("auth_token"));
    setMounted(true);
    router.refresh();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col items-center gap-10 py-10">
      {data?.pages.map((page) =>
        page.data.posts.map((post) => <PostCard key={post.id} post={post} />),
      )}

      <div ref={loadMoreRef} />

      {isFetchingNextPage && (
        <p className="text-sm text-muted-foreground">Loading more posts...</p>
      )}
      {mounted && token && <FloatingNav />}
    </div>
  );
}
