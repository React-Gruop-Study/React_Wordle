import { Grid, Wrapper } from './index.style';
import CurrentRow from './../CurrentRow/index';

interface Props {
  word: string;
  words: string[];
}

const Board = ({ word, words }: Props) => {
  return (
    <Wrapper>
      <Grid>
        <CurrentRow word={word} />
      </Grid>
    </Wrapper>
  );
};

export default Board;
