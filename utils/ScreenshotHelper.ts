import { Page } from "@playwright/test";
import { Logger } from "./Logger";

/**
 * Screenshot utility for capturing and managing screenshots during tests
 */
export class ScreenshotHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Capture a full page screenshot
   */
  async captureFullPage(filename: string): Promise<Buffer> {
    Logger.info(`Capturing full page screenshot: ${filename}`);
    return await this.page.screenshot({
      path: `screenshots/${filename}`,
      fullPage: true,
    });
  }

  /**
   * Capture a screenshot of a specific element
   */
  async captureElement(selector: string, filename: string): Promise<Buffer> {
    Logger.info(`Capturing element screenshot: ${selector} -> ${filename}`);
    const element = this.page.locator(selector);
    return await element.screenshot({
      path: `screenshots/${filename}`,
    });
  }

  /**
   * Capture screenshot on failure (typically used in afterEach hooks)
   */
  async captureOnFailure(testInfo: { title: string; status?: string }): Promise<void> {
    if (testInfo.status !== "passed") {
      const sanitizedTitle = testInfo.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const timestamp = Date.now();
      await this.captureFullPage(`failure-${sanitizedTitle}-${timestamp}.png`);
      Logger.error(`Test failed: ${testInfo.title}. Screenshot captured.`);
    }
  }
}
