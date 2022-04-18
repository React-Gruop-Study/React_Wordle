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

const index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const modalState = useCloseAlert(showAlert, 1990);
  useEffect(() => {
    setShowAlert(modalState);
  }, [modalState]);

  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState('');

  const onKeydwonEnter = () => {
    const wordsList = word.split('');
    setWords(wordsList);

    if (word.length < WORD_MAX_LENGTH) {
      setAlertMessage(ALERT_MESSAGE.NOT_ENOUGH_LENGTH);
      setShowAlert(true);
      setWord('');
    } else if (word == INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.CORRECT);
      setShowAlert(true);
    } else if (word !== INCORRECT) {
      setAlertMessage(ALERT_MESSAGE.WORNG);
      setShowAlert(true);
      setWord('');
    }
    console.log('Enter........');
    console.log(word);
  };
  useEffect(() => {
    console.log(words);
  }, [words]);

  const onKeydownWord = (key: string) => {
    if (word.length >= 5) return;

    setWord((prev) => prev + key.toUpperCase());
    // console.log(`words : ${word}`);
    // console.log(`words length : ${word.length}`);
  };

  const onKeydownBackspace = () => {
    if (!word) return;
    setWord((prev): any => {
      prev
        .split('')
        .slice(0, prev.length - 1)
        .join('');
    });
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
        onKeydwonEnter={onKeydwonEnter}
        onKeydownBackspace={onKeydownBackspace}
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
