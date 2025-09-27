# Software to be installed
1. Download and Install Visual studio code
2. Download and Install LTS node.ja
3. Download and Install nvm

# Prerequisites and setup
1. Run the command to download all browsers
    `npx playwright install`
2. Clone or download the project
3. Extract and open in VS code 
4. Run the command to install all the dependency
    `npm i`
5. Run the command to install the Playwright Test  framework asa dependency in project
   `npm install -d @playwright/test`

# Command to execute the test

1. Command to execute the postive test case 
    `npx playwright test loginImplementation.spec.ts`
2. Command to execute the negative test case
    `npx playwright test negativelogin.spec.ts`
3. Command to create html report
    `npm run report`
4. Command to open the trace 
    `npm run trace`


Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test
