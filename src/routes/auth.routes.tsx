import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import FirstStep from "../screens/SignUp/FirstStep";
import SecondStep from "../screens/SignUp/SecondStep";
import Success from "../screens/Success";
import Home from "../screens/Home";
import AppRoutes from "./app.routes";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      <Screen name="splash" component={Splash} />
      <Screen name="signin" component={SignIn} />

      <Screen name="firststep" component={FirstStep} />
      <Screen name="secondstep" component={SecondStep} />
      <Screen name="success" component={Success} />
    </Navigator>
  );
}
