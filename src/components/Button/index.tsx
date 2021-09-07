import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export default function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  style,
}: ComponentProps) {
  const { colors } = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={[style, { opacity: !enabled || loading ? 0.5 : 1 }]}
    >
      {loading ? (
        <ActivityIndicator color={colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
