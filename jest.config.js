

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
//     // '/^.+.(css|less|scss|sass)$/': 'identity-obj-proxy',
//   },
//   globals: {
//     'ts-jest': {
//       diagnostics: {
//         pathRegex: /\.(spec|test)\.ts$/,
//       }
//       // tsconfig: "./src/test/tsconfig.test.json"
//     }
//   },
//   // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//   testPathIgnorePatterns: ["/.next/", "/node_modules/"],
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
//   collectCoverage: true,
// };

module.export= {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    ".+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '/^.+.(css|less|scss|sass)$/': 'identity-obj-proxy',
    ".+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.(svg)$": "./svgMock.js"
  },
};