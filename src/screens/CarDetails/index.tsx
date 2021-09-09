import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Acessory from "../../components/Acessory";
import Button from "../../components/Button";

import {
  Container,
  Header,
  CarImages,
  Description,
  Brand,
  Name,
  Rent,
  Details,
  Period,
  Price,
  About,
  Acessories,
  Footer,
  OfflineInfo,
} from "./styles";

import ModelCar from "../../database/models/Car";
import { CarDTO } from "../../dtos/CardDTO";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import api from "../../services/api";

interface RouteParams {
  car: ModelCar;
}

export default function CarDetails() {
  const route = useRoute();
  const { car } = route.params as RouteParams;
  const { colors } = useTheme();

  const { isConnected } = useNetInfo();

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const { navigate, goBack } = useNavigation();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmPress() {
    navigate("scheduling", { car });
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);

      if (response.data) {
        setCarUpdated(response.data);
      }
    }

    if (isConnected === true) {
      fetchCarUpdated();
    }
  }, [isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyle,
          styles.header,
          { backgroundColor: colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={goBack} style={{ zIndex: 9999 }} />
        </Header>
        <Animated.View style={[sliderStyle]}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Acessories>
            {carUpdated.accessories.map((accessory) => (
              <Acessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Acessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmPress}
          enabled={isConnected === true}
        />
        {isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet par aver mais detalhes e agendar o seu carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 999,
  },
});
