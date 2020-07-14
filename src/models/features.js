const FEATURES = {
  code: ['g'],
  flash: ['f'],
  math: ['sci'],
};

const features = (board) =>
  Object.keys(FEATURES).map((feature) => FEATURES[feature].includes(board));

export { features };
