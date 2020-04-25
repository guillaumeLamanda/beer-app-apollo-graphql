import React, { FC } from "react";
import { UsersList } from "../../components";
import { useUsersPreview } from "../../hooks";
import { useHistory } from "react-router-dom";

export const UsersPage: FC = () => {
  const { users } = useUsersPreview();
  const { push } = useHistory();
  const onUserClick = (id: string) => push(`/users/${id}`);

  return <UsersList users={users} onUserClick={onUserClick} />;
};
