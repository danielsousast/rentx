import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: "center",
  },
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 38px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_details};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_details};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
`;

export const Acessories = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
  justify-content: space-between;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px 24px ${getStatusBarHeight() + 24}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  padding-bottom: 16px;
`;

export const CalendarIcon = styled.View`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_details};
  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const PriceDetails = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceLabel = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_details};
  text-transform: uppercase;
`;

export const PriceQuota = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const PriceTotal = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.success};
`;
