import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import SmallButton from "../../components/SmallButton";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

interface Params {
  title: string;
  message: string;
  routeName: string;
}

export default function Success() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  const { title, message, routeName } = route.params as Params;

  function handleOkPress() {
    navigate(routeName);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <SmallButton title="Ok" onPress={handleOkPress} />
      </Footer>
    </Container>
  );
}
