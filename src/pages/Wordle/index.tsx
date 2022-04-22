import { useEffect, useMemo, useState } from 'react';
import AlertPortal, { Alert } from '../../components/Alert';
import Board from '../../components/Board';
import Keyboard from '../../components/Keyboard';
import {
  ALERT_MESSAGE,
  EMPTY_ROW_MAX_LENGTH,
  INCORRECT,
  WORD_MAX_LENGTH,
} from '../../constants';
import useCloseAlert from '../../hooks/useCloseAlert';
import { BoardState, BoxState } from '../../type';
import { Wrapper } from './index.style';

type WordInCorrectState = [BoxState, BoxState, BoxState, BoxState, BoxState];

const index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const modalState = useCloseAlert(showAlert, 1990);
  useEffect(() => {
    setShowAlert(modalState);
  }, [modalState]);

  const [word, setWord] = useState('');
  const [rowState, setRowState] = useState<BoardState>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [correctState, setCorrectState] = useState(false);

  const checkWords = () => {
    const wordsList = word.split('');
    const questionList = INCORRECT.toUpperCase().split('');
    const result: WordInCorrectState = ['none', 'none', 'none', 'none', 'none'];
    wordsList.forEach((alphabet, index) => {
      if (alphabet === questionList[index]) {
        result[index] = 'exact';
      } else if (questionList.includes(alphabet)) {
        result[index] = 'close';
      }
    });
    setRowState([...rowState, result]);
  };

  const onKeydownEnter = () => {
    if (correctState) return;
    // 입력한 글자가 모자랄 때
    if (word.length < WORD_MAX_LENGTH) {
      setAlertMessage(ALERT_MESSAGE.NOT_ENOUGH_LENGTH);
      setShowAlert(true);
      return;
    }
    checkWords();

    // 끝까지 정답을 못맞췄을 경우
    if (recentWords.length >= EMPTY_ROW_MAX_LENGTH) {
      setCorrectState(true);
      return;
    }
    setRecentWords((prev) => [...prev, word]);
    setWord('');
    if (word.toLowerCase() == INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.CORRECT);
      setShowAlert(true);
      setCorrectState(true);
      return;
    }
  };

  const onKeydownWord = (key: string) => {
    if (correctState) return;
    if (word.length >= WORD_MAX_LENGTH) return;
    setWord((prev) => prev + key.toUpperCase());
  };

  const onKeydownBackspace = () => {
    if (!word) return;
    setWord(word.slice(0, -1));
  };

  const onClickKeyboard = (alphabet: string) => {
    switch (alphabet) {
      case 'Enter':
        return onKeydownEnter();
      case '(X)':
        return onKeydownBackspace();
    }
    if (word.length >= WORD_MAX_LENGTH) return;
    else setWord((prev) => prev + alphabet);
  };

  return (
    <Wrapper>
      <h1 style={{ textAlign: 'center' }}>WORDLE</h1>
      <h1 style={{ textAlign: 'center' }}>
        {correctState && `정답 : ${INCORRECT.toUpperCase()}`}
      </h1>
      <Board word={word} recentWords={recentWords} rowState={rowState} />
      <Keyboard
        onKeydownWord={onKeydownWord}
        onKeydownEnter={onKeydownEnter}
        onKeydownBackspace={onKeydownBackspace}
        onClickKeyboard={onClickKeyboard}
      />
      {showAlert && (
        <AlertPortal>
          <Alert message={alertMessage} />
        </AlertPortal>
      )}
    </Wrapper>
  );
};

export default index;
