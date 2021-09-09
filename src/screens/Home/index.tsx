import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, BackHandler, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import {
  BorderlessButton,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import ModelCar from "../../database/models/Car";

import api from "../../services/api";

import Loading from "../../components/Loading";
import FloatButton from "../../components/FloatButton";
import Car from "../../components/Car";

import Logo from "../../assets/logo.svg";

import {
  CarList,
  HomeContainer,
  HomeHeader,
  HomeHeaderContent,
  TotalCars,
} from "./styles";
import { useTheme } from "styled-components";

export default function Home() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<ModelCar[]>([] as ModelCar[]);

  const netInfo = useNetInfo();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  async function loadCars() {
    try {
      const carCollection = database.get<ModelCar>("cars");
      const cars = await carCollection.query().fetch();

      if (cars) {
        setCars(cars);
      }
    } catch (error) {
      console.log("LOAD CARS ERROR", error);
    }
    setIsLoading(false);
  }

  const { navigate } = useNavigation();

  function handleCarPress(car: ModelCar) {
    navigate("car-details", {
      car,
    });
  }

  function handleOpenMyCars() {
    navigate("my-cars");
  }

  function handleOpenProfile() {
    navigate("profile");
  }

  async function offlineSincronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        await api.post("/users/sync", user).catch((error) => {
          console.log("PULL ERROR", error);
        });
      },
    });
  }

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSincronize();
    }

    console.log(netInfo.isConnected);
  }, [netInfo.isConnected]);

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
          <BorderlessButton onPress={handleOpenProfile}>
            <Feather name="user" color={colors.main} size={24} />
          </BorderlessButton>
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
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            buttonStyle,
            {
              position: "absolute",
              bottom: 16,
              right: 22,
            },
          ]}
        >
          <FloatButton onPress={handleOpenMyCars} />
        </Animated.View>
      </PanGestureHandler>
    </HomeContainer>
  );
}

const styles = StyleSheet.create({});
