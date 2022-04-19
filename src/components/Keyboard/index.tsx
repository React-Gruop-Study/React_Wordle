import { useEffect } from 'react';
import { keyboardArray } from '../../constants';
import { Grid, KeyboardEmptySpace, Row } from './index.style';

interface Props {
  onKeydownWord: (key: string) => void;
  onKeydownEnter: () => void;
  onKeydownBackspace: () => void;
  onClickKeyboard: (click: { target: HTMLInputElement }) => void;
}

const [first, second, third] = keyboardArray;

const index = ({
  onKeydownWord,
  onKeydownEnter,
  onKeydownBackspace,
  onClickKeyboard,
}: Props) => {
  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Enter') onKeydownEnter();
      // -1은 알파벳 이외의 키를 뜻한다.
      else if (keyboardArray.flat().indexOf(key.toUpperCase()) > -1)
        onKeydownWord(key);
      else if (key === 'Backspace') onKeydownBackspace();
    };
    window.addEventListener('keydown', listener);
    // 두번 실행을 막아준다.
    return () => window.removeEventListener('keydown', listener);
  }, [onKeydownWord, onKeydownEnter, onKeydownBackspace]);

  return (
    <Grid>
      <Row>
        {first.map((alphabet) => (
          <KeyboardEmptySpace key={alphabet} onClick={onClickKeyboard}>
            {alphabet}
          </KeyboardEmptySpace>
        ))}
      </Row>
      <Row>
        {second.map((alphabet) => (
          <KeyboardEmptySpace key={alphabet} onClick={onClickKeyboard}>
            {alphabet}
          </KeyboardEmptySpace>
        ))}
      </Row>
      <Row>
        {third.map((alphabet) => (
          <KeyboardEmptySpace key={alphabet} onClick={onClickKeyboard}>
            {alphabet}
          </KeyboardEmptySpace>
        ))}
      </Row>
    </Grid>
  );
};

export default index;
