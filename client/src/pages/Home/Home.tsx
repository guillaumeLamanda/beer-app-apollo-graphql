import { Anchor, Box, Button, Heading, Paragraph, Text } from "grommet";
import React from "react";
import { useHistory } from "react-router-dom";

export default function HomeRoute() {
  const { push } = useHistory();

  const goTo = (url: string) => push(url);

  return (
    <Box fill>
      <Heading level="1">{"🍺 Bienvenue sur BeerApp"}</Heading>
      <Paragraph>
        {`Ce site est une démonstration d'un projet React + Apollo, fait pour le BrestJS. Vous pouvez consulter les sources `}
        <Anchor
          href="https://github.com/guillaumeLamanda/beer-app-apollo-graphql/"
          label="ici"
          target="_blank"
        />
      </Paragraph>
      <Box as="ul" gap="small">
        <Button as="li" onClick={() => goTo("/feed")}>
          <Box direction="column">
            <Text size="large">{"📄 Feed "}</Text>
            <Text size="small">
              {
                "ne fonctionne qu'en local, les souscriptions ne fonctionnant pas sur serverless"
              }
            </Text>
          </Box>
        </Button>
        <Button as="li" onClick={() => goTo("/beers")}>
          <Text size="large">{"🍻 Liste"}</Text>
        </Button>
        <Button as="li" onClick={() => goTo("/users")}>
          <Text size="large">{"🙍‍♀️ utilisateurs"}</Text>
        </Button>
      </Box>
    </Box>
  );
}
