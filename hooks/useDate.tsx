import { useCallback } from 'react';
import dateFnsFormat from 'date-fns/format';
import enUS from 'date-fns/locale/en-US/index';
import tr from 'date-fns/locale/tr';
import { useLocale } from 'next-intl';

export default function useDate() {
  const locale = useLocale();

  const format = useCallback(
    (date: Date, format: string) => {
      return dateFnsFormat(date, format, {
        locale: locale === 'tr' ? tr : enUS,
      });
    },
    [locale]
  );

  return {
    format,
  };
}
