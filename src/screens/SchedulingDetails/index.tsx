import React from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

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
  Acessories,
  Footer,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  CalendarIcon,
  RentalPrice,
  PriceDetails,
  PriceLabel,
  PriceQuota,
  PriceTotal,
} from "./styles";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

export default function SchedulingDetails() {
  const { colors } = useTheme();

  const { navigate } = useNavigation();

  function handleConfirmPress() {
    navigate("scheduling-complete");
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <CarImages>
        <ImageSlider
          iamgesUrl={["https://pngimg.com/uploads/audi/audi_PNG99491.png"]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>AUDI</Brand>
            <Name>RS 5 Coupe </Name>
          </Description>

          <Rent>
            <Period>ao dia</Period>
            <Price>R$ 250</Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380KM/h" icon={SpeedSvg} />
          <Acessory name="3.2s" icon={AccelerationSvg} />
          <Acessory name="800 Hp" icon={ForceSvg} />

          <Acessory name="Gasolina" icon={GasolineSvg} />
          <Acessory name="Auto" icon={ExchangeSvg} />
          <Acessory name="2 pessoas" icon={PeopleSvg} />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>20/06/20212</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>20/06/20212</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <PriceLabel>TOTAL</PriceLabel>
          <PriceDetails>
            <PriceQuota>R$ 580 x3 diárias</PriceQuota>
            <PriceTotal>R$ 2.900</PriceTotal>
          </PriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmPress}
          color={colors.success}
        />
      </Footer>
    </Container>
  );
}
