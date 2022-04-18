import { BoxContainer } from './../BoxContainer/index';
interface Props {
  word: string;
}
const CurrentRow = ({ word }: Props) => {
  return (
    <BoxContainer>
      <h1>{word}</h1>
    </BoxContainer>
  );
};

export default CurrentRow;
