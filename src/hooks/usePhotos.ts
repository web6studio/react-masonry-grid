import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../api";

const usePhotos = () => {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam = 1 }) => fetchPhotos(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page ? lastPage.page + 1 : undefined;
    },
    retry: false,
  });
};

export default usePhotos;
