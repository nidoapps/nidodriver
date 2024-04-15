import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { NavigationProp } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";

interface BackButtonProps {
  params?: object;
  navigation: NavigationProp<RootStackParams>;
  onPress?: () => void;
  overrideBack?: RootStackParams;
  canGoBack?: boolean;
}

const BackButton = ({
  onPress,
  canGoBack,
  params = {},
  navigation: { navigate },
  overrideBack,
}: BackButtonProps) => {
  const handlePress = useCallback(() => {
    if (overrideBack) {
      navigate(overrideBack as any, params);
    } else if (onPress) {
      onPress();
    }
  }, [overrideBack, navigate, onPress, params]);

  if (!canGoBack) {
    return null;
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon name="arrow-back" />
    </TouchableOpacity>
  );
};

export default BackButton;
