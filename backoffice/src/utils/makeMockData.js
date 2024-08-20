const range = (len) => {
  return Array.from({ length: len }, (_, i) => i);
};

export function makeMockData(mockData, len) {
  const makeDataLevel = () => {
    return range(len).map(() => mockData());
  };

  return makeDataLevel();
}
