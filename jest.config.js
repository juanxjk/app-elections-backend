module.exports = {
  roots: ["<rootDir>"],
  testMatch: [
    "**/__tests__/(unit|integration)/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js,jsx}"],
};
