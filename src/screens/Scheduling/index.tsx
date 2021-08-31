import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";

import BackButton from "../../components/BackButton";
import ArrowSvg from "../../assets/arrow.svg";
import Button from "../../components/Button";
import CustomCalendar from "../../components/CustomCalendar";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Content,
  Footer,
} from "./styles";

export default function Scheduling() {
  const { colors } = useTheme();

  const { navigate } = useNavigation();

  function handleConfirmPress() {
    navigate("scheduling-details");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={colors.shape} />
        <Title>
          Escolha uma{"\n"}data de incício e{"\n"}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue>ss</DateValue>
            </DateValueContainer>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue>sss</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <CustomCalendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmPress} />
      </Footer>
    </Container>
  );
}
