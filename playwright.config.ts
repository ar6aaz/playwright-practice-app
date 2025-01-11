import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig<TestOptions>({
  testDir: './tests',

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {

    baseURL: 'https://playwright-practice-app.onrender.com',
    globalSQAUrl: 'https://www.globalsqa.com/demo-site/',

    // Manage baseURL via env var
    // baseURL: process.env.DEV === '1' ? 'https://dev.app.com'
    //       : process.env.STAGING === '1' ? 'https://stage.app.com'
    //       : 'https://default.app.com',

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    extraHTTPHeaders:{
      'Authorization': `Token ${process.env.AUTH_TOKEN}`
    }
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.ts'
    },
    {
      name: 'articleSetup',
      testMatch: 'newArticle.setup.ts',
      dependencies:['setup'],
      teardown: 'articleDelete'
    },
    {
      name: 'articleDelete',
      testMatch: 'articleDelete.setup.ts'
    },
    {
      name: 'likesCounter',
      testMatch: 'likesCounter.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '../.auth/user.json' },
      dependencies: ['articleSetup']
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '../.auth/user.json' },
      dependencies: ['setup']
    },

    {
      name: 'dev',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://dev.app.com'
      },
    },
    {
      name: 'projectFullScreen',
      testMatch: 'test.spec.ts',
      use: {
        viewport: {width:1920, height: 1080}
      }
    }
  ],
  
});
