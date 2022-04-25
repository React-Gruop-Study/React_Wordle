const checkUsedWord = (word: string) => {
  const wordList = Array.from(word);
  const removeOverlap = wordList.filter(
    (word, index) => wordList.indexOf(word) === index,
  );
  const usedCheck = removeOverlap.map((alphabet) => {
    return { alphabet: alphabet, used: true };
  });
  return usedCheck;
};

export default checkUsedWord;
