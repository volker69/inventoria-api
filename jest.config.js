/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  testMatch: ['**/*.test.ts'], // Va a buscar cualquier archivo *.test.ts dentro de src
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
};
