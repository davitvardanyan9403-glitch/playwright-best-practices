import { Locator, Page } from "../fixtures/baseFixture";

/**
 * Base class for all page objects.
 * Provides common functionality for page navigation, waiting, and validation.
 * All page objects should extend this class.
 */
export class BasePage {
  protected page: Page;
  protected pageHeader: string;
  protected pageUrl: string;

  constructor(page: Page, pageHeader?: string, pageUrl?: string) {
    this.page = page;
    this.pageHeader = pageHeader || "";
    this.pageUrl = pageUrl || "";
  }

  /**
   * Navigates to the base URL of the application.
   * Useful for initializing page state before tests.
   */
  async visit(customUrl?: string): Promise<void> {
    const url = customUrl || this.pageUrl;
    if (!url) {
      throw new Error(`No URL specified for ${this.constructor.name}. Please provide a URL.`);
    }
    await this.page.goto(url);
  }

  /**
   * Waits for the DOM to be fully loaded.
   */
  async waitForDomContentLoaded(options?: { timeout?: number }): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded", options);
  }

  /**
   * Wait for page url
   */
  async waitForPageLoad(options?: { timeout?: number }): Promise<void> {
    if (this.pageUrl) {
      // Use regex for more reliable URL matching
      const urlPattern = new RegExp(this.pageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      await this.page.waitForURL(urlPattern, options);
    }
    await this.waitForDomContentLoaded(options);
  }

  /**
   * Reload page
   */
  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.waitForDomContentLoaded();
  }

  /**
   * Handles cookie consent modal if present on the page.
   * Looks for common cookie accept button patterns and clicks if found.
   */
  async acceptCookies(): Promise<void> {
    // Try multiple common cookie button selectors
    const cookieButtons = [
      "button:has-text(\"Accept\")",
      "button:has-text(\"Accept All\")",
      "button:has-text(\"Accept Cookies\")",
      "[data-testid=\"cookie-accept\"]",
      "[class*=\"cookie\"][class*=\"accept\"]",
    ];

    for (const selector of cookieButtons) {
      try {
        const button = this.page.locator(selector).first();
        if (await button.isVisible({ timeout: 2000 })) {
          await button.click();
          await this.page.waitForTimeout(500); // Brief wait for modal to close
          return;
        }
      } catch (e) {
        // Continue to next selector if this one fails
      }
    }
  }

  /**
   * Get header with text method
   */
  getHeaderWithText(locator: Locator): Locator {
    return locator.getByText(this.pageHeader, { exact: true });
  }
}
