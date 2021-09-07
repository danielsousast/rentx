import React from "react";
import { AuthProvider } from "./auth";

interface Props {
  children: React.ReactNode;
}

function AppProvider({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
