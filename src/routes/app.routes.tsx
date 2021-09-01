import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Scheduling from "../screens/Scheduling";
import SchedulingDetails from "../screens/SchedulingDetails";
import CarDetails from "../screens/CarDetails";
import SchedulingComplete from "../screens/SchedulingComplete";
import MyCars from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="car-details" component={CarDetails} />
      <Screen name="my-cars" component={MyCars} />

      <Screen name="scheduling" component={Scheduling} />
      <Screen name="scheduling-details" component={SchedulingDetails} />
      <Screen name="scheduling-complete" component={SchedulingComplete} />
    </Navigator>
  );
}
