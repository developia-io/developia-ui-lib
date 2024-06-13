'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { IBoatDetail } from '@/interfaces/boat.interface';
import { ITripSchedule } from '@/interfaces/calendar.interface';
import { utcToZonedTime } from 'date-fns-tz';
import add from 'date-fns/add';
import isDate from 'date-fns/isDate';
import isSameDay from 'date-fns/isSameDay';
import dayjs from 'dayjs';
import { useGetCalendarDataQuery } from '@/store/services/calendarService';
import { isWithinDate } from '@/utils/dayjs';
import { getDaysArray } from '@/utils/string';
import { MANDATORY_CHECK_IN_DAYS } from '@/constants/app';
import { DAILY_BOAT_SERVICE_ID } from '@/constants/boats';
import useBooking from './useBooking';
import useDate from './useDate';

export type BoatCalendarAvailabilitySelectedDatesState = {
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
};

export type BoatCalendarAvailabilityOptions = {
  defaultSelectedDates?: BoatCalendarAvailabilitySelectedDatesState;
  checkFirstAvailability?: boolean;
};

export const getBoatTripLength = (boat: IBoatDetail, checkInDay: Date) => {
  return (
    boat?.CustomTripLength?.find((item) => {
      if (
        isWithinDate(checkInDay, {
          startDate: new Date(item.StartDate),
          endDate: new Date(item.EndDate),
        })
      ) {
        return true;
      }

      return false;
    })?.MinStay ??
    boat?.BaseMinTripLength ??
    0
  );
};

const generateTimeArray = (
  start: string,
  end: string,
  trip: number,
  tripLength: number = 0
): string[] => {
  const result: string[] = [];
  const currentTime = new Date(`2000-01-01T${start}`);

  // set to next day if end time is 00:00
  const endTime = dayjs(`2000-01-0${end === '00:00' ? 2 : 1}T${end}`)
    .add(-tripLength, 'h')
    .toDate();

  while (currentTime <= endTime) {
    result.push(currentTime.toString());
    currentTime.setMinutes(currentTime.getMinutes() + trip * 60);
  }

  return result;
};

const generateMinArray = ({
  tripLength,
  start,
  end,
  incrementalTripLength = 60,
}: {
  tripLength: number;
  start?: string;
  end: string;
  incrementalTripLength?: number;
}): string[] => {
  const result: string[] = [];

  if (tripLength && start && end) {
    let baseTrip = tripLength * 60;

    let startTime = dayjs(`2000-01-01T${start}`).add(baseTrip, 'm');
    const endTime = dayjs(`2000-01-0${end === '00:00' ? 2 : 1}T${end}`);

    while (endTime.isAfter(startTime) || endTime.isSame(startTime)) {
      result.push(String(baseTrip));
      startTime = startTime.add(incrementalTripLength, 'm');
      baseTrip += incrementalTripLength;
    }
  }

  return result;
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function useBoatCalendarAvailability(
  boat: IBoatDetail,
  options?: BoatCalendarAvailabilityOptions
) {
  const { params, onChange } = useBooking(boat);
  const { data: calendarData, isSuccess } = useGetCalendarDataQuery(
    {
      boatId: boat?.ID,
    },
    {
      skip: !boat?.ID,
    }
  );

  const { format } = useDate();
  const [isSetAutoDate, setIsSetAutoDate] = useState(false);
  const [isSetAutoTime, setIsSetAutoTime] = useState(false);
  const [thereIsNoAvailableDate, setThereIsNoAvailableDate] = useState(false);

  const [selectedDates, setSelectedDates] =
    useState<BoatCalendarAvailabilitySelectedDatesState>(
      options?.defaultSelectedDates ?? {}
    );

  const today = useMemo(() => new Date(), []);

  const availabilityWindowDaysEndDate = useMemo(() => {
    if (calendarData?.AvailabilityWindow) {
      const endDate = add(today, {
        months: calendarData?.AvailabilityWindow,
      });

      return endDate;
    } else {
      return add(today, {
        months: 24,
      });
    }
  }, [calendarData, today]);

  const getMandatoryCheckInDays = useCallback(
    (startDate: Date) => {
      if (calendarData?.CustomMandatoryDays?.length) {
        const customMandatoryCheckInDays =
          calendarData?.CustomMandatoryDays?.filter((item: any) => {
            return isWithinDate(startDate, {
              startDate: new Date(item.StartDate),
              endDate: new Date(item.EndDate),
            });
          });

        if (customMandatoryCheckInDays?.length) {
          return customMandatoryCheckInDays;
        }
      }

      if (calendarData?.MandatoryDays?.length) {
        return calendarData?.MandatoryDays;
      }

      if (calendarData?.AvailableDays?.length) {
        return calendarData?.AvailableDays;
      }

      return new Array(7).fill(null).map((_item, index) => ({
        DayID: index + 1,
      }));
    },
    [calendarData]
  );

  const checkDayInMandatoryDay = useCallback(
    (date: Date) => {
      const mandatoryCheckInDays = getMandatoryCheckInDays(date);
      return mandatoryCheckInDays.find((mD: any) => {
        return (
          MANDATORY_CHECK_IN_DAYS[mD.DayID - 1] === days[dayjs(date).day()]
        );
      });
    },
    [getMandatoryCheckInDays]
  );

  const mandatoryCheckInDays = useMemo(
    () =>
      selectedDates.startDate &&
      getMandatoryCheckInDays(selectedDates.startDate),
    [selectedDates, getMandatoryCheckInDays]
  );

  const advancedNotice = useMemo(() => {
    const customNotice = calendarData?.CustomAdvancedNotice.find(
      (item: {
        StartDate: string | number | Date;
        EndDate: string | number | Date;
      }) =>
        isWithinDate(today, {
          startDate: new Date(item.StartDate),
          endDate: new Date(item.EndDate),
        })
    );

    if (customNotice) {
      return customNotice?.AdvanceNotice;
    }

    return calendarData?.AdvanceNotice ?? 1;
  }, [calendarData, today]);

  const availableDays = useMemo(() => {
    return (
      calendarData?.AvailableDays?.map((day) =>
        day.DayID == 7 ? 0 : day.DayID
      ) || []
    );
  }, [calendarData]);

  const disabledDates = useMemo(() => {
    let dates = (calendarData?.DisabledDays ?? []).map(
      (item) => new Date(item)
    );
    const isDaily = boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID;

    if (calendarData?.ReservationTimes?.length && !isDaily) {
      calendarData?.ReservationTimes.forEach((item) => {
        const days = getDaysArray(
          dayjs(new Date(item.CheckInDay))
            .add(-calendarData.PreperationTime, 'day')
            .toDate(),
          dayjs(new Date(item.CheckOutDay))
            .add(calendarData.PreperationTime, 'day')
            .toDate()
        );

        dates = [...dates, ...days];
      });
    }

    return dates;
  }, [calendarData, boat]);

  const availabilityPercentage = useMemo(() => {
    if (!disabledDates || !calendarData?.AvailabilityWindow) {
      return 0;
    }
    return disabledDates.length / (calendarData?.AvailabilityWindow * 30);
  }, [calendarData, disabledDates]);

  const disabledDatesStr = useMemo(
    () => disabledDates.map((item) => item.toLocaleDateString('sv')),
    [disabledDates]
  );

  const isDisabledDay = useCallback(
    (date: Date) => {
      if (selectedDates.startDate && !selectedDates.endDate) {
        if (
          dayjs(selectedDates.startDate).isAfter(date) ||
          dayjs(selectedDates.startDate)
            .add(boat.MaxTripLength, 'day')
            .isBefore(date)
        ) {
          return true;
        }

        return (
          disabledDates.filter((dd) => {
            return (
              dayjs(dd).isBefore(date) &&
              dayjs(selectedDates.startDate).isBefore(dd) &&
              dayjs(selectedDates.startDate)
                .add(boat.MaxTripLength, 'day')
                .isAfter(dd)
            );
          }).length > 0
        );
      }

      const isDaily = boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID;
      if (disabledDatesStr.includes(date.toLocaleDateString('sv'))) {
        return true;
      }

      if (isDaily && !availableDays.includes(date.getDay())) {
        return true;
      }

      if (isDaily) {
        const totalSoldTicketCount = calendarData?.ReservationTimes?.filter(
          (item) => {
            if (calendarData.TripLengthType === 2) {
              return 0;
            }
            return isSameDay(date, new Date(item.CheckInDay));
          }
        )?.reduce((prev, curr) => (prev += curr.TicketCount), 0);

        if (
          totalSoldTicketCount ===
          boat?.MaxNumberOfTickets * (boat?.Trip?.TripSchedules?.length ?? 1)
        ) {
          return true;
        }
      }

      if (availabilityWindowDaysEndDate) {
        if (
          isWithinDate(date, {
            startDate: today,
            endDate: availabilityWindowDaysEndDate,
          })
        ) {
          return false;
        }
      }

      return false;
    },
    [
      selectedDates,
      availabilityWindowDaysEndDate,
      disabledDatesStr,
      availableDays,
      boat,
      today,
      calendarData,
    ]
  );

  const fractionalizedDates = useMemo(() => {
    if (boat.IsFractionalizedTripOn && selectedDates.startDate) {
      const dates = [];
      let minTripLengthFraction = boat.BaseMinTripLength;
      while (minTripLengthFraction <= boat.MaxTripLength) {
        dates.push(
          dayjs(selectedDates.startDate).add(minTripLengthFraction, 'day')
        );
        minTripLengthFraction += boat.BaseMinTripLength;
      }

      return dates;
    }
    return [];
  }, [selectedDates, boat]);

  const getActiveRuleByDay = useCallback(
    (date: Date) => {
      if (
        (selectedDates.startDate && selectedDates.endDate) ||
        (!selectedDates.startDate && !selectedDates.endDate)
      ) {
        const botTripLength = getBoatTripLength(
          boat,
          availabilityWindowDaysEndDate
        );

        if (!checkDayInMandatoryDay(date)) {
          return {
            code: 'mandatory-check-in-days',
            checkInDays: getMandatoryCheckInDays(date)
              .map((d: any) => MANDATORY_CHECK_IN_DAYS[d.DayID])
              .join(', '),
          };
        }

        if (
          dayjs(availabilityWindowDaysEndDate)
            .add(-botTripLength, 'day')
            .isBefore(date)
        ) {
          return {
            code: 'min-trip-requirement',
            total: botTripLength,
          };
        }

        const isExists =
          disabledDates.filter((dd) => {
            const currentDayBotTripLength = getBoatTripLength(boat, date);
            const dayBeforeOnlyCheckout = dayjs(date).add(
              currentDayBotTripLength + 1,
              'day'
            );

            return (
              dayjs(dd)
                .add(-botTripLength - 1, 'day')
                .isBefore(date) &&
              dayjs(dd).isAfter(date) &&
              dayBeforeOnlyCheckout.isAfter(dd)
            );
          }).length > 0;

        return {
          code: isExists ? 'only-checkout' : null,
        };
      }

      if (!selectedDates.endDate && selectedDates.startDate) {
        if (boat.IsFractionalizedTripOn) {
          const isSameFraction = fractionalizedDates.filter((d) =>
            d.isSame(date, 'day')
          ).length;

          if (!isSameFraction) {
            return {
              code: 'min-fraction-rule',
            };
          }
        }

        const botTripLength = getBoatTripLength(boat, selectedDates.startDate);
        if (
          dayjs(selectedDates.startDate).isBefore(date) &&
          dayjs(selectedDates.startDate)
            .add(botTripLength - 1, 'day')
            .isAfter(date)
        ) {
          return {
            code: 'min-trip-requirement',
            total: botTripLength,
          };
        }
      }
      return {
        code: null,
      };
    },
    [selectedDates, boat, fractionalizedDates, checkDayInMandatoryDay]
  );

  const getTicketAvailabilityBySelectedTimes = useCallback(
    (startTime: string, endTime: string, checkInDate: Date) => {
      if (boat?.ServiceTypeId !== DAILY_BOAT_SERVICE_ID) {
        return {
          hasReservation: false,
          maxAvailableTicketCount: 1,
        };
      }

      const reservation = calendarData?.ReservationTimes?.find(
        (item) =>
          isSameDay(checkInDate, new Date(item.CheckInDay)) &&
          format(utcToZonedTime(item.StartTime, 'UTC'), 'HH:mm') ===
            startTime &&
          format(utcToZonedTime(item.EndTime, 'UTC'), 'HH:mm') === endTime
      );

      const reducedBy = calendarData?.ReducedBy.find((item) => {
        return (
          isSameDay(checkInDate, new Date(item.ReducedDay)) &&
          item.StartTime === startTime &&
          item.EndTime === endTime
        );
      });

      // TODO: ReduceCapacity should be minus from max available ticket count -> sold by out of our system
      return {
        hasReservation: !!reservation,
        maxAvailableTicketCount:
          boat?.MaxNumberOfTickets -
          (reservation?.TicketCount ?? 0) -
          (reducedBy?.ReducedBy ?? 0),
      };
    },
    [boat, calendarData, format]
  );

  const ticketsAvailabilityBySelectedDate = useMemo(() => {
    if (
      selectedDates.startDate &&
      selectedDates.startTime &&
      selectedDates.endTime
    ) {
      return getTicketAvailabilityBySelectedTimes(
        selectedDates.startTime,
        selectedDates.endTime,
        selectedDates.startDate
      );
    }

    return {
      hasReservation: false,
      maxAvailableTicketCount: 0,
    };
  }, [getTicketAvailabilityBySelectedTimes, selectedDates]);

  const hasAvailabilitySelectedTimes = useCallback(
    (startTime: string, endTime: string, checkInDate: Date) => {
      const ticketsAvailabilityByDate = getTicketAvailabilityBySelectedTimes(
        startTime,
        endTime,
        checkInDate
      );

      if (!boat.AllowMoreThanOnePerson) {
        return !ticketsAvailabilityByDate?.hasReservation;
      }

      if (params.tickets) {
        if (
          Number(params.tickets) >
          ticketsAvailabilityByDate?.maxAvailableTicketCount
        ) {
          return false;
        }
      }

      return 0 < ticketsAvailabilityByDate?.maxAvailableTicketCount;
    },
    [calendarData, format, params.tickets, getTicketAvailabilityBySelectedTimes]
  );

  const boatTimesSlot = useMemo(
    () =>
      boat?.Trip?.IsFlexibleDurationOn
        ? generateTimeArray(
            String(boat?.Trip.StartTime),
            String(boat?.Trip.EndTime),
            Number(0.5),
            boat?.Trip?.BaseTripLength
          ) ?? []
        : [],
    [boat]
  );

  const boatMinSlot = useMemo(() => {
    const minSlots = boat?.Trip?.IsFlexibleDurationOn
      ? generateMinArray({
          tripLength: Number(boat?.Trip.BaseTripLength),
          start: selectedDates?.startTime || boat?.Trip.StartTime,
          end: boat?.Trip.EndTime,
          incrementalTripLength: boat?.Trip.IncrementalTripLength,
        }) ?? []
      : [];

    return minSlots;
  }, [boat, selectedDates]);

  const addMinutesToTime = useCallback(
    (time: string, minutesToAdd: number): string => {
      if (!time) {
        return '00:00';
      }

      const dateWithTime = new Date(`2000-01-01T${time}`);

      return format(
        add(dateWithTime, {
          minutes: minutesToAdd,
        }),
        'HH:mm'
      );
    },
    [format]
  );

  const getDateTimeRanges = useCallback(
    (date: Date) => {
      const timesSet = new Set<ITripSchedule & { timeRangeStr: string }>();

      if (boat?.Trip?.IsFlexibleDurationOn) {
        const newStartTime = format(new Date(boatTimesSlot?.[0]), 'HH:mm');
        return [
          {
            startTime: newStartTime,
            endTime: addMinutesToTime(
              newStartTime ?? '',
              Number(boatMinSlot?.[0] ?? 0)
            ),
            isDisabled: false,
          },
        ];
      }

      boat?.Trip?.TripSchedules?.forEach((schedule) => {
        if (
          (dayjs(date).isAfter(dayjs.utc(schedule.StartDate)) ||
            dayjs(date).isSame(dayjs.utc(schedule.StartDate), 'day')) &&
          (dayjs(date).isBefore(dayjs.utc(schedule.EndDate)) ||
            dayjs(date).isSame(dayjs.utc(schedule.EndDate), 'day'))
        ) {
          const timeRangeStr = `${schedule.StartTime}-${schedule.EndTime}`;
          timesSet.add({ ...schedule, timeRangeStr });
        }
      });

      return Array.from(timesSet).map(({ timeRangeStr }: any) => {
        const [startTime, endTime] = timeRangeStr.split('-');

        return {
          startTime,
          endTime,
          isDisabled:
            !hasAvailabilitySelectedTimes(startTime, endTime, date) ||
            utcToZonedTime(
              `${format(date, 'yyyy-MM-dd')}T${startTime}:00.000Z`,
              'UTC'
            ).getTime() < utcToZonedTime(new Date(), 'UTC').getTime(),
        };
      });
    },
    [
      boat,
      hasAvailabilitySelectedTimes,
      format,
      boatMinSlot,
      boatTimesSlot,
      addMinutesToTime,
    ]
  );

  const timeRanges = useMemo(() => {
    if (!selectedDates.startDate) {
      return [];
    }
    return getDateTimeRanges(selectedDates.startDate);
  }, [selectedDates, getDateTimeRanges]);

  const getFirstAvailableTimeRange = useCallback(
    (date: Date) => {
      return getDateTimeRanges(date)?.find((item) => !item.isDisabled);
    },
    [getDateTimeRanges]
  );

  const checkDateRangeIsAvailable = useCallback(
    (checkInDay: Date, checkOutDay: Date) => {
      if (
        !checkDayInMandatoryDay(checkInDay) ||
        dayjs(new Date()).add(advancedNotice, 'day').isAfter(checkInDay)
      ) {
        return false;
      }

      const arr = getDaysArray(checkInDay, checkOutDay);

      for (let i = 0; i < arr.length; i++) {
        if (isDisabledDay(arr[i])) {
          return false;
        }
      }

      return true;
    },
    [isDisabledDay, advancedNotice, checkDayInMandatoryDay]
  );

  const setFirstAvailableDateRange = useCallback(
    (_startDate: Date | null, _endDate: Date | null) => {
      if (
        _startDate &&
        _endDate &&
        checkDateRangeIsAvailable(_startDate, _endDate)
      ) {
        return false;
      }

      let checkInDay: Date | null = null;
      let checkOutDay: Date | null = null;

      const boatMaxTripLength = boat.MaxTripLength > 7 ? 7 : boat.MaxTripLength;

      let startDate =
        _startDate ||
        add(new Date(), {
          days: advancedNotice + 7,
        });
      let endDate =
        _startDate && _endDate
          ? _endDate
          : add(startDate, {
              days: boatMaxTripLength,
            });

      for (let i = 0; i < 365; i++) {
        const mandatoryCheckInDays = getMandatoryCheckInDays(startDate)?.map(
          (item: any) => MANDATORY_CHECK_IN_DAYS[item.DayID - 1]
        );

        let counter = boatMaxTripLength;
        while (counter > 2) {
          if (
            isDisabledDay(startDate) ||
            !checkDateRangeIsAvailable(startDate, endDate) ||
            !mandatoryCheckInDays?.includes(days[startDate.getDay()])
          ) {
            endDate = add(startDate, {
              days: counter,
            });
          } else {
            checkInDay = startDate;
            checkOutDay = endDate;
            break;
          }
          counter = counter - 1;
        }

        if (checkInDay && checkOutDay) {
          break;
        } else {
          startDate = add(startDate, {
            days: 1,
          });
          endDate = add(startDate, {
            days: boatMaxTripLength,
          });
        }
      }

      if (isDate(checkInDay) && isDate(checkOutDay)) {
        setSelectedDates((prev) => ({
          ...prev,
          startDate: checkInDay as Date,
          endDate: checkOutDay as Date,
        }));

        onChange({
          startDate: checkInDay as Date,
          endDate: checkOutDay as Date,
        });
      } else {
        setThereIsNoAvailableDate(true);
      }
    },
    [boat, advancedNotice, checkDateRangeIsAvailable, getMandatoryCheckInDays]
  );

  const setFirstAvailableDateTimeRange = useCallback(
    (_startDate: any, _endDate: any) => {
      let checkInDay: Date | null = null;
      let startTime: string | null = null;
      let endTime: string | null = null;

      let startDate =
        _startDate ||
        _endDate ||
        add(new Date(), {
          days: advancedNotice,
        });

      for (let i = 0; i <= 365; i++) {
        const mandatoryCheckInDays = getMandatoryCheckInDays(startDate)?.map(
          (item: any) => MANDATORY_CHECK_IN_DAYS[item.DayID - 1]
        );

        const timeRange = getDateTimeRanges(startDate)?.find(
          (item) => !item.isDisabled
        );

        if (
          !isDisabledDay(startDate) &&
          timeRange &&
          mandatoryCheckInDays?.includes(days[dayjs(startDate).day()]) &&
          dayjs(new Date()).add(advancedNotice, 'day').isBefore(startDate)
        ) {
          checkInDay = startDate;
          startTime = timeRange.startTime;
          endTime = timeRange.endTime;
          break;
        } else {
          startDate = add(startDate, {
            days: 1,
          });
        }
      }

      if (isDate(checkInDay) && startTime && endTime) {
        setSelectedDates((prev) => ({
          ...prev,
          startDate: checkInDay as Date,
          endDate: checkInDay as Date,
          startTime: startTime as string,
          endTime: endTime as string,
        }));

        onChange({
          startDate: checkInDay as Date,
          endDate: checkInDay as Date,
          startTime: startTime as string,
          endTime: endTime as string,
        });
      } else {
        setThereIsNoAvailableDate(true);
      }
    },
    [
      getDateTimeRanges,
      isDisabledDay,
      advancedNotice,
      getMandatoryCheckInDays,
      selectedDates,
    ]
  );

  useEffect(() => {
    if (params.startDate) {
      setSelectedDates((prev) => ({
        ...prev,
        startDate: params.startDate as Date,
        endDate: params.endDate as Date,
        startTime: params.startTime as string,
        endTime: params.endTime as string,
      }));
    }
  }, [params]);

  useEffect(() => {
    if (
      (!params.startDate || !params.endTime) &&
      calendarData &&
      options?.checkFirstAvailability &&
      boat?.ServiceTypeId === DAILY_BOAT_SERVICE_ID &&
      !isSetAutoTime &&
      (boat?.Trip?.IsFlexibleDurationOn
        ? boatTimesSlot?.length > 0 && boatMinSlot?.length > 0
        : true)
    ) {
      setIsSetAutoTime(true);
      setFirstAvailableDateTimeRange(params.startDate, params.endDate);
    }
  }, [
    params,
    calendarData,
    boat,
    boatMinSlot,
    boatTimesSlot,
    options?.checkFirstAvailability,
  ]);

  useEffect(() => {
    if (
      options?.checkFirstAvailability &&
      calendarData &&
      boat?.ServiceTypeId !== DAILY_BOAT_SERVICE_ID &&
      !isSetAutoDate
    ) {
      if (params?.startDate && params.endDate) {
        if (checkDateRangeIsAvailable(params?.startDate, params.endDate)) {
          setIsSetAutoDate(true);
          return;
        }
      }
      setFirstAvailableDateRange(params.startDate, params.endDate);
      setIsSetAutoDate(true);
    }
  }, [
    params,
    calendarData,
    boat,
    checkDateRangeIsAvailable,
    options?.checkFirstAvailability,
  ]);

  return {
    availabilityPercentage,
    calendarData,
    today,
    selectedDates,
    setSelectedDates,
    isDisabledDay,
    advancedNotice,
    disabledDates,
    getFirstAvailableTimeRange,
    timeRanges,
    mandatoryCheckInDays,
    ticketsAvailabilityBySelectedDate,
    getTicketAvailabilityBySelectedTimes,
    boatTimesSlot,
    boatMinSlot,
    addMinutesToTime,
    availabilityWindowDaysEndDate,
    getActiveRuleByDay,
    thereIsNoAvailableDate,
    setThereIsNoAvailableDate,
    isSuccessfullyLoaded: isSuccess,
    tripLength: getBoatTripLength(
      boat,
      selectedDates.startDate ? selectedDates.startDate : new Date()
    ),
  };
}
