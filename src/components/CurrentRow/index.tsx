import { WORD_MAX_LENGTH } from '../../constants';
import AlphabetBox from '../AlphabetBox';
import { BoxContainer } from './../BoxContainer/index';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  word: string;
}
const CurrentRow = ({ word }: Props) => {
  const emptyWord =
    word.length < WORD_MAX_LENGTH
      ? Array.from({ length: WORD_MAX_LENGTH - word.length }, () => null)
      : [];
  return (
    <BoxContainer>
      {word.split('').map((alphabet) => (
        <AlphabetBox key={uuidv4()} alphabet={alphabet} />
      ))}
      {emptyWord.map((value) => (
        <AlphabetBox key={uuidv4()} alphabet={value} />
      ))}
    </BoxContainer>
  );
};

export default CurrentRow;
