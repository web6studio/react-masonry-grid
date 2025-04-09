import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../api";

const usePhotos = (query = "") => {
  return useInfiniteQuery({
    queryKey: ["photos", query],
    queryFn: ({ pageParam = 1 }) => fetchPhotos(pageParam, 30, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page ? lastPage.page + 1 : undefined;
    },
    retry: false,
  });
};

export default usePhotos;
