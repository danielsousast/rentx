import { useState } from "react";
import React, { useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import {
  Container,
  ImageIndexContainer,
  CarImageWrapper,
  CarImage,
} from "./styles";
import Bullet from "../Bullet";

interface ComponentProps {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
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
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexContainer>

      <FlatList
        horizontal
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage resizeMode="contain" source={{ uri: item.photo }} />
          </CarImageWrapper>
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
