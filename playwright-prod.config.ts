import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({
  use: {

    baseURL: 'https://playwright-practice-app.onrender.com',
    globalSQAUrl: 'https://www.globalsqa.com/demo-site/',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '../.auth/user.json' },
      dependencies: ['setup']
    },
  ]
});
