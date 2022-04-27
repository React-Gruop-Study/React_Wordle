import { INCORRECT } from '../constants';
import { BoxState } from '../type';

type WordInCorrectState = [BoxState, BoxState, BoxState, BoxState, BoxState];

// type = Object 안됨 [] 안됨 string안됨
const checkInCorrect = (usedWordObj: any) => {
  const questionList = INCORRECT.toUpperCase().split('');
  const result: WordInCorrectState = ['none', 'none', 'none', 'none', 'none'];
  Array.from(usedWordObj).forEach((obj: any, index) => {
    if (obj.used) {
      if (obj.alphabet === questionList[index]) {
        result[index] = 'exact';
      } else if (questionList.includes(obj.alphabet)) {
        result[index] = 'close';
      } else {
      }
    }
  });
  return result;
};

export default checkInCorrect;
