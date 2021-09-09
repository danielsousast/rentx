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
import { useNetInfo } from "@react-native-community/netinfo";

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

  const { isConnected } = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const { car, dates } = route.params as RouteParams;

  const total = Number(dates.length * car.price);

  async function handleConfirmPress() {
    setLoading(true);

    await api
      .post("rentals", {
        user_id: 1,
        car_id: car.id,
        total,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
      })
      .then(() =>
        navigate("success", {
          title: "Carro alugado!",
          message:
            "Agora você só precisa ir\naté a concessionária da RENTX\ne pegar seu automóvel",
          routeName: "home",
        })
      )
      .catch((error) => {
        console.log(error);
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
      <Header>
        <BackButton onPress={goBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
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
              R$ {car.price} x{dates.length} diárias
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
