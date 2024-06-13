import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { usePathValue } from '@/app/navigation';
import { getSource } from '@/utils/getSource';
import useUser from '../useUser';
import useGtm from './useGtm';

export default function useGtmSocialLogin() {
  const pathname = usePathValue(false);
  const { locale } = useParams();

  const searchParams = useSearchParams();
  const { onAuth } = useGtm();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const isSocialLoginSuccess = searchParams.get('socialLoginSuccess');
    const method = searchParams.get('method');

    if (isSocialLoginSuccess && user && method) {
      const isNewUser = searchParams.get('isNewUser');
      const platform = searchParams.get('platform') ?? '';
      const source = getSource();

      onAuth({
        eventName: isNewUser === '1' ? 'sign_up' : 'login',
        method: 'social',
        userID: String(user.ID),
        platform,
        platformName: source,
      });

      params.delete('socialLoginSuccess');
      params.delete('method');
      params.delete('isNewUser');
      params.delete('platform');

      router.replace(`/${locale}/${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [searchParams, user, pathname, locale]);

  return {};
}
