import { useQuery } from "@tanstack/react-query";
import { fetchPhotoById } from "../api";

const usePhoto = (id: string | undefined) => {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoById(id!),
    enabled: !!id,
    retry: false,
  });
};

export default usePhoto;
