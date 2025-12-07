import { HomePageTexts } from "../data/constants/HomePageTexts";
import { Page, Locator } from "../fixtures/baseFixture";
import { Routes } from "../data/constants/Routes";
import { BasePage } from "../pages/BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, HomePageTexts.HEADER, Routes.HOME);
  }

  getHeaderText(): Locator {
    return this.page.getByRole("heading", { name: "Playwright" }).locator("span");
  }
}
