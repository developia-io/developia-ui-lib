'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/app/navigation';
import QueryString from 'qs';
import {
  useGetRouteCountriesQuery,
  useGetRouteFinderCitiesQuery,
  useGetRouteFinderCountriesQuery,
} from '@/store/services/routeService';
import { sortOptions, styleList, tripLengthList } from '@/constants/route';

type ParamTypes = 'style' | 'tripLength' | 'country' | 'sort' | 'city';
type Params = {
  style: string[];
  tripLength: number[];
  country: number[];
  sort: string;
  city: number[];
};

const useRouteFinder = () => {
  const { data: countryList } = useGetRouteCountriesQuery();
  const { data: countryListRouteFinder } = useGetRouteFinderCountriesQuery();
  const { data: citiesListRouteFinder } = useGetRouteFinderCitiesQuery();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramsFromQuery = useMemo(() => {
    return {
      style: searchParams.get('style')?.split(',') || [],
      tripLength:
        searchParams
          .get('tripLength')
          ?.split(',')
          .map((j) => Number(j)) || [],
      country:
        searchParams
          .get('country')
          ?.split(',')
          .map((j) => Number(j)) || [],
      city:
        searchParams
          .get('city')
          ?.split(',')
          .map((j) => Number(j)) || [],
      sort: searchParams.get('sort') || '',
    };
  }, [searchParams]);

  const [params, setParams] = useState<Params>({
    ...paramsFromQuery,
  });

  useEffect(() => {
    setParams({
      ...paramsFromQuery,
    });
  }, [paramsFromQuery]);

  const getQueryString = useCallback((values: Params) => {
    const query = QueryString.stringify(
      Object.fromEntries(
        Object.entries({
          ...values,
        }).filter(([, v]) => v !== null && v !== '' && (v as any)?.length !== 0)
      ),
      {
        skipNulls: true,
        arrayFormat: 'comma',
      }
    );

    return query;
  }, []);

  const updateParamWithRedirect = (
    type: ParamTypes,
    value: any,
    path: string
  ) => {
    setParamsWithCallback(type, value, (newParams) => {
      const query = QueryString.parse(getQueryString(newParams));

      router.push(
        { pathname: path, query: query as any },
        {
          scroll: true,
        }
      );
    });
  };

  const updateParam = (type: ParamTypes, value: any) => {
    setParamsWithCallback(type, value, (newParams) => {
      updateSearchQuery(getQueryString(newParams));
    });
  };

  const updateParamWithRedirectTwo = (
    type1: ParamTypes,
    value1: any,
    type2: ParamTypes,
    value2: any,
    path: string
  ) => {
    setParamsWithCallbackTwo([type1, type2], [value1, value2], (newParams) => {
      const query = QueryString.parse(getQueryString(newParams));

      router.push(
        { pathname: path, query: query as any },
        {
          scroll: true,
        }
      );
    });
  };

  const setParamsWithCallbackTwo = (
    types: [ParamTypes, ParamTypes],
    values: [any, any],
    cb: (newParams: Params) => void
  ) => {
    const newParams = {
      ...params,
    };
    newParams[types[0]] = values[0];
    newParams[types[1]] = values[1];
    setParams(newParams);
    cb && cb(newParams);
  };

  const setParamsWithCallback = (
    type: ParamTypes,
    value: any,
    cb: (newParams: Params) => void
  ) => {
    const newParams = {
      ...params,
    };
    newParams[type] = value;
    setParams(newParams);
    cb && cb(newParams);
  };

  const updateSearchQuery = useCallback(
    (q: any) => {
      const query = QueryString.parse(q);

      router.push(
        { pathname, query: query as any },
        {
          scroll: true,
        }
      );
    },
    [pathname, router]
  );

  return {
    styleList,
    tripLengthList,
    sortOptions,
    countryList,
    params,
    updateParam,
    updateParamWithRedirect,
    countryListRouteFinder,
    citiesListRouteFinder,
    updateParamWithRedirectTwo,
  };
};

export default useRouteFinder;
