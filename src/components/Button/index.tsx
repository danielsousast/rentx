import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ComponentProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled: boolean;
  loading?: boolean;
}

export default function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
}: ComponentProps) {
  const { colors } = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
