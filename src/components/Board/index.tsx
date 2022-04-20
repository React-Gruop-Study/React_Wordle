import { Grid, Wrapper } from './index.style';
import CurrentRow from './../CurrentRow/index';
import { BoardState, EmptyRow as EmptyRowType } from '../../type';
import EmptyRow from '../EmptyRow';
import CompletedRow from '../CompletedRow';
import { EMPTY_ROW_MAX_LENGTH, ROW_MAX_LENGTH } from '../../constants';

interface Props {
  word: string;
  words: string[];
  recentWords: string[];
  rowState: BoardState;
}

const index = ({ word, words, recentWords, rowState }: Props) => {
  const emptyRow: EmptyRowType[] | null =
    words.length <= ROW_MAX_LENGTH
      ? Array.from(
          { length: EMPTY_ROW_MAX_LENGTH - recentWords.length },
          () => ['', '', '', '', ''],
        )
      : null;
  return (
    <Wrapper>
      <Grid>
        {recentWords.map((words, index) => (
          <CompletedRow word={words} rowState={rowState[index]}></CompletedRow>
        ))}
        <CurrentRow word={word} />
        {emptyRow?.map((row, index) => (
          <EmptyRow key={index} emptyRow={row} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default index;
