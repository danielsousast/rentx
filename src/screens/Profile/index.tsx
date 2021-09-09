import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { useNetInfo } from "@react-native-community/netinfo";

import { useAuth } from "../../context/auth";

import BackButton from "../../components/BackButton";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  ContentHeader,
  Option,
  OptionTitle,
  Section,
  Footer,
} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";

export default function Profile() {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { user, signOut, updateUser } = useAuth();

  const { isConnected } = useNetInfo();

  const [avatar, setAvatar] = React.useState(user.avatar);
  const [name, setName] = React.useState(user.name);
  const [driverLicense, setDriverLicense] = React.useState(user.driver_license);

  const [option, setOption] = React.useState<"data" | "password">("data");

  function handleOptionChange(optionSelected: "data" | "password") {
    if (!isConnected === true && optionSelected === "password") {
      Alert.alert(
        "Você está offline",
        "Conecte-se a internet para mudar a senha"
      );
    } else {
      setOption(optionSelected);
    }
  }

  async function handleChangePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH obrigatória"),
        name: Yup.string().required("Nome obrigatório"),
      });

      await schema.validate({
        driverLicense,
        name,
      });

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert("Perfil atualizado com sucesso");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        console.log("UPDATE USER ERROR", error);
        Alert.alert("Não foi possível atualizar o perfil");
      }
    }
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se que ao sair precisará de conexão com internet para logar novamente",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            signOut();
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={colors.shape} onPress={goBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleChangePhoto}>
                <Feather name="camera" size={24} color={colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <ContentHeader>
              <Option
                active={option === "data"}
                onPress={() => handleOptionChange("data")}
              >
                <OptionTitle active={option === "data"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "password"}
                onPress={() => handleOptionChange("password")}
              >
                <OptionTitle active={option === "password"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </ContentHeader>
            {option === "data" && (
              <Section>
                <Input
                  icon="user"
                  placeholder="Nome"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    marginBottom: 8,
                  }}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  icon="mail"
                  editable={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    marginBottom: 8,
                  }}
                  defaultValue={user.email}
                />
                <Input
                  icon="credit-card"
                  placeholder="CHH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            )}

            {option === "password" && (
              <Section>
                <PasswordInput
                  icon="lock"
                  placeholder="Senha atual"
                  style={{
                    marginBottom: 8,
                  }}
                />

                <PasswordInput
                  icon="lock"
                  placeholder="Nova senha"
                  style={{
                    marginBottom: 8,
                  }}
                />

                <PasswordInput
                  icon="lock"
                  placeholder="Confirmar senha"
                  style={{
                    marginBottom: 8,
                  }}
                />
              </Section>
            )}
          </Content>
          <Footer>
            <Button title="Salvar" onPress={handleUpdateUser} />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
