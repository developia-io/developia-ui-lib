import { useCallback, useMemo } from 'react';
import { getCookie } from 'cookies-next';
import currencyFormatter, { findCurrency } from 'currency-formatter';
import Decimal from 'decimal.js';
import LocaleCurrency from 'locale-currency';
import { useGetExchangeRatesQuery } from '@/store/services/reservationService';
import getNavigatorLanguage from '@/utils/getNavigatorLanguage';
import { CURRENCY_KEY } from '@/constants/app';

type Props = {
  itemCurrencyName?: string;
};

const useCurrency = (
  { itemCurrencyName }: Props = { itemCurrencyName: 'USD' }
) => {
  const userCurrencyName =
    getCookie(CURRENCY_KEY) ??
    LocaleCurrency.getCurrency(getNavigatorLanguage());

  const { data: rates = [], isLoading } = useGetExchangeRatesQuery({
    base: 'USD',
  });

  const exchangeRates = useMemo(
    () => ({
      item:
        rates?.find(
          (item) => item.base === 'USD' && item.currency === itemCurrencyName
        )?.rate ?? 1,
      user:
        rates?.find(
          (item) => item.base === 'USD' && item.currency === userCurrencyName
        )?.rate ?? 1,
    }),
    [rates, itemCurrencyName, userCurrencyName]
  );

  const symbol = useMemo(
    () => findCurrency(userCurrencyName)?.symbol ?? '$',
    [userCurrencyName]
  );

  const price = useCallback(
    (priceNum: number, fixed = 2, customExchangeRate?: number) => {
      if (isLoading) {
        return ' ';
      }

      const priceConvertedToUSD = new Decimal(priceNum).div(
        customExchangeRate ? customExchangeRate : exchangeRates.item
      );

      const priceConvertedToUserCurrency = priceConvertedToUSD
        .mul(exchangeRates.user)
        .toNumber();

      return currencyFormatter.format(priceConvertedToUserCurrency, {
        code: userCurrencyName,
        precision: fixed,
      });
    },
    [exchangeRates, userCurrencyName, isLoading]
  );

  const priceConvertToUSD = useCallback(
    (priceNum: number, fixed = 2) => {
      if (isLoading) {
        return 0;
      }
      const priceConvertedToUSD = new Decimal(priceNum).div(exchangeRates.user);
      return priceConvertedToUSD.toFixed(fixed);
    },
    [exchangeRates, isLoading]
  );

  const priceWithoutSymbol = useCallback(
    (priceNum: number, fixed = 2) => {
      if (!priceNum) {
        return priceNum;
      }

      if (isLoading) {
        return 0;
      }

      const priceConvertedToUSD = new Decimal(priceNum).div(exchangeRates.item);

      const priceConvertedToUserCurrency = priceConvertedToUSD
        .mul(exchangeRates.user)
        .toNumber();

      return priceConvertedToUserCurrency.toFixed(fixed);
    },
    [exchangeRates, isLoading]
  );

  return {
    price,
    priceWithoutSymbol,
    priceConvertToUSD,
    currencyName: userCurrencyName,
    symbol,
  };
};
export default useCurrency;
