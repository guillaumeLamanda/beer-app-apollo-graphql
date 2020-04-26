import React, { FC } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Text,
  Form,
  FormField,
  TextInput,
} from "grommet";

type Props = {
  onLogin: (name: string) => void;
  error?: string;
};

const Auth: FC<Props> = ({ onLogin, error }) => (
  <Box fill align="center" justify="center">
    <Box pad="large" elevation="medium">
      <Tabs>
        <Tab title="Connexion">
          <Box pad="medium" gap="medium">
            <Text size="small" color="text-weak">
              Si l'utilisateur n'existe pas il sera créé
            </Text>
            <Form
              onSubmit={(e: any) => {
                onLogin(e.value.name);
              }}
            >
              <FormField label="Nom">
                <TextInput name="name" />
              </FormField>
              <Button type="submit" primary label="Connexion" />
            </Form>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  </Box>
);

export default Auth;
