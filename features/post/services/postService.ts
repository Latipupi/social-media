import api from "@/lib/api";
import { PostsResponse } from "../types/post";

export const fetchPosts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<PostsResponse> => {
  const res = await api.get(`/posts?page=${pageParam}&limit=10`);
  return res.data;
};

export const createPost = async (formData: FormData) => {
  const res = await api.post("/posts", formData);
  return res.data;
};
