import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  IconBox,
  IconBoxRight,
  TextInput,
  PasswordVisibleButton,
} from "./styles";

interface InputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export default function PasswordInput({
  icon,
  style,
  value,
  ...rest
}: InputProps) {
  const { colors } = useTheme();

  const [isPasswordHide, setIsPasswordHide] = useState(true);

  function handlePasswordHide() {
    setIsPasswordHide((prevState) => !prevState);
  }

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleOnfocus() {
    setIsFocused(true);
  }

  function handleOnBlur() {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  return (
    <Container style={style}>
      <IconBox>
        <Feather
          name={icon}
          size={24}
          color={isFocused || isFilled ? colors.main : colors.text_details}
        />
      </IconBox>

      <TextInput
        {...rest}
        secureTextEntry={isPasswordHide}
        onFocus={handleOnfocus}
        onBlur={handleOnBlur}
        isFocused={isFocused}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <IconBoxRight isFocused={isFocused}>
        <PasswordVisibleButton onPress={handlePasswordHide}>
          <Feather
            name={isPasswordHide ? "eye-off" : "eye"}
            size={24}
            color={colors.text_details}
          />
        </PasswordVisibleButton>
      </IconBoxRight>
    </Container>
  );
}
