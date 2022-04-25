import styled from '@emotion/styled';
import Button from '../Button';
import { css } from '@emotion/react';
import { BoxState } from '../../type';

export const Grid = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 200px;
  padding: 0px 10px 10px 10px;
  @media screen and (max-width: 520px) {
    width: 100%;
    padding: 0px 0px 10px 0px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 5px;
`;

export const KeyboardButton = styled(Button)<{
  flex?: 1 | 1.5;
  keyboardState?: BoxState;
}>`
  display: flex;
  flex: ${({ flex }) => (flex ? `${flex}` : `1`)};
  justify-content: center;
  align-items: center;
  background-color: #d3d6da;
  font-weight: bold;
  height: 58px;
  border-radius: 4px;
  text-transform: uppercase;
  padding: 0px;
  ${({ keyboardState }) => keyboardState && keyboardStyle[keyboardState]}
`;

export const KeyboardEmptySpace = styled.div`
  flex: 0.5;
`;

const keyboardStyle = {
  exact: css`
    background-color: #6aaa64;
    border: 2px solid #6aaa64;
    color: white;
  `,
  close: css`
    background-color: #c9b458;
    border: 2px solid #c9b458;
    color: white;
  `,
  none: css`
    background-color: #787c7e;
    border: 2px solid #787c7e;
    color: white;
  `,
};
