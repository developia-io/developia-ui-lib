import { useCallback } from 'react';
import { useGetBoatByIdQuery } from '@/store/services/boatService';
import {
  useGetBasePriceQuery,
  useGetCurrencyListQuery,
} from '@/store/services/pricingService';
import { DAILY_BOAT_SERVICE_ID } from '@/constants/boats';

const getCurrencySymbol = (currencyName: string) => {
  switch (currencyName) {
    case 'EUR':
      return '€';
    case 'TRY':
      return '₺';
    default:
    case 'USD':
      return '$';
  }
};

const useBoatCurrency = (boatId: number) => {
  const { data: boat } = useGetBoatByIdQuery(
    {
      boatId: boatId,
    },
    {
      skip: !boatId,
    }
  );

  const { data = [] } = useGetCurrencyListQuery(
    {
      isDaily: boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID,
    },
    {
      skip: !boat,
    }
  );

  const { data: basePrice } = useGetBasePriceQuery(
    {
      boatId: boatId,
      isDaily: boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID,
    },
    {
      skip: !boat,
    }
  );

  const currencyName =
    data?.find((item) => item.ID === basePrice?.PriceCurrencyID)?.Name ?? 'USD';

  const currencyId = data?.find(
    (item) => item.ID === basePrice?.PriceCurrencyID
  )?.ID;

  const symbol = getCurrencySymbol(currencyName);

  const price = useCallback(
    (price?: number, customCurrencyId?: number) => {
      let _currencyName = currencyName;

      if (customCurrencyId) {
        _currencyName =
          data?.find((item) => item.ID === customCurrencyId)?.Name ?? 'USD';
      }

      return price
        ? price.toLocaleString('en-US', {
            style: 'currency',
            currency: _currencyName,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : `${symbol}0`;
    },
    [symbol, currencyName, data]
  );

  return {
    currencyId,
    currencyName,
    symbol,
    price,
  };
};
export default useBoatCurrency;
