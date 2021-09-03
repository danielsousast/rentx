import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const AnimatedButton = Animated.createAnimatedComponent(Container);

interface ComponentProps extends RectButtonProps {}

export default function FloatButton({ onPress }: ComponentProps) {
  const { colors } = useTheme();
  return (
    <AnimatedButton onPress={onPress}>
      <Ionicons name="ios-car-sport" size={32} color={colors.shape} />
    </AnimatedButton>
  );
}
