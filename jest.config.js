

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

module.exports= {
  testEnvironment:'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // "^.+\\.(svg)$": "./svgMock.js"
    // '../fonction/conf': "<rootDir>/aamock.js",
    // ".+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    // "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMockdd.js",
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.svg$': '<rootDir>/svgMock.js',
    // '/^.+.(css|less|scss|sass)$/': 'identity-obj-proxy',
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    
  },
};