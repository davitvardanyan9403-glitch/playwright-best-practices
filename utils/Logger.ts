/**
 * Logger utility for consistent logging across the test framework
 * Provides structured logging with timestamps and severity levels
 */
export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Log informational messages
   */
  static info(message: string): void {
    console.log(this.formatMessage("INFO", message));
  }

  /**
   * Log warning messages
   */
  static warn(message: string): void {
    console.warn(this.formatMessage("WARN", message));
  }

  /**
   * Log error messages with optional error object
   */
  static error(message: string, error?: Error): void {
    console.error(this.formatMessage("ERROR", message));
    if (error) {
      console.error("Error details:", error);
    }
  }

  /**
   * Log debug messages (only in non-CI environments)
   */
  static debug(message: string): void {
    if (!process.env.CI) {
      console.debug(this.formatMessage("DEBUG", message));
    }
  }

  /**
   * Log test step information
   */
  static step(stepName: string, description?: string): void {
    const msg = description ? `${stepName} - ${description}` : stepName;
    console.log(this.formatMessage("STEP", msg));
  }
}
