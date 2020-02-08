module.exports = {
  bail: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      statements: 100,
    },
  },
};
