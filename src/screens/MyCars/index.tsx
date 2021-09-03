import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import BackButton from "../../components/BackButton";
import { CarDTO } from "../../dtos/CardDTO";
import api from "../../services/api";

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

export interface CarProps {
  car: CarDTO;
  user_id: string;
  id: string;
  startDate: string;
  endDate: string;
}

export default function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const { goBack } = useNavigation();

  async function loadCars() {
    try {
      const response = await api.get("/schedules_byuser?user_id=1");

      setCars(response.data);
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
          <CarFooterDate>{item.startDate}</CarFooterDate>
          <AntDesign
            name="arrowright"
            size={20}
            color={colors.title}
            style={{
              marginHorizontal: 10,
            }}
          />
          <CarFooterDate>{item.endDate}</CarFooterDate>
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
            keyExtractor={(item) => String(item.id)}
            renderItem={renderCar}
          />
        </Content>
      )}
    </Container>
  );
}
