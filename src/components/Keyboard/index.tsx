import { useEffect } from 'react';
import { keyboardArray } from '../../constants';
import { Grid, KeyboardEmptySpace, Row, KeyboardButton } from './index.style';

interface Props {
  onKeydownWord: (key: string) => void;
  onKeydownEnter: () => void;
  onKeydownBackspace: () => void;
  onClickKeyboard: (alphabet: string) => void;
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
          <KeyboardButton
            key={alphabet}
            onClick={() => onClickKeyboard(alphabet)}
          >
            {alphabet}
          </KeyboardButton>
        ))}
      </Row>
      <Row>
        <KeyboardEmptySpace />
        {second.map((alphabet) => (
          <KeyboardButton
            key={alphabet}
            onClick={() => onClickKeyboard(alphabet)}
          >
            {alphabet}
          </KeyboardButton>
        ))}
        <KeyboardEmptySpace />
      </Row>
      <Row>
        {third.map((alphabet) => (
          <KeyboardButton
            key={alphabet}
            onClick={() => onClickKeyboard(alphabet)}
          >
            {alphabet}
          </KeyboardButton>
        ))}
      </Row>
    </Grid>
  );
};

export default index;
