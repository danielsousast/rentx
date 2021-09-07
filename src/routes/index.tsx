import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "./app.routes";
import { useAuth } from "../context/auth";
import AuthRoutes from "./auth.routes";

export default function Routes() {
  const { user } = useAuth();

  console.log(user);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
