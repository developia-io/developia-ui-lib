import { useCallback } from 'react';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';
import {
  useGetUserQuery,
  useLogoutMutation,
} from '@/store/services/authService';
import { logoutFunc } from '@/utils/baseQuery';
import { REFRESH_AUTH_KEY } from '@/constants/app';

export default function useUser() {
  const token = useAppSelector((state) => state.app.accessToken);
  const [triggerLogout] = useLogoutMutation();
  // const dispatch = useAppDispatch();
  const { data, isFetching } = useGetUserQuery(undefined, {
    skip: !token,
  });

  const logout = useCallback(async () => {
    try {
      await triggerLogout({
        refreshToken: getCookie(REFRESH_AUTH_KEY) as string,
      }).unwrap();

      logoutFunc();
    } catch (error) {
      throw error;
    }
  }, [triggerLogout]);

  return {
    isLoggedIn: token,
    user: data,
    logout,
    isFetching,
  };
}
