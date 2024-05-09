export default {
    transform: {
      '^.+\\.m?js$': 'babel-jest'  // Ensures Babel is used to transform JavaScript files
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',  // This continues to handle path mappings
    },
  };
  