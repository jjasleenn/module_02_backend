module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts", // Exclude server startup file
        "!src/types/**/*.ts", // Exclude type definitions
    ],
};

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};