import { useCallback, useMemo } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/app/navigation';
import {
  IGetBoatsRequest,
  IGetBoatsRequestFilter,
} from '@/interfaces/boat.interface';
import { useLocale } from 'next-intl';
import QueryString from 'qs';
import {
  useGetExperiencesQuery,
  useGetFiltersQuery,
  useGetWaterSportTypeQuery,
} from '@/store/services/boatService';
import { useGetLocationsQuery } from '@/store/services/locationService';
import { useGetRoutesQuery } from '@/store/services/routeService';
import {
  FILTERS_MAPPING,
  FiltersMappingType,
  SORTING_ITEMS,
} from '@/constants/filters';

export type SearchStateType = {
  type: 'hr' | 'experiences';
  routes: string[];
  city: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: string;
  experiences: string[];
  waterSports: string[];

  showType: boolean;
  showLocation: boolean;
  showDate: boolean;
  showGuest: boolean;
};

export type SearchParamsType = Omit<
  SearchStateType,
  'showType' | 'showLocation' | 'showDate' | 'showGuest'
> &
  Pick<SearchStateType, 'guests'> & {
    boatServiceType: string[];
    boatType: string[];
    boatTypeDetail: string[];
    priceMin: string;
    priceMax: string;
    lengthMin: string;
    lengthMax: string;
    boatBrandId: string[];
    boatModelId: string[];
    languages: string[];
    cabin: string;
    capacity: string;
    instantBookOn: string;
    isAvailable: string;
    page: string;
    limit: string;
    sortBy: string;
    sortDesc: string;
    classifications: string[];
    showUnavailableBoats: string;
  };

export type SearchOnChangeType = (
  key: keyof SearchStateType,
  value: boolean | string | Date | null
) => void;

export const getSearchParamValues = (
  searchParams: ReadonlyURLSearchParams,
  pathname: string
) => {
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const experiences = searchParams.get('experiences');
  const routes = searchParams.get('routes');
  const waterSports = searchParams.get('waterSports');

  const boatServiceType = searchParams.get('boatServiceType');
  const boatTypeDetail = searchParams.get('boatTypeDetail');
  const boatType = searchParams.get('boatType');
  const boatBrandId = searchParams.get('boatBrandId');
  const boatModelId = searchParams.get('boatModelId');
  const languages = searchParams.get('languages');
  const classifications = searchParams.get('classifications');

  let type = (searchParams.get('type') as any) ?? 'hr';

  if (pathname.includes('/boats/experiences')) {
    type = 'experiences';
  }

  return {
    type,
    boatServiceType: boatServiceType ? boatServiceType.split(',') : [],
    boatTypeDetail: boatTypeDetail ? boatTypeDetail.split(',') : [],
    city: searchParams.get('city') ?? '',
    routes: routes ? routes.split(',') : [],
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    guests: searchParams.get('guests') ?? '',
    experiences: experiences ? experiences.split(',') : [],
    page: searchParams.get('page') ?? null,
    limit: searchParams.get('limit') ?? null,
    sortBy: searchParams.get('sortBy') ?? null,
    sortDesc: searchParams.get('sortDesc') ?? null,
    boatType: boatType ? boatType.split(',') : [],
    languages: languages ? languages.split(',') : [],
    waterSports: waterSports ? waterSports.split(',') : [],
    priceMin: searchParams.get('priceMin') ?? '',
    priceMax: searchParams.get('priceMax') ?? '',
    lengthMin: searchParams.get('lengthMin') ?? '',
    lengthMax: searchParams.get('lengthMax') ?? '',
    boatBrandId: boatBrandId ? boatBrandId.split(',') : [],
    boatModelId: boatModelId ? boatModelId.split(',') : [],
    classifications: classifications ? classifications.split(',') : [],
    cabin: searchParams.get('cabin') ?? '',
    capacity: searchParams.get('capacity') ?? '',
    instantBookOn: searchParams.get('instantBookOn') ?? '',
    isAvailable: searchParams.get('isAvailable') ?? '',
    showUnavailableBoats: searchParams.get('showUnavailableBoats') ?? '',
  } as SearchParamsType;
};

export const getSearchStateDefaultValues = (
  searchParams: ReadonlyURLSearchParams,
  pathname: string
) => {
  return {
    ...getSearchParamValues(searchParams, pathname),
    showType: false,
    showDate: false,
    showGuest: false,
    showLocation: false,
  } as SearchStateType;
};

export const makeQueryStringFromObject = (obj: SearchParamsType) =>
  QueryString.stringify(
    Object.fromEntries(
      Object.entries({
        ...obj,
        startDate: obj.startDate
          ? obj.startDate.toLocaleDateString('sv')
          : null,
        endDate: obj.endDate ? obj.endDate.toLocaleDateString('sv') : null,
        routes: obj?.routes?.length ? obj.routes : null,
        showType: null,
        showDate: null,
        showGuest: null,
        showLocation: null,
      }).filter(([, v]) => v !== null && v !== '' && v.length !== 0)
    ),
    {
      skipNulls: true,
      arrayFormat: 'comma',
    }
  );

export const getAppliedFilters = (
  params: SearchParamsType & {
    page: string | null;
    limit: string | null;
  }
) => {
  const filters: IGetBoatsRequestFilter[] = [];
  const filterKeys = Object.keys(params);

  filterKeys.forEach((filterKey: any) => {
    let value = params[filterKey as keyof SearchParamsType];
    const filterMapping =
      FILTERS_MAPPING[filterKey as keyof FiltersMappingType];

    if (!filterMapping || !value) {
      return;
    }

    if (filterKey === 'type' && !params?.boatServiceType?.length) {
      const isExperience = value === 'experiences';

      filters.push({
        Column: filterMapping.Column,
        Value: '4',
        Operator: isExperience ? 'eq' : 'neq',
        Concat: 'AND',
      });

      if (isExperience && params?.routes?.length == 0) {
        [
          'Daily Tour Boat Explorer',
          'Daily Tour Boat Coastal',
          'Daily Tour Boat',
          'Wedding Friendly',
          'Lux Transport Boats',
          'Corp. Events Friendly',
          'Budget Transport Boat',
          'Small Transport Boat Service',
          'Transport Boat for Big Groups',
        ].forEach((item) => {
          (filters as IGetBoatsRequestFilter[]).push({
            Column: 'Classifications',
            Value: item,
            Operator: 'like',
            Concat: 'OR',
          });
        });
      }

      return;
    }

    if (filterKey === 'type' && params?.boatServiceType?.length > 0) {
      return;
    }

    if (filterKey === 'boatServiceType' && (value as string[])?.length) {
      value = Array.from(new Set([...(value as string[]), '3'])) as string[];
    }

    if (Array.isArray(value)) {
      value.forEach((val) => {
        filters.push({
          Column: filterMapping.Column,
          Value: filterMapping.transformValue
            ? (filterMapping.transformValue(val) as any)
            : val,
          Operator: filterMapping.Operator,
        });
      });
    } else {
      filters.push({
        Column: filterMapping.transformColumnValue
          ? (filterMapping.transformColumnValue(
              params?.type ?? 'hr'
            ) as IGetBoatsRequestFilter['Column'])
          : filterMapping.Column,
        Value: filterMapping.transformValue
          ? (filterMapping.transformValue(value) as any)
          : value,
        Operator: filterMapping.Operator,
      });
    }
  });

  const defaultSorting = SORTING_ITEMS.find((item) => item.default);

  const filterObj: IGetBoatsRequest = {
    Page: params.page ? Number(params.page) : 1,
    Take: params.limit ? Number(params.limit) : 12,
    Sort: {
      Order: (
        params?.sortDesc
          ? params?.sortDesc === 'true'
          : defaultSorting?.sortDesc
      )
        ? 'DESC'
        : 'ASC',
      Column: ((params?.sortBy ?? defaultSorting?.sortBy) as any) ?? 'ID',
    },
    Filters: filters
      .filter((item) => item.Value)
      .map((item) => {
        return {
          ...item,
          Concat:
            [
              'BoatTypeDetailID',
              'BoatTypeID',
              ...(filters.filter(
                (f) =>
                  f.Column === 'BoatServiceTypeID' &&
                  f.Value === '4' &&
                  f.Operator == 'eq'
              ).length > 0
                ? ['Classifications', 'BoatServiceTypeID']
                : []),
            ].includes(item.Column) && params?.routes?.length == 0
              ? 'OR'
              : 'AND',
        };
      }),
  };

  return filterObj;
};

export default function useSearch(defaultParams?: any) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const { data: locations = [] } = useGetLocationsQuery();
  const { data: routes = [] } = useGetRoutesQuery({
    IsLive: true,
  });
  const { data: waterSports = [] } = useGetWaterSportTypeQuery({
    onlyHasBoat: true,
  });

  const { data: experiences = [] } = useGetExperiencesQuery({
    onlyHasBoat: true,
  });

  const params = useMemo(
    () => ({
      ...getSearchParamValues(searchParams, pathname),
      ...(defaultParams || {}),
    }),
    [defaultParams, searchParams, pathname]
  );

  const { data: availableFilters = [] } = useGetFiltersQuery({
    StartDate: params.startDate?.toLocaleDateString('sv'),
    EndDate: params.endDate?.toLocaleDateString('sv'),
    City: params.city,
  });

  const sortedExperiences = useMemo(
    () => [...experiences].sort((a) => (a.MainRecordID === 2 ? -1 : 1)),
    [experiences]
  );

  const onSearch = useCallback(
    (state?: SearchStateType) => {
      const href = `/search?${makeQueryStringFromObject({
        ...params,
        ...state,
      } as any)}`;

      if (pathname.includes('/iframe')) {
        window.open(`/${locale}${href}`, '_blank');
      } else {
        router.push(href);
      }
    },
    [router, params]
  );

  const onClearFilters = useCallback(
    (state?: any) => {
      router.push(
        `/search?${makeQueryStringFromObject(
          state
            ? state
            : ({
                type: params.type,
                city: params.city,
                guests: params.guests,
                startDate: params.startDate,
                endDate: params.endDate,
              } as any)
        )}`
      );
    },
    [params, router]
  );

  const getLocationsByCity = useCallback(
    (state: SearchStateType) => {
      if (state.type === 'hr') {
        return (
          state.city
            ? locations.filter((item) =>
                `${item.City.toLocaleLowerCase(
                  'tr-TR'
                )}_${item.Name.toLocaleLowerCase('tr-TR')}`.includes(
                  state.city.toLocaleLowerCase('tr-TR')
                )
              )
            : locations
        ).slice(0, 8);
      } else {
        // const routeCities = (
        //   routes
        //     .filter((item) => item.SuggestedTime === '1')
        //     .map(
        //       (item) =>
        //         ({
        //           City: item.StartPoint,
        //           Name: item.StartPoint,
        //           StartDate: '',
        //           EndDate: '',
        //         } as ILocation)
        //     ) ?? []
        // )

        return locations
          .filter((item) =>
            `${item.City.toLocaleLowerCase(
              'tr-TR'
            )}_${item.Name.toLocaleLowerCase('tr-TR')}`.includes(
              state.city.toLocaleLowerCase('tr-TR')
            )
          )
          .slice(0, state.city ? 8 : 6);

        // return Array.from(
        //   new Map(routeCities.map((item) => [item.City, item])).values()
        // ).slice(0, state.city ? 8 : 6);
      }
    },
    [locations]
  );

  const getRoutesByCity = useCallback(
    (state: SearchStateType) => {
      const routesByType = [...routes].filter((item) =>
        state.type === 'experiences'
          ? item.SuggestedTime === '1'
          : item.SuggestedTime !== '1'
      );

      if (!state.city) {
        return routesByType.slice(0, 8);
      }

      if ('istanbul'.includes(state.city.replace('İ', 'i').toLowerCase())) {
        return routesByType.filter((item) => [36, 37, 38].includes(item.ID));
      }

      return routesByType
        .filter((item) =>
          `${item.StartPoint.toLowerCase()}`.includes(state.city.toLowerCase())
        )
        .slice(0, 8);
    },
    [routes]
  );

  return {
    getLocationsByCity,
    getRoutesByCity,
    waterSports,
    experiences: sortedExperiences,
    onSearch,
    params,
    onClearFilters,
    availableFilters,
  };
}
