import React from "react";
import { Container, Title } from "./styles";

interface ComponentProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export default function Button({ title, color, onPress }: ComponentProps) {
  return (
    <Container onPress={onPress} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
