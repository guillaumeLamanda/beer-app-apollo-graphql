import React, { FC } from "react";
import { Box, Text, Button } from "grommet";
import { User, Beer } from "@ba/schema/src";

const BeersIndicator: FC<{ nb: number }> = ({ nb }) =>
  !!nb ? (
    <Text color="text-weak" size="small">{`${nb} bière${
      nb > 1 ? "s" : ""
    }`}</Text>
  ) : null;

type Props = {
  users: Array<Pick<User, "id" | "name"> & { beers: Pick<Beer, "id">[] }>;
  onUserClick: (id: string) => void;
};

const UsersList: FC<Props> = ({ users, onUserClick }) => (
  <Box as="ul" gap="small">
    {users.map(({ id, name, beers }) => (
      <Button onClick={() => onUserClick(id)} as="li" key={id} hoverIndicator>
        <Box gap="xsmall" pad="small">
          <Text>{name}</Text>
          <BeersIndicator nb={beers.length} />
        </Box>
      </Button>
    ))}
  </Box>
);

export default UsersList;
