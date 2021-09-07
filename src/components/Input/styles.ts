import styled, { css } from "styled-components/native";
import { TextInput as RNTextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

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
