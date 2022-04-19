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
import { BoxState } from '../../type';

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
  const [alertMessage, setAlertMessage] = useState('');
  const [correctIndex, setCorrectIndex] = useState<string[]>([]);

  const onKeydownEnter = () => {
    const wordsList = word.split('');
    const questionList = INCORRECT.toUpperCase().split('');
    setWords(wordsList);
    if (word.length < WORD_MAX_LENGTH) {
      setAlertMessage(ALERT_MESSAGE.NOT_ENOUGH_LENGTH);
      setShowAlert(true);
      setWord('');
    } else if (word.toLowerCase() == INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.CORRECT);
      setShowAlert(true);
    } else if (word !== INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.WORNG);
      setShowAlert(true);
      console.log('-----------------------------------');
      wordsList.forEach((word, index) => {
        word === questionList[index] &&
          console.log(`${index + 1} 번 글자는 맞았어요`);
        console.log(`${questionList.includes(word)} 는 들어있긴해여`);
      });
      console.log('-----------------------------------');
      setWord('');
    }
  };
  // useEffect(() => {
  //   console.log(words);
  // }, [words]);

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
    <>
      <h1>Hello Wordle !! </h1>
      <h1>5글자를 입력해주세요. </h1>
      <Board word={word} words={words} />
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
    </>
  );
};

export default index;
