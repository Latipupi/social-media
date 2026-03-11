import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, fetchPosts } from "../services/postService";

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });
}

export const usePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      console.error("Mutation Error:", error);
    },
  });
};
