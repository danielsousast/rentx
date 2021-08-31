import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Header,
  CarImages,
  Content,
  Description,
  Brand,
  Name,
  Rent,
  Details,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Acessory from "../../components/Acessory";
import Button from "../../components/Button";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

export default function CarDetails() {
  const { navigate } = useNavigation();

  function handleConfirmPress() {
    navigate("scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <CarImages>
        <ImageSlider
          iamgesUrl={["https://pngimg.com/uploads/audi/audi_PNG99491.png"]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>AUDI</Brand>
            <Name>RS 5 Coupe </Name>
          </Description>

          <Rent>
            <Period>ao dia</Period>
            <Price>R$ 250</Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380KM/h" icon={SpeedSvg} />
          <Acessory name="3.2s" icon={AccelerationSvg} />
          <Acessory name="800 Hp" icon={ForceSvg} />

          <Acessory name="Gasolina" icon={GasolineSvg} />
          <Acessory name="Auto" icon={ExchangeSvg} />
          <Acessory name="2 pessoas" icon={PeopleSvg} />
        </Acessories>

        <About>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
        </About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmPress}
        />
      </Footer>
    </Container>
  );
}
