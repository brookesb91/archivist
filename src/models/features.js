const FEATURES = {
  code: ['g'],
  flash: ['f'],
  math: ['sci'],
};

const features = (board) =>
  Object.keys(FEATURES).filter((feature) =>
    FEATURES[feature].includes(board)
  );

export {
  features
};