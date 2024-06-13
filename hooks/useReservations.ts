import { useCallback, useMemo } from 'react';
import { IReservation } from '@/interfaces/reservation.interface';
import useUser from '@/hooks/useUser';
import { useGetReservationsQuery } from '@/store/services/reservationService';
import { useGetReviewsByGuestQuery } from '@/store/services/reviewService';
import { useDayjs } from '@/utils/dayjs';

const useReservations = () => {
  const { user } = useUser();
  const { data: reviews } = useGetReviewsByGuestQuery(
    { GuestID: user?.ID || 0 },
    { skip: !user?.ID }
  );
  const { data: allReservationsData, isFetching } = useGetReservationsQuery();
  const dayjs = useDayjs();

  const reservations = useMemo(() => {
    return (allReservationsData ?? []).filter(
      (i) => user?.ID === i.guestInfo?.ID
    );
  }, [allReservationsData, user]);

  const allReservations = useMemo(() => {
    return (reservations ?? []).filter(
      (i) =>
        !['DRAFT_BOOKING', 'TIMEOUT', 'BOOKING_DECLINED', 'MESSAGE'].includes(
          i.reservation?.Status || ''
        )
    );
  }, [reservations]);

  const completedReservations = useMemo(() => {
    return (reservations ?? []).filter((i) =>
      ['BOOKING_COMPLETED'].includes(i.reservation?.Status || '')
    );
  }, [reservations]);

  const cancelledReservations = useMemo(() => {
    return (reservations ?? []).filter((i) =>
      ['BOOKING_CANCELLED'].includes(i.reservation?.Status || '')
    );
  }, [reservations]);

  const upcomingReservations = useMemo(() => {
    const now = dayjs();
    return (reservations ?? []).filter(
      (i) =>
        ['BOOKING_ACCEPTED'].includes(i.reservation?.Status || '') &&
        dayjs(i.reservation?.CheckInDay).isAfter(now)
    );
  }, [reservations, dayjs]);

  const hostingReservations = useMemo(() => {
    const now = dayjs();
    return (reservations ?? []).filter(
      (i) =>
        ['BOOKING_ACCEPTED'].includes(i.reservation?.Status || '') &&
        dayjs(i.reservation?.CheckOutDay).isAfter(now) &&
        dayjs(i.reservation?.CheckInDay).isBefore(now)
    );
  }, [reservations, dayjs]);

  const actionsReservations = useMemo(() => {
    return (reservations ?? []).filter(
      (i) =>
        ['BOOKING_REQUESTED'].includes(i.reservation?.Status || '') ||
        (['BOOKING_ACCEPTED', 'BOOKING_DECLINED'].includes(
          i.reservation?.Status || ''
        ) &&
          dayjs().diff(i.reservation.ApprovalDate, 'day') < 7)
    );
  }, [reservations, dayjs]);

  const checkingOutReservations = useMemo(() => {
    const now = dayjs();
    return (reservations ?? []).filter((reservation) => {
      const checkoutDate = dayjs(reservation.reservation?.CheckOutDay);
      const daysUntilCheckout = checkoutDate.diff(now, 'day');
      return (
        reservation.reservation?.Status === 'BOOKING_ACCEPTED' &&
        daysUntilCheckout === 0
      );
    });
  }, [reservations, dayjs]);

  const pendingReviewReservations = useMemo(() => {
    return (reservations ?? [])
      .filter((i) =>
        ['BOOKING_COMPLETED'].includes(i.reservation?.Status || '')
      )
      .filter((i) => {
        return !(reviews?.commentsByGuestList ?? []).some(
          (j) => j.ConfirmationCode === i.reservation?.ConfirmationCode
        );
      });
  }, [reservations, reviews]);

  const bookingRequestedReservations = useMemo(() => {
    return (reservations ?? []).filter((i) =>
      ['BOOKING_REQUESTED', 'INSTANT_BOOKING_REQUESTED'].includes(
        i.reservation?.Status || ''
      )
    );
  }, [reservations]);

  const checkIsCancelable = useCallback(
    (item: IReservation) => {
      if (
        item.Status &&
        [
          'BOOKING_REQUESTED',
          'INSTANT_BOOKING_REQUESTED',
          'BOOKING_ACCEPTED',
        ].includes(item.Status)
      ) {
        const now = dayjs();
        return dayjs(item.CheckInDay).isAfter(now);
      }

      return false;
    },
    [dayjs]
  );

  const statusName = useCallback((status: string) => {
    switch (status) {
      case 'BOOKING_REQUESTED':
        return 'Trip Request';
      case 'INSTANT_BOOKING_REQUESTED':
        return 'Instant Booking Request';
      case 'BOOKING_ACCEPTED':
        return 'New guest';
      case 'BOOKING_COMPLETED':
        return 'Post guest';
      default:
        return 'Other';
    }
  }, []);

  return {
    bookingRequestedReservations,
    pendingReviewReservations,
    cancelledReservations,
    checkingOutReservations,
    completedReservations,
    hostingReservations,
    upcomingReservations,
    allReservations,
    actionsReservations,
    statusName,
    isFetching,
    reservations,
    checkIsCancelable,
  };
};

export default useReservations;
