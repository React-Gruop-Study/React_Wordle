export type BoxState = 'exact' | 'close' | 'none' | undefined;

export type EmptyRow = ['', '', '', '', ''];

export type BoardState = Array<
  [BoxState, BoxState, BoxState, BoxState, BoxState]
>;
