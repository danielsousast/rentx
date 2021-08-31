import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SmallButton from "../../components/SmallButton";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

export default function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  function handleOkPress() {
    navigate("home");
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
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {"\n"} até a concessionária da RENTX{"\n"} e
          pegar seu automóvel
        </Message>
      </Content>
      <Footer>
        <SmallButton title="Ok" onPress={handleOkPress} />
      </Footer>
    </Container>
  );
}
