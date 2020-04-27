import React, { FC } from "react";
import { Box, Text, Button, InfiniteScroll } from "grommet";
import { User, Beer } from "@ba/schema/src";

const BeersIndicator: FC<{ nb: number }> = ({ nb }) =>
  !!nb ? (
    <Text color="text-weak" size="small">{`${nb} bière${
      nb > 1 ? "s" : ""
    }`}</Text>
  ) : null;

type UserData = Pick<User, "id" | "name"> & { beers: Pick<Beer, "id">[] };
type Props = {
  users: Array<UserData>;
  onUserClick: (id: string) => void;
};

const UsersList: FC<Props> = ({ users, onUserClick }) => (
  <InfiniteScroll items={users}>
    {({ id, name, beers }: UserData) => (
      <Button onClick={() => onUserClick(id)} key={id} hoverIndicator>
        <Box gap="xsmall" pad="small">
          <Text>{name}</Text>
          <BeersIndicator nb={beers.length} />
        </Box>
      </Button>
    )}
  </InfiniteScroll>
);

export default UsersList;
