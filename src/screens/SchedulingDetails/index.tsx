import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { format } from "date-fns";

import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Acessory from "../../components/Acessory";
import Button from "../../components/Button";

import { CarDTO } from "../../dtos/CardDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import getPlataformDate from "../../utils/getPlatformDate";
import api from "../../services/api";

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

interface RouteParams {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation();

  const { car, dates } = route.params as RouteParams;

  const total = Number(dates.length * car.rent.price);

  async function handleConfirmPress() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigate("scheduling-complete"))
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possível realizar o agendamento");
      });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

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
            <Name>{car.name}</Name>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <PriceLabel>TOTAL</PriceLabel>
          <PriceDetails>
            <PriceQuota>
              R$ {car.rent.price} x{dates.length} diárias
            </PriceQuota>
            <PriceTotal>R$ {total}</PriceTotal>
          </PriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmPress}
          color={colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
