import { useState } from "react";
import React, { useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import {
  Container,
  ImageIndexContainer,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ComponentProps {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export default function ImageSlider({ imagesUrl }: ComponentProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;

    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexContainer>
        {imagesUrl.map((_, index) => (
          <ImageIndex key={index} active={index === imageIndex} />
        ))}
      </ImageIndexContainer>

      <FlatList
        horizontal
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage resizeMode="contain" source={{ uri: item }} />
          </CarImageWrapper>
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
