import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import Car from "../../components/Car";

import {
  CarList,
  HomeContainer,
  HomeHeader,
  HomeHeaderContent,
  TotalCars,
} from "./styles";

export default function Home() {
  const car = {
    key: "1",
    brand: "AUDI",
    name: "RD 5 Coupe",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail: "https://pngimg.com/uploads/audi/audi_PNG99491.png",
  };

  const { navigate } = useNavigation();

  function handleCarPress() {
    navigate("car-details");
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
          <TotalCars>Total de 12 carros</TotalCars>
        </HomeHeaderContent>
      </HomeHeader>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => (
          <Car car={car} onPress={() => handleCarPress(item)} />
        )}
        keyExtractor={(item) => String(item)}
      />
    </HomeContainer>
  );
}
