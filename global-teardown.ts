/**
 * Global Teardown
 * This function runs once after all tests have finished.
 * Use it for:
 * - Cleaning up database
 * - Deleting temporary files
 */
async function globalTeardown(): Promise<void> {
  console.log("Global Teardown running...");
  // Example: await cleanupDatabase();
  return Promise.resolve();
}

export default globalTeardown;
