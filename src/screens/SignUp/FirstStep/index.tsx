import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Yup from "yup";

import BackButton from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import {
  BulletContainer,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

export default function FirstStep() {
  const { navigate, goBack } = useNavigation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [driverLicense, setDriverLicense] = React.useState("");

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("E-mail inválido"),
        driverLicense: Yup.string().required("CNH obrigatória"),
      });

      const user = {
        name,
        email,
        driverLicense,
      };

      await schema.validate(user);

      navigate("secondstep", { user });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa!", error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={goBack} />

            <BulletContainer>
              <Bullet active={true} />
              <Bullet active={false} />
            </BulletContainer>
          </Header>
          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              icon="user"
              placeholder="Nome"
              style={{
                marginBottom: 8,
              }}
              value={name}
              onChangeText={setName}
            />
            <Input
              icon="mail"
              placeholder="Email"
              keyboardType="email-address"
              style={{
                marginBottom: 8,
              }}
              value={email}
              onChangeText={setEmail}
            />

            <Input
              icon="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
