import { WORD_MAX_LENGTH } from '../../constants';
import AlphabetBox from '../AlphabetBox';
import { BoxContainer } from './../BoxContainer/index';
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
        <AlphabetBox alphabet={alphabet} />
      ))}
      {emptyWord.map((value) => (
        <AlphabetBox alphabet={value} />
      ))}
    </BoxContainer>
  );
};

export default CurrentRow;
