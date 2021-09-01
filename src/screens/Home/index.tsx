import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import api from "../../services/api";

import Logo from "../../assets/logo.svg";
import Car from "../../components/Car";

import {
  CarList,
  HomeContainer,
  HomeHeader,
  HomeHeaderContent,
  TotalCars,
} from "./styles";
import { CarDTO } from "../../dtos/CardDTO";
import Loading from "../../components/Loading";
import FloatButton from "../../components/FloatButton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);

  async function loadCars() {
    try {
      const response = await api.get("/cars");

      if (response) {
        setCars(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadCars();
  }, []);

  const { navigate } = useNavigation();

  function handleCarPress(car: CarDTO) {
    navigate("car-details", {
      car,
    });
  }

  function handleOpenMyCars() {
    navigate("my-cars");
  }

  return (
    <HomeContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <HomeHeader>
        <HomeHeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HomeHeaderContent>
      </HomeHeader>
      {isLoading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car car={item} onPress={() => handleCarPress(item)} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      )}
      <FloatButton onPress={handleOpenMyCars} />
    </HomeContainer>
  );
}
