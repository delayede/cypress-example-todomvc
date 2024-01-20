import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {},
      baseUrl: 'https://practice.expandtesting.com/notes/app/'
      
    // baseUrl: 'http://localhost:8888',
  },
})
hideXHRInCommandLog: true