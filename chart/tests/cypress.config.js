const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: "https://chat.bigbang.dev"
    },
    testIsolation: false,
    video: true,
    videoCompression: 35,
    screenshot: true,
    screenshotOnRunFailure: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})