import styled, { css } from "styled-components/native";
import { TextInput as RNTextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconBox = styled.View`
  width: 55px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const IconBoxRight = styled.View<InputProps>`
  width: 55px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const TextInput = styled(RNTextInput)<InputProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const PasswordVisibleButton = styled(BorderlessButton)`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;
