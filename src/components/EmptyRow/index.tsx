import { EmptyRow } from '../../type';
import AlphabetBox from '../AlphabetBox';
import { BoxContainer } from '../BoxContainer';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  emptyRow: EmptyRow;
}

const index = ({ emptyRow }: Props) => {
  return (
    <BoxContainer>
      {emptyRow.map((value) => (
        <AlphabetBox key={uuidv4()} alphabet={value}></AlphabetBox>
      ))}
    </BoxContainer>
  );
};

export default index;
