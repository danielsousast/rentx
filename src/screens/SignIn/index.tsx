import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";

import { useAuth } from "../../context/auth";

import Button from "../../components/Button";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

import { Container, Header, Subtitle, Title, Form, Footer } from "./styles";

export default function SignIn() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("Senha é obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({
        email,
        password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      } else {
        return Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer loguin, verifique suas credenciais"
        );
      }
    }
  }

  function handleSignUp() {
    navigate("firststep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{"\n"}
              uma experiência incrível
            </Subtitle>
          </Header>
          <Form>
            <Input
              value={email}
              onChangeText={setEmail}
              icon="mail"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={{
                marginBottom: 8,
              }}
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              icon="lock"
              placeholder="Senha"
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              loading={false}
              enabled={true}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleSignUp}
              loading={false}
              enabled={true}
              color={colors.background_secondary}
              light
              style={{ marginTop: 8 }}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
