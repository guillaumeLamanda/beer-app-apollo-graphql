import React, { FC } from "react";
import { useFeed } from "../../hooks";
import { Heading, Text, Box, Image } from "grommet";
import { User } from "@ba/schema/src";
import { UserLoggedIn_userLoggedIn } from "../../hooks/feed/__generated__/UserLoggedIn";
import { LikeAction } from "../../globalTypes";

const LoggedInText: FC<Pick<User, "name">> = ({ name }) => (
  <Text>{`${name} vient d'arriver ! 🚀`}</Text>
);

const likeActionTrad = (action: LikeAction) => {
  switch (action) {
    case LikeAction.like:
      return "aime";
    case LikeAction.dislike:
      return "rejete cruellement";
    default:
      return "fait des trucs chelous";
  }
};

const UserLikeText: FC<{
  username: string;
  beername: string;
  action: LikeAction;
}> = ({ username, beername, action }) => (
  <Text>{`${username} ${likeActionTrad(action)} ${beername} 🍻`}</Text>
);

export const FeedPage: FC = () => {
  const {
    feed,
    errors: { likeError, loginError },
  } = useFeed();

  return (
    <>
      <Heading>Fil d'actualités</Heading>
      <Text>
        Vous pouvez voir apparaitre ici les inscriptions et l'ajout de bières en
        favori
      </Text>

      {(likeError || loginError) && (
        <Box flex align="center" justify="center">
          <Box gap="medium">
            <Text>
              Deployer sur du serverless ne permet pas les souscriptions
            </Text>
            <Image
              src="https://media.giphy.com/media/NTY1kHmcLsCsg/giphy.gif"
              fit="contain"
            />
          </Box>
        </Box>
      )}

      <Box pad="large" gap="small">
        {feed.map((item) => {
          if ("userLoggedIn" in item)
            return (
              <LoggedInText
                key={item.userLoggedIn?.id}
                {...(item.userLoggedIn as UserLoggedIn_userLoggedIn)}
              />
            );
          if ("userLikedABeer" in item) {
            return (
              <UserLikeText
                username={item.userLikedABeer!.user.name}
                beername={item.userLikedABeer!.beer.name}
                action={item.userLikedABeer!.action}
              />
            );
          }
          return null;
        })}
      </Box>
    </>
  );
};
