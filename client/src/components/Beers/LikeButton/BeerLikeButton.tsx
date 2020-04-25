import React, { FC } from "react";
import { Button, ButtonProps, ThemeType } from "grommet";
import { Favorite, IconProps as GrommetIconProps } from "grommet-icons";
import styled, { css } from "styled-components";

type Props = {
  liked: boolean;
  onClick: () => void;
} & Omit<ButtonProps, "icon" | "onClick">;

const filledIcon = css`
  path[fill="none"] {
    fill: ${(props: GrommetIconProps & { theme: ThemeType }) =>
      (props.theme?.global?.colors?.[props.color || "brand"] as {
        dark: string;
      })?.dark};
  }
`;

type FavoriteIconProps = GrommetIconProps & { filled: boolean };

const FavoriteIcon: FC<FavoriteIconProps> = (props) => <Favorite {...props} />;

const FavoriteFillableIcon = styled(FavoriteIcon)`
  ${(props: FavoriteIconProps) => (props.filled ? filledIcon : "")}
`;

const BeerLikeButton: FC<Props> = ({ liked, onClick, ...props }) => (
  <Button
    icon={<FavoriteFillableIcon filled={liked} color="brand" />}
    onClick={onClick}
    {...props}
  />
);

export default BeerLikeButton;
