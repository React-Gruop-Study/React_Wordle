import { BoxState } from '../../type';
import { AlphabetBox } from './index.style';

interface Props {
  alphabet: string | null;
  boxState?: BoxState;
}

const index = ({ alphabet, boxState }: Props) => {
  return <AlphabetBox boxState={boxState}>{alphabet}</AlphabetBox>;
};

export default index;
