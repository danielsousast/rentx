import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import { Container, IconBox, TextInput } from "./styles";

interface InputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export default function Input({ icon, style, value, ...rest }: InputProps) {
  const { colors } = useTheme();

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
        onFocus={handleOnfocus}
        onBlur={handleOnBlur}
        {...rest}
        isFocused={isFocused}
      />
    </Container>
  );
}
