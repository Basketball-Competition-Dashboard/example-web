import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 1000,
  e2e: {
    baseUrl: 'http://127.0.0.1:5000',
    specPattern: '**/*.test.ts',
    testIsolation: false,
    setupNodeEvents(on) {
      on('task', {
        log(args) {
          console.log(...args);
          return null;
        },
      });
    },
  },
  screenshotOnRunFailure: false,
});
