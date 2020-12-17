import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  hideInput?: boolean;
  label: string;
  comment?: string | JSX.Element;
}