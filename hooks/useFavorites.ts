import { useCallback, useMemo } from 'react';
import { IBoat } from '@/interfaces/boat.interface';
import { useAppDispatch } from '@/store/hooks';
import {
  useAddFavoritesMutation,
  useDeleteFavoritesMutation,
  useGetFavoritesQuery,
} from '@/store/services/favoritesService';
import { toggleAuthModal } from '@/store/states/appState';
import useGtm from './gtm/useGtm';
import useUser from './useUser';

type Props = {
  boatId: number;
  boatData: IBoat;
  itemListName?: string;
  itemListID?: string;
};

export default function useFavorites({
  boatData,
  boatId,
  itemListID,
  itemListName,
}: Props) {
  const { user } = useUser();
  const { data = [] } = useGetFavoritesQuery(undefined, {
    skip: !user?.ID,
  });
  const dispatch = useAppDispatch();
  const [trigerAddFav] = useAddFavoritesMutation();
  const [trigerDeleteFav] = useDeleteFavoritesMutation();
  const { onAddToWishlist } = useGtm();

  const favorites = useMemo(() => {
    return data?.map((item) => item.BoatID);
  }, [data]);

  const isFavorited = useMemo(
    () => favorites?.includes(boatId),
    [favorites, boatId]
  );

  const handleToggleAuthModal = useCallback(() => {
    dispatch(toggleAuthModal());
  }, [dispatch]);

  const onToggle = useCallback(async () => {
    if (user) {
      if (favorites?.includes(boatId)) {
        await trigerDeleteFav({ BoatID: boatId }).unwrap();
      } else {
        await trigerAddFav({ BoatID: boatId }).unwrap();
        if (boatData && itemListID && itemListName) {
          onAddToWishlist({
            boat: [boatData],
            itemListID: itemListID,
            itemListName: itemListName,
          });
        }
      }
    } else {
      handleToggleAuthModal();
    }
  }, [
    trigerAddFav,
    trigerDeleteFav,
    user,
    handleToggleAuthModal,
    favorites,
    boatId,
    itemListID,
    itemListName,
    onAddToWishlist,
    boatData,
  ]);

  return {
    onToggle,
    isFavorited,
    favorites,
  };
}
