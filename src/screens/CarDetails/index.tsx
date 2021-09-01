import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Acessory from "../../components/Acessory";
import Button from "../../components/Button";

import {
  Container,
  Header,
  CarImages,
  Content,
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

interface RouteParams {
  car: CarDTO;
}

export default function CarDetails() {
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const { navigate, goBack } = useNavigation();

  function handleConfirmPress() {
    navigate("scheduling", { car });
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack} />
      </Header>
      <CarImages>
        <ImageSlider iamgesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
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

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmPress}
        />
      </Footer>
    </Container>
  );
}
