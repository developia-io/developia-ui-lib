import { useCallback, useMemo } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/app/navigation';
import {
  IGetCrewsRequest,
  IGetCrewsRequestFilter,
} from '@/interfaces/crew.interface';
import QueryString from 'qs';
import {
  useGetCrewRolesQuery,
  useGetFiltersCrewQuery,
} from '@/store/services/crewService';
import {
  FILTERS_MAPPING_CREW,
  FiltersCrewMappingType,
  SORTING_ITEMS_CREW,
} from '@/constants/filters';

export type SearchStateType = {
  city: string;
  crewRoles: string[];
  crewExperience: string[];
  showExperience: boolean;
  showLocation: boolean;
  showRole: boolean;
};

export type SearchParamsTypeCrew = Omit<
  SearchStateType,
  'showRole' | 'showLocation' | 'showExperience'
> &
  Pick<SearchStateType, 'crewExperience'> & {
    page: string;
    limit: string;
    sortBy: string;
    sortDesc: string;
    classifications: string[];
    onDuty: string[];
    languages: string[];
    boatType: string[];
    boatTypeDetail: string[];
  };

export type SearchOnChangeType = (
  key: keyof SearchStateType,
  value: boolean | string | Date | null
) => void;

export const getSearchParamValues = (searchParams: ReadonlyURLSearchParams) => {
  const classifications = searchParams.get('classifications');
  const crewRoles = searchParams.get('crewRoles');
  const crewExperience = searchParams.get('crewExperience');
  const languages = searchParams.get('languages');
  const onDuty = searchParams.get('onDuty');
  const boatTypeDetail = searchParams.get('boatTypeDetail');
  const boatType = searchParams.get('boatType');

  return {
    city: searchParams.get('city') ?? '',
    crewRoles: crewRoles ? crewRoles.split(',') : [],
    crewExperience: crewExperience ? crewExperience.split(',') : [],
    page: searchParams.get('page') ?? null,
    limit: searchParams.get('limit') ?? null,
    sortBy: searchParams.get('sortBy') ?? null,
    sortDesc: searchParams.get('sortDesc') ?? null,
    classifications: classifications ? classifications.split(',') : [],
    languages: languages ? languages.split(',') : [],
    onDuty: onDuty ? onDuty.split(',') : [],
    boatTypeDetail: boatTypeDetail ? boatTypeDetail.split(',') : [],
    boatType: boatType ? boatType.split(',') : [],
  } as SearchParamsTypeCrew;
};

export const getSearchStateDefaultValues = (
  searchParams: ReadonlyURLSearchParams
) => {
  return {
    ...getSearchParamValues(searchParams),
    showRole: false,
    showLocation: false,
    showExperience: false,
  } as SearchStateType;
};

export const makeQueryStringFromObject = (obj: SearchParamsTypeCrew) =>
  QueryString.stringify(
    Object.fromEntries(
      Object.entries({
        ...obj,
        showRole: null,
        showLocation: null,
        showExperience: null,
      }).filter(([, v]) => v !== null && v !== '' && v.length !== 0)
    ),
    {
      skipNulls: true,
      arrayFormat: 'comma',
    }
  );

export const getAppliedFilters = (
  params: SearchParamsTypeCrew & {
    page: string | null;
    limit: string | null;
  }
) => {
  const filters: IGetCrewsRequestFilter[] = [];
  const filterKeys = Object.keys(params);

  filterKeys.forEach((filterKey: any) => {
    const value = params[filterKey as keyof SearchParamsTypeCrew];
    const filterMapping =
      FILTERS_MAPPING_CREW[filterKey as keyof FiltersCrewMappingType];

    if (!filterMapping || !value) {
      return;
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
        Column: filterMapping.Column,
        Value: filterMapping.transformValue
          ? (filterMapping.transformValue(value) as any)
          : value,
        Operator: filterMapping.Operator,
      });
    }
  });

  const defaultSorting = SORTING_ITEMS_CREW.find((item) => item.default);

  const filterObj: IGetCrewsRequest = {
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
          Concat: 'AND',
        };
      }),
  };

  return filterObj;
};

export default function useSearch(defaultParams?: any) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  const { data: crewRoles = [] } = useGetCrewRolesQuery();

  const params = useMemo(
    () => ({
      ...getSearchParamValues(searchParams),
      ...(defaultParams || {}),
    }),
    [defaultParams, searchParams, pathname]
  );

  const { data: availableFiltersCrew = [] } = useGetFiltersCrewQuery();

  const onSearch = useCallback(
    (state?: SearchStateType) => {
      router.push(
        `/crew/search?${makeQueryStringFromObject({
          ...params,
          ...state,
        } as any)}`
      );
    },
    [router, params]
  );

  const onClearFilters = useCallback(
    (state?: any) => {
      router.push(
        `/crew/search?${makeQueryStringFromObject(
          state
            ? state
            : ({
                crewRoles: params.crewRoles,
                city: params.city,
                crewExperience: params.crewExperience,
              } as any)
        )}`
      );
    },
    [params, router]
  );

  return {
    onSearch,
    params,
    onClearFilters,
    crewRoles,
    availableFiltersCrew,
  };
}
