import styled, { css } from 'styled-components/native';
import { Dimensions, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

import { ScheduleItemProps } from '../../@types/OrphanageDetails';

export const Container = styled.ScrollView`
  ${({ theme }) => css`
    flex: 1;
  `}
`;

export const ImagesContainer = styled.View`
  ${({ theme }) => css`
    height: 240px;
  `}
`;

export const Image = styled.Image`
  ${({ theme }) => css`
    width: ${Dimensions.get('window').width}px;
    height: 240px;

    resize-mode: cover;
  `}
`;

export const DetailsContainer = styled.View`
  ${({ theme }) => css`
    padding: 24px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textTitleSecondary};

    font-size: 30px;
    font-family: ${theme.fonts.medium};
  `}
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    margin-top: 16px;

    color: ${theme.colors.textBase};

    line-height: 24px;
    font-family: ${theme.fonts.regular};
  `}
`;

export const MapContainer = styled.View`
  ${({ theme }) => css`
    margin-top: 40px;

    background-color: ${theme.colors.primaryLighter};

    border-radius: 20px;
    border-width: 1.2px;
    border-color: ${theme.colors.primaryLight};

    overflow: hidden;
  `}
`;

export const Map = styled(MapView)`
  ${({ theme }) => css`
    width: 100%;
    height: 150px;
  `}
`;

export const RoutesContainer = styled(TouchableOpacity)<TouchableOpacityProps>`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;

    padding: 16px;
  `}
`;

export const RoutesText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textTitlePrimary};

    font-family: ${theme.fonts.medium};
  `}
`;

export const Separator = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 0.8px;

    background-color: ${theme.colors.backgroundLineInWhite};

    margin: 40px 0;
  `}
`;

export const ScheduleContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 24px;
  `}
`;

const scheduleItemVariants = {
  info: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.primaryLighter};
      border-color: ${theme.colors.primaryLight};
    `}
  `,

  opened: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.successLow};
      border-color: ${theme.colors.successLight};
    `}
  `,

  closed: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.errorLighter};
      border-color: ${theme.colors.errorLight};
    `}
  `,
};

export const ScheduleItem = styled.View<ScheduleItemProps>`
  ${({ theme, variant }) => css`
    width: 48%;

    padding: 20px;

    border-width: 1px;
    border-radius: 20px;

    ${scheduleItemVariants[variant]};
  `}
`;

const scheduleTextVariants = {
  info: css`
    color: ${({ theme }) => theme.colors.textBase};
  `,

  opened: css`
    color: ${({ theme }) => theme.colors.textSuccess};
  `,

  closed: css`
    color: ${({ theme }) => theme.colors.error};
  `,
};

export const ScheduleText = styled.Text<ScheduleItemProps>`
  ${({ theme, variant }) => css`
    margin-top: 20px;

    font-family: ${theme.fonts.regular};
    font-size: 16px;
    line-height: 24px;

    ${scheduleTextVariants[variant]};
  `}
`;

export const ContactButton = styled(RectButton)`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 56px;

    margin-top: 40px;

    background-color: ${theme.colors.successButton};

    border-radius: 20px;
  `}
`;

export const ContactButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textInButton};

    margin-left: 16px;

    font-family: ${theme.fonts.bold};
    font-size: 16px;
  `}
`;
