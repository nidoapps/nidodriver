import React, { useState, useRef } from "react";
import { SafeAreaView, View, TextInput } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import { t } from "@/locales/i18n";

const StyledInput = styled(Input);

const ValidateOtpCode = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([null, null, null, null]);
  const handleInputChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <SafeAreaView className="bg-white">
      <View className="flex items-center py-20 px-8 h-screen">
        <View className="gap-y-4 items-center text-center">
          <Text category="h6">{t("signIn.inputOtpCode")}</Text>
          <Text category="p1" className="my-8">
            {t("signIn.otpCodeWasSent")} <Text category="s2">66553422</Text>
          </Text>
        </View>
        <View className="flex flex-row justify-center gap-x-4 items-center my-14">
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChangeText={(value) => handleInputChange(value, index)}
              maxLength={1}
              keyboardType="number-pad"
              className="w-14 border border-solid border-gray-300 rounded-lg h-14 text-center focus:border-teal-500"
              textAlign="center"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleInputChange("", index);
                }
              }}
            />
          ))}
        </View>
        <View className="w-full gap-y-2">
          <Button size="large" appearance="ghost">
            <Text category="s2" className="mt-4">
              {t("signIn.resendCode")}
            </Text>
          </Button>
          <Button size="large" disabled={otp.length < 4} onPress={() => {}}>
            <Text category="h2"> {t("common.continue")} </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ValidateOtpCode;
