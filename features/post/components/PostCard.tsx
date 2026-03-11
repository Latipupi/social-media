import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import type { Post } from "../types/post";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="w-full  space-y-3">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Image
          src={post.author.avatarUrl || "/avatar.png"}
          alt={post.author.name}
          width={36}
          height={36}
          className="rounded-full"
        />

        <div>
          <p className="text-sm font-medium">{post.author.username}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl">
        <Image
          src={post.imageUrl}
          alt="post"
          width={500}
          height={500}
          className="w-full object-cover"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="flex items-center gap-1 text-sm">
            <Heart className="w-4 h-4" />
            {post.likeCount}
          </div>

          <div className="flex items-center gap-1 text-sm">
            <MessageCircle className="w-4 h-4" />
            {post.commentCount}
          </div>

          <Send className="w-4 h-4" />
        </div>

        <Bookmark className="w-4 h-4" />
      </div>

      {/* CAPTION */}
      <div className="text-sm">
        <span className="font-medium">{post.author.username}</span>{" "}
        {post.caption}
      </div>
    </div>
  );
}
