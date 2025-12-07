import { expect, test } from "../fixtures/baseFixture";

test.describe("Home page tests", () => {
  test.beforeAll(async () => {
    /**
     * In this beforeAll method should be written the step that shold be implement before all tests,
     * If the before all action is too global it should be written in the "global-setup.ts" file
     * */
  });
  test.beforeEach(async () => {
    // In this beforeEach method should be written the step that shold be implement before each test
  });

  test("Navigate to Home page, and check header text", async ({ homePage }) => {
    await test.step("Navigate to Home page", async () => {
      await homePage.visit();
      await homePage.waitForPageLoad();
    });

    await test.step("Check header text", async () => {
      await expect(homePage.getHeaderWithText(homePage.getHeaderText())).toBeVisible();

    });
  });

  test("Next test which is connected with home page", async () => {});

  test.afterEach(async () => {
    // In this afterEach method should be written the step that shold be implement after each test
  });
  test.afterAll(async () => {
    /**
     * In this afterAll method should be written the step that shold be implement after all tests,
     * If the after all action is too global it should be written in the "global-teardown.ts" file
     * */
  });
});
