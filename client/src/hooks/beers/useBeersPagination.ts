import { useState } from "react";

export const useBeersPagination = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(page + 1);

  const previousPage = () => setPage(page - 1);

  return { page, nextPage, previousPage };
};
