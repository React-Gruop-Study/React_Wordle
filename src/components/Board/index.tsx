import { Grid, Wrapper } from './index.style';
import CurrentRow from './../CurrentRow/index';
import { BoardState, EmptyRow as EmptyRowType } from '../../type';
import EmptyRow from '../EmptyRow';
import CompletedRow from '../CompletedRow';
import { EMPTY_ROW_MAX_LENGTH, ROW_MAX_LENGTH } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  word: string;
  recentWords: string[];
  rowState: BoardState;
}

const index = ({ word, recentWords, rowState }: Props) => {
  const emptyRow: EmptyRowType[] | null =
    recentWords.length <= ROW_MAX_LENGTH
      ? Array.from(
          { length: EMPTY_ROW_MAX_LENGTH - recentWords.length },
          () => ['', '', '', '', ''],
        )
      : null;
  return (
    <Wrapper>
      <Grid>
        {recentWords.map((words, index) => (
          <CompletedRow
            key={uuidv4()}
            word={words}
            rowState={rowState[index]}
          ></CompletedRow>
        ))}
        <CurrentRow word={word} />
        {emptyRow?.map((row) => (
          <EmptyRow key={uuidv4()} emptyRow={row} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default index;
