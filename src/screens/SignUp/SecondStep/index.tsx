import React from "react";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import api from "../../../services/api";

import BackButton from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import Button from "../../../components/Button";
import PasswordInput from "../../../components/PasswordInput";

import {
  BulletContainer,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export default function SecondStep() {
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("Senhas informadas são diferentes");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.driverLicense,
      })
      .then(() => {
        navigate("success", {
          title: "Conta criada!",
          message: "Agora é só fazer o login\ne aproveirtar",
          routeName: "signin",
        });
      })
      .catch((e) => {
        Alert.alert("Opa!", "Não foi possível cadastrar");
      });
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
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              icon="lock"
              placeholder="Senha"
              style={{
                marginBottom: 8,
              }}
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              icon="lock"
              placeholder="Confirmar senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
