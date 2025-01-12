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
  // reporter: 'html',
  // reporter: 'list',
  // reporter: 'json',
  // reporter: [
  //   ['json', {outputFile: 'test-result/json-report.json'}],
  //   ['junit', {outputFile: 'test-result/junit-report.json'}],
  //   ['allure-playwright']
  // ],
  reporter: 'allure-playwright',

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
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),

  projects: [
    // {
    //   name: 'setup',
    //   testMatch: 'auth.setup.ts'
    // },
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
      name: 'likesCounterGlobal',
      testMatch: 'likesCounterGlobalSetup.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '../.auth/user.json' },
    },
    {
      name: 'regression',
      testIgnore: 'likesCounter.spec.ts',
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
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],
  
});
