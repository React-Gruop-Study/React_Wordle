import { useEffect, useState } from 'react';

// 컴포넌트가 아니기때문에 props로 넣는 규약이 사라진다.
const useCloseAlert = (state: boolean, ms: number = 0) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(state);
  }, [state]);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, ms);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  return showAlert;
};

export default useCloseAlert;
