import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";

interface ComponentProps extends RectButtonProps {}

export default function FloatButton({ onPress }: ComponentProps) {
  const { colors } = useTheme();
  return (
    <Container onPress={onPress}>
      <Ionicons name="ios-car-sport" size={32} color={colors.shape} />
    </Container>
  );
}
