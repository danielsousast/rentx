import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import { useAuth } from "../context/auth";
import AuthRoutes from "./auth.routes";
import Loading from "../components/Loading";

export default function Routes() {
  const { user, loading } = useAuth();

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
