import { Container } from "@/components/Container";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input, Text } from "@ui-kitten/components";
import { t } from "@/locales/i18n";
import { styles } from "./styles";
import { isValidEmail } from "@/utils/common";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { styled } from "nativewind";
const StyledView = styled(View);

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
  iosClientId:
    "com.googleusercontent.apps.588179861015-sud8a3flp5l9tpnhi8a2kc1hlhtpqfpj",
  webClientId:
    "588179861015-p02rbn9gukbikddveceg82qkp3hte4oi.apps.googleusercontent.com",
});

const SignIn = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderInputIcon = (props): React.ReactElement => (
    <TouchableOpacity onPress={toggleSecureEntry}>
      <Icon
        {...props}
        fill="#8F9BB3"
        name={!secureTextEntry ? "eye" : "eye-off"}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Container justifyContent="center" padding="30" alignItems="center">
        <Text category="h3">Iniciar sesión</Text>
        <Container margin="20px 0">
          <Input
            style={styles.input}
            placeholder="Correo electrónico"
            label={t("common.email")}
            onChangeText={setEmail}
          />
          <Input
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderInputIcon}
            label={t("common.password")}
            onChangeText={setPassword}
          />
          <Text category="s2">¿Olvidaste tu contraseña?</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 30,
            }}
          >
            <Button
              disabled={!isValidEmail(email) || !password}
              style={{ flex: 1 }}
            >
              <Text category="h2">Continuar</Text>
            </Button>
          </View>
          <View style={styles.linkContainer}>
            <Text category="s1">¿No tienes cuenta aún?</Text>
            <TouchableOpacity>
              <Text category="s1" style={styles.link}>
                Registrate
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 30,
            }}
          >
            <GoogleSigninButton
              style={{ flex: 1 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={() => {}}
            />
          </View>
          <StyledView className=""></StyledView>
        </Container>
      </Container>
    </SafeAreaView>
  );
};

export default SignIn;
