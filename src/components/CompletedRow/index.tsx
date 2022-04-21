import { BoxState } from '../../type';
import { useState, useEffect } from 'react';
import { WORD_MAX_LENGTH } from '../../constants';
import { BoxContainer } from '../BoxContainer';
import AlphabetBox from '../AlphabetBox';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  word: string;
  rowState: BoxState[];
}
const index = ({ word, rowState }: Props) => {
  const [color, setColor] = useState<BoxState[]>(
    Array.from({ length: WORD_MAX_LENGTH }, () => undefined),
  );
  useEffect(() => {
    rowState.forEach((res, index) => {
      setColor((prev) => {
        const copyColor: BoxState[] = [...prev];
        copyColor[index] = rowState[index];
        return [...copyColor];
      });
    });
  }, [rowState]);
  return (
    <BoxContainer>
      {word.split('').map((alphabet, index) => (
        <AlphabetBox
          key={uuidv4()}
          alphabet={alphabet}
          boxState={color[index]}
        ></AlphabetBox>
      ))}
    </BoxContainer>
  );
};
export default index;
