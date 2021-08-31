import React from "react";
import {
  Container,
  ImageIndexContainer,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ComponentProps {
  iamgesUrl: string[];
}

export default function ImageSlider({ iamgesUrl }: ComponentProps) {
  return (
    <Container>
      <ImageIndexContainer>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexContainer>

      <CarImageWrapper>
        <CarImage resizeMode="contain" source={{ uri: iamgesUrl[0] }} />
      </CarImageWrapper>
    </Container>
  );
}
