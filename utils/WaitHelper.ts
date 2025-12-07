import { expect, Page } from "@playwright/test";
import { Logger } from "./Logger";

/**
 * Wait helper utilities for common waiting scenarios
 * Provides reusable wait methods across the framework
 */
export class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for an element to become visible
   */
  async waitForVisible(selector: string, timeout = 10000): Promise<void> {
    Logger.debug(`Waiting for element to be visible: ${selector}`);
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Wait for an element to become hidden
   */
  async waitForHidden(selector: string, timeout = 10000): Promise<void> {
    Logger.debug(`Waiting for element to be hidden: ${selector}`);
    await expect(this.page.locator(selector)).toBeHidden({ timeout });
  }

  /**
   * Wait for a specific number of elements
   */
  async waitForElementCount(selector: string, count: number, timeout = 10000): Promise<void> {
    Logger.debug(`Waiting for ${count} elements: ${selector}`);
    await expect(this.page.locator(selector)).toHaveCount(count, { timeout });
  }

  /**
   * Wait for text to appear on the page
   */
  async waitForText(text: string, timeout = 10000): Promise<void> {
    Logger.debug(`Waiting for text: ${text}`);
    await this.page.waitForSelector(`text=${text}`, { timeout, state: "visible" });
  }

  /**
   * Wait for a specific URL pattern
   */
  async waitForUrlPattern(pattern: string | RegExp, timeout = 10000): Promise<void> {
    Logger.debug(`Waiting for URL pattern: ${pattern}`);
    await this.page.waitForURL(pattern, { timeout });
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(timeout = 10000): Promise<void> {
    Logger.debug("Waiting for network idle");
    await this.page.waitForLoadState("networkidle", { timeout });
  }

  /**
   * Custom wait with retry logic
   */
  async waitWithRetry(
    condition: () => Promise<boolean>,
    maxRetries = 5,
    retryDelay = 1000,
  ): Promise<void> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const result = await condition();
        if (result) {
          Logger.debug(`Condition met after ${retries} retries`);
          return;
        }
      } catch (error) {
        Logger.warn(`Retry ${retries + 1}/${maxRetries} failed`);
      }
      await this.page.waitForTimeout(retryDelay);
      retries++;
    }
    throw new Error(`Condition not met after ${maxRetries} retries`);
  }
}
