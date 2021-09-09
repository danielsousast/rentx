import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

import api from "../../services/api";
import ModelCar from "../../database/models/Car";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarsList,
  CarWrapper,
  CarFooter,
  CarFooterPeriod,
  CarFooterTitle,
  CarFooterDate,
} from "./styles";

import Car from "../../components/Car";
import Loading from "../../components/Loading";
import BackButton from "../../components/BackButton";

export interface CarProps {
  car: ModelCar;
  user_id: string;
  id: string;
  start_date: string;
  end_date: string;
}

export default function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const { goBack } = useNavigation();

  async function loadCars() {
    try {
      const response = await api.get("/rentals");

      const formattedResponse = response.data.map((item: CarProps) => {
        return {
          car: item.car,
          start_date: format(parseISO(item.start_date), "dd/MM/yyyy"),
          end_date: format(parseISO(item.end_date), "dd/MM/yyyy"),
        };
      });

      setCars(formattedResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  const renderCar = ({ item }: { item: CarProps }) => (
    <CarWrapper>
      <Car car={item.car} />
      <CarFooter>
        <CarFooterTitle>Período</CarFooterTitle>
        <CarFooterPeriod>
          <CarFooterDate>{item.start_date}</CarFooterDate>
          <AntDesign
            name="arrowright"
            size={20}
            color={colors.title}
            style={{
              marginHorizontal: 10,
            }}
          />
          <CarFooterDate>{item.end_date}</CarFooterDate>
        </CarFooterPeriod>
      </CarFooter>
    </CarWrapper>
  );

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={colors.shape} onPress={goBack} />
        <Title>Seus agendamentos,{"\n"}estão aqui.</Title>
        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>05</AppointmentsQuantity>
          </Appointments>
          <CarsList
            data={cars}
            keyExtractor={(item) => String(item.car.id)}
            renderItem={renderCar}
          />
        </Content>
      )}
    </Container>
  );
}
