import { useEffect } from 'react';
import { keyboardArray } from '../../constants';

interface Props {
  onKeydownWord: (key: string) => void;
  onKeydwonEnter: () => void;
  onKeydownBackspace: () => void;
}

const index = ({
  onKeydownWord,
  onKeydwonEnter,
  onKeydownBackspace,
}: Props) => {
  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Enter') onKeydwonEnter();
      // -1은 알파벳 이외의 키를 뜻한다.
      else if (keyboardArray.flat().indexOf(key.toUpperCase()) > -1)
        onKeydownWord(key);
      else if (key === 'Backspace') onKeydownBackspace();
    };
    window.addEventListener('keydown', listener);
    // 두번 실행을 막아준다.
    return () => window.removeEventListener('keydown', listener);
  }, [onKeydownWord, onKeydwonEnter, onKeydownBackspace]);
  return <div></div>;
};

export default index;
