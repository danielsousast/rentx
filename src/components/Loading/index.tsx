import React from "react";
import { useTheme } from "styled-components";
import LottieView from "lottie-react-native";

import { Container } from "./styles";

import loading from "../../assets/loading.json";

export default function Loading() {
  const { colors } = useTheme();
  return (
    <Container>
      <LottieView
        source={loading}
        autoPlay
        loop
        style={{
          height: 200,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
