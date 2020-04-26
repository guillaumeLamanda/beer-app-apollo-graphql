import React, { FC } from "react";
import { Button, ButtonProps } from "grommet";
import { Favorite } from "grommet-icons";

type Props = {
  liked: boolean;
  onClick: () => void;
} & Omit<ButtonProps, "icon" | "onClick">;

const BeerLikeButton: FC<Props> = ({ liked, onClick, ...props }) => (
  <Button
    icon={<Favorite color={liked ? "brand" : undefined} />}
    onClick={onClick}
    {...props}
  />
);

export default BeerLikeButton;
