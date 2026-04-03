import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: './tests', 
  reporter: 'html',
  use: {
    
    baseURL: "https://www.saucedemo.com/",

    
    trace: "retain-on-failure",

    
    testIdAttribute: "data-test"
  },

  
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: {browserName: "firefox" },
    },
    {
      name: "webkit",
      use: {browserName: "webkit" },
    },
  ],
});
