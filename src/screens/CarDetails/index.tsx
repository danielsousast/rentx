import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
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
} from "./styles";

import { CarDTO } from "../../dtos/CardDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";

interface RouteParams {
  car: CarDTO;
}

export default function CarDetails() {
  const route = useRoute();
  const { car } = route.params as RouteParams;
  const { colors } = useTheme();

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
            <ImageSlider imagesUrl={car.photos} />
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
        <Acessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmPress}
        />
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
