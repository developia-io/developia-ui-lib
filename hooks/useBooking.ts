'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/app/navigation';
import { IBoatDetail } from '@/interfaces/boat.interface';
import { useCreateReservationMutation } from '@/store/services/reservationService';
import { DAILY_BOAT_SERVICE_ID } from '@/constants/boats';
import useDate from './useDate';
import useTrack from './useTrack';
import useUser from './useUser';

export default function useBooking(boat: IBoatDetail) {
  const currParams = useParams<any>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const [trigger, { isLoading }] = useCreateReservationMutation();
  const { reservationRequestLog, setDatesLog } = useTrack();
  const isDaily = boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID;
  const { format } = useDate();

  const params = useMemo(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const addons = searchParams.get('addons');

    return {
      experiences: searchParams.get('experiences') ?? '',
      city: searchParams.get('city') ?? '',
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      guests: searchParams.get('guests') ?? '',
      route: searchParams.get('route') ?? '',
      addons: addons
        ? addons.split(',').map((j) => {
            const addonObj = j.split(':');
            return { addonId: addonObj[0], unit: Number(addonObj[1]) || 1 };
          })
        : [],
      startTime: searchParams.get('startTime') ?? '',
      endTime: searchParams.get('endTime') ?? '',
      tickets: searchParams.get('tickets') ?? searchParams.get('guests') ?? '',
      isCrewBoat: searchParams.get('isCrewBoat'),
      isPreview: searchParams.get('isPreview'),
    };
  }, [searchParams]);

  const onChange = useCallback(
    (values: any) => {
      const obj = {
        ...params,
        ...values,
      };

      if (isLoggedIn) {
        if (values.startDate || values.endDate) {
          setDatesLog({
            VisitedProductId: Number(boat.ID),
            SelectedDates: `${values?.startDate} - ${values?.endDate}`,
          });
        }
      }

      const query = Object.fromEntries(
        Object.entries({
          ...obj,
          ...(obj.addons?.length
            ? {
                addons: obj.addons
                  .map((i: any) => `${i.addonId}:${Number(i.unit) || 1}`)
                  .join(','),
              }
            : null),
          ...(obj.startDate
            ? {
                startDate: new Date(obj.startDate).toLocaleDateString('sv'),
              }
            : null),
          ...(obj.endDate
            ? {
                endDate: new Date(obj.endDate).toLocaleDateString('sv'),
              }
            : null),
        }).filter(([, v]) => v !== null && v !== '' && (v as any)?.length !== 0)
      );

      router.replace(
        {
          pathname,
          params: { ...currParams } as any,
          query,
        } as any,
        {
          scroll: false,
        }
      );
    },
    [params, pathname, boat, isLoggedIn, setDatesLog]
  );

  const onSubmit = useCallback(
    async (
      startDate?: Date,
      endDate?: Date,
      startTime?: string,
      endTime?: string
    ) => {
      try {
        if (user) {
          const checkInDay = startDate ?? params.startDate;
          const checkOutDay = endDate ?? params.endDate;
          const checkInDayStartTime = startTime ?? params.startTime ?? '';
          const checkInDayEndTime = endTime ?? params.endTime ?? '';
          const route = isDaily ? params.route ?? '' : params.route;
          const isCrewBoat = params?.isCrewBoat ?? 'true';

          reservationRequestLog({
            SelectedDates: `${checkInDay} - ${checkOutDay}`,
            VisitedProductId: Number(boat.ID),
          });

          const response = await trigger({
            BoatId: Number(boat.ID),
            UserId: user?.ID as number,
            AddOnIdAndQuantity:
              params.addons.map((item) => [
                Number(item.addonId),
                Number(item.unit),
              ]) ?? [],
            PetFeeCount: 0,
            AdditionalCrewRoleIDs: [],
            GuestCount: Number(params.guests || 1),
            IsCrewBoat: String(isCrewBoat) === 'true',
            ...(route
              ? {
                  RouteId: Number(route),
                }
              : null),
            ...(isDaily
              ? {
                  StartTime: checkInDayStartTime,
                  EndTime: checkInDayEndTime,
                  TicketCount: Number(params.tickets || 1),
                  CheckInDay: checkInDay
                    ? format(checkInDay, 'yyyy-MM-dd')
                    : '',
                  CheckOutDay: checkInDay
                    ? format(checkInDay, 'yyyy-MM-dd')
                    : '',
                }
              : {
                  CheckInDay: checkInDay
                    ? format(checkInDay, 'yyyy-MM-dd')
                    : '',
                  CheckOutDay: checkOutDay
                    ? format(checkOutDay, 'yyyy-MM-dd')
                    : '',
                }),
          }).unwrap();

          router.push(`/checkout/${response.ConfirmationCode}/address`);
        }
      } catch (error) {
        throw error;
      }
    },
    [
      params,
      user,
      boat,
      router,
      trigger,
      isDaily,
      reservationRequestLog,
      format,
    ]
  );

  useEffect(() => {
    const redirectAfterLoginKey = sessionStorage.getItem(
      'redirectAfterLoginKey'
    );

    if (
      redirectAfterLoginKey === 'checkout-submit' &&
      user &&
      params.startDate &&
      params.endDate
    ) {
      sessionStorage.removeItem('redirectAfterLoginKey');

      onSubmit(
        params.startDate,
        params.endDate,
        params.startTime,
        params.endTime
      );
    }
  }, [user]);

  return {
    params,
    onChange,
    isLoading,
    onSubmit,
  };
}
