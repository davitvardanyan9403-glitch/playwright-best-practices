import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ApiHelper } from "../utils/ApiHelper";

interface Pages {
  homePage: HomePage;
  apiHelper: ApiHelper;
}

export const test = baseTest.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(apiHelper);
  },
});

export { APIRequestContext, expect, Page, Locator } from "@playwright/test";
