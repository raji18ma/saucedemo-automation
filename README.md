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

