import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "../utils/Logger";

/**
 * Authentication helper for managing user sessions
 * Supports saving and loading authentication state
 */
export class AuthHelper {
  private page: Page;
  private authDir: string;

  constructor(page: Page) {
    this.page = page;
    this.authDir = path.join(process.cwd(), ".auth");

    // Create auth directory if it doesn't exist
    if (!fs.existsSync(this.authDir)) {
      fs.mkdirSync(this.authDir, { recursive: true });
    }
  }

  /**
   * Login and save authentication state
   */
  async login(_username: string, _password: string, storageStateName = "auth.json"): Promise<void> {
    Logger.info(`Logging in as ${_username}`);

    // Implement your login logic here
    // This is a placeholder example
    // await this.page.goto('/login');
    // await this.page.fill('[name="username"]', _username);
    // await this.page.fill('[name="password"]', _password);
    // await this.page.click('button[type="submit"]');
    // await this.page.waitForURL('**/dashboard');

    // Save authentication state
    const statePath = path.join(this.authDir, storageStateName);
    await this.page.context().storageState({ path: statePath });
    Logger.info(`Authentication state saved to ${statePath}`);
  }

  /**
   * Load authentication state
   */
  static getStorageStatePath(storageStateName = "auth.json"): string {
    return path.join(process.cwd(), ".auth", storageStateName);
  }

  /**
   * Check if authentication state exists
   */
  static hasStorageState(storageStateName = "auth.json"): boolean {
    const statePath = this.getStorageStatePath(storageStateName);
    return fs.existsSync(statePath);
  }

  /**
   * Clear authentication state
   */
  async logout(): Promise<void> {
    Logger.info("Logging out and clearing session");
    await this.page.context().clearCookies();
  }
}
