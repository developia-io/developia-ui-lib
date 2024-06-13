import { useGetBoatByIdQuery } from '@/store/services/boatService';

type Props = {
  boatId: number;
};
const useBoatDetail = ({ boatId }: Props) => {
  const { data: boat, isFetching } = useGetBoatByIdQuery(
    { boatId: boatId },
    { skip: !boatId }
  );

  return {
    boat,
    isFetching,
  };
};

export default useBoatDetail;
