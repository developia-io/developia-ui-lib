'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IEmbedProvider } from '@/interfaces/embedProvider.interface';
import { getEmbedParams } from '@/utils/embedParams';

export default function useEmbedParams() {
  const host = typeof window === 'undefined' ? '' : window.location.host;
  const embedParams = getEmbedParams(host);

  const params = useSearchParams();
  const [state, setState] = useState<IEmbedProvider>(() => {
    const storedData = JSON.parse(
      typeof window !== 'undefined'
        ? sessionStorage.getItem('embedParams') || '{}'
        : '{}'
    );

    return { ...embedParams, ...storedData };
  });

  useEffect(() => {
    const newState = {
      ...state,
      isHideHeader: params.get('hide_header')
        ? params.get('hide_header') === '1'
        : state.isHideHeader,
      isHideFooter: params.get('hide_footer')
        ? params.get('hide_footer') === '1'
        : state.isHideFooter,
      isHideBottomNavigationBar: params.get('hide_bottom_navigation_bar')
        ? params.get('hide_bottom_navigation_bar') === '1'
        : state.isHideBottomNavigationBar,
      isHideFAQ: params.get('hide_faq')
        ? params.get('hide_faq') === '1'
        : state.isHideFAQ,
      isHideLogo: params.get('hide_logo')
        ? params.get('hide_logo') === '1'
        : state.isHideLogo,
      source: params.get('source')
        ? params.get('source') || 'self'
        : state.source,
    };

    setState(newState);
    typeof window !== 'undefined' &&
      sessionStorage.setItem('embedParams', JSON.stringify(newState));
  }, [params]);

  return state;
}
