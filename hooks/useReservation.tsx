import { useMemo } from 'react';
import { IBoatDetail } from '@/interfaces/boat.interface';
import {
  IGetReservationByConfirmationCodeResponse,
  IReservationDailyPrice,
} from '@/interfaces/reservation.interface';
import Decimal from 'decimal.js';
import { useTranslations } from 'next-intl';
import { useDayjs } from '@/utils/dayjs';
import useCurrency from './useCurrency';

export default function useReservation(
  reservation: IGetReservationByConfirmationCodeResponse,
  boat: IBoatDetail
) {
  const t = useTranslations();
  const { price, currencyName } = useCurrency({
    itemCurrencyName: 'USD',
  });
  const dayjs = useDayjs();

  const isDaily = useMemo(
    () => reservation?.reservation?.IsExperience,
    [reservation]
  );

  const startDate = useMemo(
    () => new Date(reservation.reservation.CheckInDay),
    [reservation]
  );
  const endDate = useMemo(
    () => new Date(reservation.reservation.CheckOutDay),
    [reservation]
  );

  const prepaymentAmount = useMemo(
    () =>
      new Decimal(reservation?.reservation?.TotalPrice)
        .mul(new Decimal(boat.PrePaymentRate ?? 0).div(100))
        .toNumber(),
    [reservation, boat]
  );

  const isOffer = useMemo(
    () => reservation?.reservation?.IsOffer,
    [reservation]
  );

  const isHost = useMemo(
    () => reservation?.reservation?.IsHost ?? false,
    [reservation]
  );

  const isRequest = useMemo(
    () =>
      [
        'INSTANT_BOOKING_PRE_REQUESTED',
        'INSTANT_BOOKING_REQUESTED',
        'BOOKING_REQUESTED',
      ]?.includes(reservation?.reservation?.Status ?? ''),
    [reservation]
  );

  const totalNight = useMemo(
    () =>
      dayjs(reservation?.reservation.CheckOutDay).diff(
        dayjs(reservation?.reservation.CheckInDay),
        'day'
      ),
    [reservation, dayjs]
  );

  const label = useMemo(() => {
    switch (reservation?.reservation?.Status) {
      case 'BOOKING_ACCEPTED':
        return 'accepted';
      case 'BOOKING_REQUESTED':
        return 'pending';
      case 'INSTANT_BOOKING_REQUESTED':
        return 'pending';
      case 'BOOKING_DECLINED':
        return 'declined';
    }
  }, [reservation]);

  const payableInBaseTotalAmount = useMemo(
    () =>
      reservation?.reservationAddon?.reduce(
        (prev, curr) => (prev += curr.PayableInBase ? curr.TotalPrice : 0),
        0
      ) ?? 0,
    [reservation]
  );

  const costs = useMemo(() => {
    const costsArr: {
      title: string | React.ReactElement;
      value: number;
      isTotal?: boolean;
    }[] = [];

    if (isOffer && !isHost) {
      if (isDaily) {
        costsArr.push({
          title: 'price',
          value:
            (reservation?.reservation?.HourlyPrice ?? 0) *
            (reservation?.reservation?.TicketCount || 1),
        });

        costsArr.push({
          title: 'photoPackage',
          value: reservation?.reservation?.PhotoPackagePrice ?? 0,
        });

        costsArr.push({
          title: 'foodAndBeverage',
          value: reservation?.reservation?.FoodAndBeveragePrice ?? 0,
        });
      } else {
        const dailyPricesGroup: Record<number, IReservationDailyPrice[]> = {};

        (reservation?.reservationDailyPrice ?? []).map((item) => {
          if (!dailyPricesGroup[item.Price]) {
            dailyPricesGroup[item.Price] = [];
          }
          dailyPricesGroup[item.Price].push(item);
        });

        Object.values(dailyPricesGroup).map((items) => {
          const total = items.reduce((prev, curr) => (prev += curr.Price), 0);

          costsArr.push({
            title: `${price(items?.[0]?.Price, 2)} x ${items.length} ${t(
              'night'
            )}`,
            value: total,
          });
        });
      }
    } else if (isOffer && isHost) {
      if (!isDaily) {
        const dailyPricesGroup: Record<number, IReservationDailyPrice[]> = {};

        (reservation?.reservationDailyPrice ?? []).map((item) => {
          if (!dailyPricesGroup[item.Price]) {
            dailyPricesGroup[item.Price] = [];
          }
          dailyPricesGroup[item.Price].push(item);
        });

        Object.values(dailyPricesGroup).map((items) => {
          const total = items.reduce((prev, curr) => (prev += curr.Price), 0);

          costsArr.push({
            title: `${price(items?.[0]?.Price, 2)} x ${items.length} ${t(
              'night'
            )}`,
            value: total,
          });
        });
      }
    }
    //offer olmadığı default durumda!
    else {
      if (!isDaily) {
        const dailyPricesGroup: Record<number, IReservationDailyPrice[]> = {};

        (reservation?.reservationDailyPrice ?? []).map((item) => {
          if (!dailyPricesGroup[item.Price]) {
            dailyPricesGroup[item.Price] = [];
          }
          dailyPricesGroup[item.Price].push(item);
        });

        Object.values(dailyPricesGroup).map((items) => {
          const total = items.reduce((prev, curr) => (prev += curr.Price), 0);

          costsArr.push({
            title: `${price(items?.[0]?.Price, 2)} x ${items.length} ${t(
              'night'
            )}`,
            value: total,
          });
        });
      } else {
        costsArr.push({
          title: 'price',
          value:
            (reservation?.reservation?.HourlyPrice ?? 0) *
            (reservation?.reservation?.TicketCount || 1),
        });

        costsArr.push({
          title: 'photoPackage',
          value: reservation?.reservation?.PhotoPackagePrice ?? 0,
        });

        costsArr.push({
          title: 'foodAndBeverage',
          value: reservation?.reservation?.FoodAndBeveragePrice ?? 0,
        });
      }

      costsArr.push({
        title: 'cleaningFee',
        value: reservation?.reservation?.CleaningFeePrice ?? 0,
      });

      costsArr.push({
        title: 'crewFee',
        value: reservation?.reservation?.CrewFeePrice ?? 0,
      });

      costsArr.push({
        title: 'petFee',
        value:
          (reservation?.reservation?.PetFeePrice ?? 0) *
          (reservation?.reservation?.PetFeeCount ?? 0),
      });

      costsArr.push({
        title: 'gasFee',
        value:
          (reservation?.reservation?.GasFeeHour ?? 0) *
          (reservation?.reservation?.GasFeePrice ?? 0),
      });

      reservation?.reservationAddon?.forEach((item) => {
        costsArr.push({
          title: (
            <>
              {item.Name}{' '}
              {item?.PayableInBase ? (
                <span className="font-light italic text-xs">
                  {t('payableInBase')}
                </span>
              ) : (
                ''
              )}
            </>
          ),
          value: item.TotalPrice,
        });
      });
    }

    costsArr.push({
      title: 'vat',
      value: reservation?.taxFee,
    });

    costsArr.push({
      isTotal: true,
      title: `${t('total')} (${currencyName})`,
      value: new Decimal(reservation?.reservation?.TotalPrice)
        .plus(payableInBaseTotalAmount)
        .toNumber(),
    });

    costsArr.push({
      isTotal: true,
      title: `${t('payableInBaseTotal')} (${currencyName})`,
      value: payableInBaseTotalAmount,
    });

    return costsArr.filter((item) => item.value);
  }, [
    reservation,
    price,
    isDaily,
    currencyName,
    t,
    isOffer,
    totalNight,
    payableInBaseTotalAmount,
    isHost,
  ]);

  const route = useMemo(
    () =>
      reservation?.reservation?.RouteId
        ? boat?.RouteList?.find(
            (item) => item.ID === reservation?.reservation?.RouteId
          )
        : null,
    [boat, reservation]
  );

  return {
    costs,
    startDate,
    endDate,
    isDaily,
    remainingAmount: new Decimal(reservation.reservation.TotalPrice)
      .plus(payableInBaseTotalAmount)
      .sub(prepaymentAmount)
      .toNumber(),
    prepaymentAmount,
    totalHostRevenue: new Decimal(reservation?.reservation.TotalPrice)
      .sub(reservation.comissionFee)
      .sub(
        new Decimal(reservation.taxFee)
          .mul(reservation.reservation.ComissionRate / 100)
          .toNumber()
      )
      .toNumber(),
    isOffer,
    isRequest,
    route,
    label,
    payableInBaseTotalAmount,
  };
}
