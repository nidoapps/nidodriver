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
import { colors } from "@/themeColors";

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
      <View className="container   p-10 h-screen">
        <Text category="h3">{t("common.signIn")}</Text>
        <View className="my-6">
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
        </View>
        <View className="w-full">
          <Button disabled={!isValidEmail(email) || !password}>
            <Text category="h2">Continuar</Text>
          </Button>
        </View>
        <View className="flex-row my-4 gap-x-6">
          <Text category="s1">¿No tienes cuenta aún?</Text>
          <TouchableOpacity>
            <Text category="s1" style={{ color: colors.light.primary }}>
              {t("common.signUp")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
