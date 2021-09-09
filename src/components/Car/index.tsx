import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CardDTO";
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from "./styles";

import ModelCar from "../../database/models/Car";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
interface ComponentProps extends RectButtonProps {
  car: ModelCar;
}

export default function Car({ car, ...rest }: ComponentProps) {
  const MotorIcon = getAccessoryIcon(car.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        resizeMode="center"
        source={{
          uri: car.thumbnail,
        }}
      />
    </Container>
  );
}
