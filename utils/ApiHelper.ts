import { APIRequestContext, APIResponse } from "@playwright/test";
import { Logger } from "./Logger";

/**
 * API Helper for making HTTP requests during tests
 * Useful for test data setup, validation, and backend testing
 */
export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Make a GET request
   */
  async get(url: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    Logger.info(`GET request to: ${url}`);
    return await this.request.get(url, options);
  }

  /**
   * Make a POST request
   */
  async post(
    url: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ): Promise<APIResponse> {
    Logger.info(`POST request to: ${url}`);
    return await this.request.post(url, {
      ...options,
      data,
    });
  }

  /**
   * Make a PUT request
   */
  async put(
    url: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ): Promise<APIResponse> {
    Logger.info(`PUT request to: ${url}`);
    return await this.request.put(url, {
      ...options,
      data,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete(url: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    Logger.info(`DELETE request to: ${url}`);
    return await this.request.delete(url, options);
  }

  /**
   * Validate response status code
   */
  validateStatus(response: APIResponse, expectedStatus: number): void {
    const status = response.status();
    if (status !== expectedStatus) {
      Logger.error(`Expected status ${expectedStatus} but got ${status}`);
      throw new Error(`Status mismatch: expected ${expectedStatus}, got ${status}`);
    }
    Logger.debug(`Response status validated: ${status}`);
  }

  /**
   * Parse JSON response
   */
  async parseJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }
}
