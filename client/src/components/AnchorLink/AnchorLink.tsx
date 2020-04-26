import { Anchor, AnchorProps } from "grommet";
import React from "react";
import { useHistory } from "react-router-dom";

export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  const { push } = useHistory();
  const onClick = () => push(props.to);

  return <Anchor onClick={onClick} {...props} />;
};

export type AnchorLinkProps = {
  to: string;
} & AnchorProps &
  Omit<JSX.IntrinsicElements["a"], "color">;
