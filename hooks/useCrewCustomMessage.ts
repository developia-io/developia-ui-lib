import { useCallback } from 'react';
import { useRouter } from '@/app/navigation';
import { ICrewDetail } from '@/interfaces/crew.interface';
import { useAppDispatch } from '@/store/hooks';
import { useSendCustomMessageMutation } from '@/store/services/chatService';
import { setErrorMessage, toggleAuthModal } from '@/store/states/appState';
import useUser from './useUser';

export default function useCrewCustomMessage({ data }: { data: ICrewDetail }) {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [trigger] = useSendCustomMessageMutation();
  const router = useRouter();

  const handleToggleAuthModal = useCallback(() => {
    dispatch(toggleAuthModal());
  }, [dispatch]);

  const handleSend = useCallback(async () => {
    if (user) {
      try {
        await trigger({
          senderUid: String(user.ID),
          receiver: String(data.ID),
          data: {
            status: 'CREW',
            text: `The boat owner wants to contact you`,
          },
        }).unwrap();

        if (window.innerWidth < 1024) {
          router.push('/inbox');
        } else {
          window.open('/inbox', '_blank');
        }
      } catch (error: any) {
        dispatch(setErrorMessage(error?.data?.message));
        throw error;
      }
    } else {
      handleToggleAuthModal();
    }
  }, [data, trigger, user, handleToggleAuthModal, dispatch, router]);

  return {
    onSendCrew: handleSend,
  };
}
