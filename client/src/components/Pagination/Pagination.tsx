import React, { FC } from "react";
import { Box, Button, Text } from "grommet";
import { Previous, Next } from "grommet-icons";

export type BeersPaginationProps = {
  page: number;
  onNext: () => void;
  onPrevious: () => void;
};

const BeersPagination: FC<BeersPaginationProps> = ({
  page,
  onPrevious,
  onNext,
}) => (
  <Box
    direction="row"
    pad="small"
    gap="small"
    align="center"
    margin={{ horizontal: "auto" }}
  >
    <Button disabled={page === 1} icon={<Previous />} onClick={onPrevious} />
    <Text>{page}</Text>
    <Button icon={<Next />} onClick={onNext} />
  </Box>
);

export default BeersPagination;
