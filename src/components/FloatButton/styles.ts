import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled(RectButton)`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
