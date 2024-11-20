import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavoritePets, updatefavoritesPets } from "../apis/pets";
import FavoritePetLists from "./FavoritePetLists";
import { useCallback, memo } from "react";
import Loading from "./Loading";

function Favorites() {
  const queryClient = useQueryClient();

  const {
    data: favoritePets = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["favoritePets"],
    queryFn: () => fetchFavoritePets(),
  });

  const handleRemovePet = useCallback(
    async (petId) => {
      try {
        await updatefavoritesPets(petId);
        queryClient.setQueryData(["favoritePets"], (oldData) =>
          oldData.filter((pet) => {
            return pet._id !== petId;
          })
        );
      } catch (error) {
        console.error("Error removing pet:", error);
      }
    },
    [queryClient]
  );

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="favorites-container">
      <FavoritePetLists pets={favoritePets} onRemovePet={handleRemovePet} />
    </div>
  );
}

export default memo(Favorites);
