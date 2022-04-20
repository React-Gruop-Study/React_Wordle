import { useEffect, useState } from 'react';
import AlertPortal, { Alert } from '../../components/Alert';
import Board from '../../components/Board';
import Keyboard from '../../components/Keyboard';
import {
  ALERT_MESSAGE,
  INCORRECT,
  keyboardArray,
  WORD_MAX_LENGTH,
} from '../../constants';
import useCloseAlert from '../../hooks/useCloseAlert';
import { BoardState, BoxState } from '../../type';
import { Wrapper } from './index.style';

type CurrentRowCalculateResult = [
  BoxState,
  BoxState,
  BoxState,
  BoxState,
  BoxState,
];

const index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const modalState = useCloseAlert(showAlert, 1990);
  useEffect(() => {
    setShowAlert(modalState);
  }, [modalState]);

  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [rowState, setRowState] = useState<BoardState>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [recentWords, setRecentWords] = useState<string[]>([]);

  const onKeydownEnter = () => {
    const wordsList = word.split('');
    const questionList = INCORRECT.toUpperCase().split('');
    setWords(wordsList);
    if (recentWords.length >= 5) {
      setAlertMessage(INCORRECT.toUpperCase());
      setShowAlert(true);
      return;
    }
    const result: CurrentRowCalculateResult = [
      'none',
      'none',
      'none',
      'none',
      'none',
    ];
    // 입력한 글자가 모자랄 때
    if (word.length < WORD_MAX_LENGTH) {
      setAlertMessage(ALERT_MESSAGE.NOT_ENOUGH_LENGTH);
      setShowAlert(true);
      setWord('');

      // 입력한 글자가 정답일 때
    } else if (word.toLowerCase() == INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.CORRECT);
      setShowAlert(true);
      return;
      // 입력한 글자가 오답일 때
    } else if (word !== INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.WORNG);
      setShowAlert(true);
      console.log('-----------------------------------');
      console.log(word);
      wordsList.forEach((word, index) => {
        if (word === questionList[index]) {
          console.log(`${index + 1} 번 ${word}글자는 맞았어요`);
          result[index] = 'exact';
        } else if (questionList.includes(word)) {
          console.log(`${index + 1} 번 ${word}글자는 들어있긴해요`);
          result[index] = 'close';
        } else {
          console.log(`${index + 1} 번 ${word}글자는 없어요`);
        }
      });
      console.log('-----------------------------------');
      setRecentWords((prev) => [...prev, word]);
      setWord('');
      setRowState([...rowState, result]);
    }
  };
  useEffect(() => {
    console.log(recentWords);
    console.log(rowState);
  }, [recentWords]);

  const onKeydownWord = (key: string) => {
    if (word.length >= WORD_MAX_LENGTH) return;

    setWord((prev) => prev + key.toUpperCase());
    // console.log(`words : ${word}`);
    // console.log(`words length : ${word.length}`);
  };

  const onKeydownBackspace = () => {
    if (!word) return;
    setWord(word.slice(0, -1));
  };

  const onClickKeyboard = (click: { target: HTMLInputElement }) => {
    const clickWord = click.target.innerHTML;
    if (clickWord === 'ENTER') return onKeydownEnter();
    else if (clickWord === '(X)') return onKeydownBackspace();
    else if (word.length >= WORD_MAX_LENGTH) return;
    else setWord((prev) => prev + clickWord);
  };

  // const onClickAlert = () => {
  //   setAlertMessage(ALERT_MESSAGE.CORRECT);
  //   setShowAlert(true);
  // };

  // useEffect(() => {
  //   if (showAlert) {
  //     const timeout = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 1990);
  //     // useEffect cleanup
  //     return () => clearTimeout(timeout);
  //   }
  // }, [showAlert]);

  return (
    <Wrapper>
      <h1>Hello Wordle !! </h1>
      <h1>5글자를 입력해주세요. </h1>
      <Board
        word={word}
        words={words}
        recentWords={recentWords}
        rowState={rowState}
      />
      <Keyboard
        onKeydownWord={onKeydownWord}
        onKeydownEnter={onKeydownEnter}
        onKeydownBackspace={onKeydownBackspace}
        onClickKeyboard={onClickKeyboard}
      />
      {/* <div>
        <button onClick={onClickAlert}>정답 ALERT 테스트</button>
      </div> */}
      {showAlert && (
        <AlertPortal>
          <Alert message={alertMessage} />
        </AlertPortal>
      )}
    </Wrapper>
  );
};

export default index;
