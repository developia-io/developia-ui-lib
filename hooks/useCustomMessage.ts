import { useCallback } from 'react';
import { useRouter } from '@/app/navigation';
import { IBoatDetail } from '@/interfaces/boat.interface';
import { useAppDispatch } from '@/store/hooks';
import { useSendCustomMessageMutation } from '@/store/services/chatService';
import { setErrorMessage, toggleAuthModal } from '@/store/states/appState';
import useBoatCalendarAvailability from './useBoatCalendarAvailability';
import useTrack from './useTrack';
import useUser from './useUser';

export default function useCustomMessage(data: IBoatDetail) {
  const { user } = useUser();
  const { selectedDates } = useBoatCalendarAvailability(data);
  const dispatch = useAppDispatch();
  const { contactHostLog } = useTrack();
  const [trigger] = useSendCustomMessageMutation();
  const router = useRouter();

  const handleToggleAuthModal = useCallback(() => {
    dispatch(toggleAuthModal());
  }, [dispatch]);

  const handleSend = useCallback(async () => {
    if (user) {
      try {
        const res = await trigger({
          senderUid: String(user.ID),
          receiver: String(data.Host.UserID),
          data: {
            hostId: String(data.Host.UserID),
            checkInDay: selectedDates?.startDate,
            checkOutDay: selectedDates?.endDate,
            status: 'MESSAGE',
            text: `Your inquiry on ${selectedDates?.startDate} - ${selectedDates?.endDate} has been sent.`,
            boatID: data.ID,
            startTime: selectedDates?.startTime || '',
            endTime: selectedDates?.endTime || '',
            boatName: data?.Name || '',
          },
        }).unwrap();
        const values = res.data.data;
        contactHostLog({
          ChatId: values?.conversationId,
          SelectedDates: `${selectedDates.startDate} - ${selectedDates.endDate}`,
          VisitedProductId: data.ID,
        });

        if (window.innerWidth < 1024) {
          router.push('/inbox');
        } else {
          window.open('/inbox', '_blank');
        }

        // document.removeChild(a);
      } catch (error: any) {
        dispatch(setErrorMessage(error?.data?.message));
        throw error;
      }
    } else {
      handleToggleAuthModal();
    }
  }, [
    data,
    trigger,
    user,
    selectedDates,
    handleToggleAuthModal,
    contactHostLog,
    dispatch,
    router,
  ]);

  const handleSendRoutesPdp = useCallback(
    async ({
      routeID,
      routeName,
      guestCount,
    }: {
      routeID: number;
      routeName: string;
      guestCount: number;
    }) => {
      if (user) {
        try {
          await trigger({
            senderUid: String(user.ID),
            receiver: String(data.Host.UserID),
            data: {
              hostId: String(data.Host.UserID),
              checkInDay: selectedDates?.startDate,
              checkOutDay: selectedDates?.endDate,
              status: 'ROUTE',
              text: `Your inquiry on Route ${selectedDates.startDate} - ${selectedDates.endDate} has been sent.`,
              boatID: data.ID,
              startTime: selectedDates?.startTime || '',
              endTime: selectedDates?.endTime || '',
              routeID: routeID,
              routeName: routeName || '',
              guestCount: guestCount || 1,
              boatName: data?.Name || '',
            },
          }).unwrap();

          if (window.innerWidth < 1024) {
            router.push('/inbox');
          } else {
            window.open('/inbox', '_blank');
          }

          // document.removeChild(a);
        } catch (error: any) {
          dispatch(setErrorMessage(error?.data?.message));
          throw error;
        }
      } else {
        handleToggleAuthModal();
      }
    },
    [
      data,
      trigger,
      user,
      selectedDates,
      handleToggleAuthModal,
      contactHostLog,
      dispatch,
      router,
    ]
  );

  return {
    onSend: handleSend,
    onSendRoutes: handleSendRoutesPdp,
  };
}
