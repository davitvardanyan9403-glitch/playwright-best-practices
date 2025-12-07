/**
 * Test data builder for user objects
 * Provides reusable test data creation with sensible defaults
 */
export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = {
      email: `test.user.${Date.now()}@example.com`,
      password: "TestPassword123!",
    };
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }

  build(): User {
    return { ...this.user };
  }

  /**
   * Quick factory method for a valid user
   */
  static createValidUser(): User {
    return new UserBuilder().build();
  }

  /**
   * Quick factory method for an admin user
   */
  static createAdminUser(): User {
    return new UserBuilder()
      .withEmail("admin@example.com")
      .withPassword("AdminPassword123!")
      .withFirstName("Admin")
      .withLastName("User")
      .build();
  }

  /**
   * Quick factory method for a user with invalid credentials
   */
  static createInvalidUser(): User {
    return new UserBuilder().withEmail("invalid@example.com").withPassword("wrong").build();
  }
}
