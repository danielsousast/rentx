import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Scheduling from "../screens/Scheduling";
import SchedulingDetails from "../screens/SchedulingDetails";
import CarDetails from "../screens/CarDetails";
import Success from "../screens/Success";
import MyCars from "../screens/MyCars";
import Splash from "../screens/Splash";

import Profile from "../screens/Profile";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      <Screen name="splash" component={Splash} />

      <Screen name="home" component={Home} />
      <Screen name="profile" component={Profile} />

      <Screen name="car-details" component={CarDetails} />
      <Screen name="my-cars" component={MyCars} />

      <Screen name="scheduling" component={Scheduling} />
      <Screen name="scheduling-details" component={SchedulingDetails} />
      <Screen name="success" component={Success} />
    </Navigator>
  );
}
