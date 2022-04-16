import { useState } from 'react';
import AlertPortal, { Alert } from '../../components/Alert';
import { ALERT_MESSAGE } from '../../constants';

const index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const onClickAlert = () => {
    setMessage(ALERT_MESSAGE.CORRECT);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2980);
  };
  return (
    <>
      <h1>Hello Wordle !! </h1>
      <button onClick={onClickAlert}>정답 ALERT 테스트</button>
      {showAlert && (
        <AlertPortal>
          <Alert message={message} />
        </AlertPortal>
      )}
    </>
  );
};

export default index;
