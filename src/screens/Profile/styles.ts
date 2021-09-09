import styled, { css } from "styled-components/native";
import {
  BorderlessButton,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import FastImage from "react-native-fast-image";

interface OptionProps {
  active: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  padding: 0 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header};
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
  font-size: ${RFValue(22)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  margin-top: 48px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled(FastImage)`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 142px;
`;

export const ContentHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const Option = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})<OptionProps>`
  padding-bottom: 14px;
  ${({ active }) =>
    active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_details};
  font-size: ${RFValue(20)}px;
`;

export const Section = styled.View``;

export const Footer = styled.View`
  margin-top: 16px;
  padding: 0 24px;
`;
