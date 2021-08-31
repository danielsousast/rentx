import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
}

export default function SmallButton({ title, ...rest }: ComponentProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
