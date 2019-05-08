module.exports = {
  verbose: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*.spec.ts'],
  coverageDirectory: './test-reports',
  coveragePathIgnorePatterns: ['server/node_modules', 'client/node_modules'],
};
