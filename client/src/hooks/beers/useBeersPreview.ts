import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Beer } from "@ba/schema";
import { useBeersPagination } from "./useBeersPagination";
import {
  BeersPreviewQuery,
  BeersPreviewQueryVariables,
} from "./__generated__/BeersPreviewQuery";

export const BeerPreviewFragment = gql`
  fragment BeerPreviewFragment on Beer {
    id
    name
  }
`;

const query = gql`
  query BeersPreviewQuery($page: Int!) {
    beers(input: { page: $page, pageSize: 10 }) {
      ...BeerPreviewFragment
    }
  }

  ${BeerPreviewFragment}
`;

type TData = { beers: Array<Pick<Beer, "id" | "name">> };
type TVariables = { page: number };

export function useBeersPreview() {
  const { page, nextPage, previousPage } = useBeersPagination();
  const { data, variables, fetchMore, ...rest } = useQuery<
    BeersPreviewQuery,
    BeersPreviewQueryVariables
  >(query, {
    variables: {
      page,
    },
  });

  const beers = useMemo(() => {
    return data?.beers || [];
  }, [data]);

  return {
    beers,
    page: variables.page,
    nextPage,
    previousPage,
    ...rest,
  };
}
