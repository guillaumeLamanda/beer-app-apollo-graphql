import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

export function useBeersPreview() {
  const { page, nextPage, previousPage } = useBeersPagination();
  const { data: { beers = [] } = {}, variables, fetchMore, ...rest } = useQuery<
    BeersPreviewQuery,
    BeersPreviewQueryVariables
  >(query, {
    variables: {
      page,
    },
  });

  return {
    beers,
    page: variables.page,
    nextPage,
    previousPage,
    ...rest,
  };
}
