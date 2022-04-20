import { EmptyRow } from '../../type';
import AlphabetBox from '../AlphabetBox';
import { BoxContainer } from '../BoxContainer';

interface Props {
  emptyRow: EmptyRow;
}

const index = ({ emptyRow }: Props) => {
  return (
    <BoxContainer>
      {emptyRow.map((value) => (
        <AlphabetBox alphabet={value}></AlphabetBox>
      ))}
    </BoxContainer>
  );
};

export default index;
