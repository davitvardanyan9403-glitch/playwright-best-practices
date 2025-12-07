import { UserBuilder } from "../data/builders/UserBuilder";
import { ApiEndpoints } from "../data/constants/ApiEndpoints";
import { expect, test } from "../fixtures/baseFixture";
import { Logger } from "../utils/Logger";

test.describe("API Tests Example", () => {
  test.beforeEach(() => {
    Logger.info("Starting API test");
  });

  test("Example API test - Create user", async ({ apiHelper }) => {
    // Skip this test as it's just an example
    test.skip();

    const user = UserBuilder.createValidUser();

    await test.step("Create user via API", async () => {
      const response = await apiHelper.post(ApiEndpoints.USERS, user);
      apiHelper.validateStatus(response, 201);

      const responseData = await apiHelper.parseJson<{ id: string }>(response);
      expect(responseData.id).toBeDefined();
      Logger.info(`User created with ID: ${responseData.id}`);
    });
  });

  test("Example API test - Get users list", async ({ apiHelper }) => {
    // Skip this test as it's just an example
    test.skip();

    await test.step("Fetch users list", async () => {
      const response = await apiHelper.get(ApiEndpoints.USERS);
      apiHelper.validateStatus(response, 200);

      const users = await apiHelper.parseJson<Array<{ id: string; email: string }>>(response);
      expect(users).toBeInstanceOf(Array);
      Logger.info(`Fetched ${users.length} users`);
    });
  });

  test.afterEach(() => {
    Logger.info("API test completed");
  });
});
