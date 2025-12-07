# Playwright Best Practices - Enhanced Framework

A production-ready, enterprise-grade Playwright E2E testing framework demonstrating advanced best practices with comprehensive tooling, utilities, and professional architecture.

## 🎯 What's New in This Enhanced Version

This framework has been upgraded with professional-grade features:

- ✅ **Enhanced Utilities**: Logger, API Helper, Wait Helper, Screenshot Helper
- ✅ **Authentication Management**: Auth state persistence and session handling
- ✅ **Test Data Builders**: Fluent API for creating test data
- ✅ **CI/CD Pipeline**: GitHub Actions with test sharding and report merging
- ✅ **Code Quality Tools**: ESLint + Prettier with TypeScript support
- ✅ **Environment Configuration**: dotenv integration for flexible configs
- ✅ **API Testing Support**: Built-in API request helpers

## 📦 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment template (optional)
cp .env.example .env
```

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# View report
npm run test:report
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## ⚠️ **Critical Coding Standards**

### **No Hardcoded Values Rule**

**IMPORTANT**: This framework follows a strict "no hardcoded values" policy.

✅ **Use Constants**:
```typescript
import { ApiEndpoints } from "../data/constants/ApiEndpoints";
const response = await apiHelper.get(ApiEndpoints.USERS);
```

❌ **Never Hardcode**:
```typescript
const response = await apiHelper.get("/api/users"); // DON'T DO THIS!
```

**What must be in constants**:
- API endpoints → `ApiEndpoints.ts`
- URLs/routes → `Routes.ts`
- UI text → `PageNameTexts.ts`
- Error messages → `ErrorMessages.ts`
- Timeout values → `Timeouts.ts`

📖 **See `CODING_STANDARDS.md` for complete guidelines**

## 📁 Enhanced Project Structure

```
playwright-best-practices/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD with test sharding
├── data/
│   ├── builders/
│   │   └── UserBuilder.ts          # Test data builder pattern
│   └── constants/
│       ├── ApiEndpoints.ts         # API endpoint constants
│       ├── ErrorMessages.ts        # Expected error messages
│       ├── HomePageTexts.ts        # UI text constants
│       ├── Routes.ts               # URL routes
│       └── Timeouts.ts             # Timeout constants
├── fixtures/
│   └── baseFixture.ts              # Enhanced fixtures with API support
├── pages/
│   ├── BasePage.ts                 # Enhanced base page class
│   └── HomePage.ts                 # Example page object
├── tests/
│   ├── api-example.spec.ts         # API testing example
│   └── home-page.spec.ts           # UI testing example
├── utils/
│   ├── ApiHelper.ts                # API request wrapper
│   ├── AuthHelper.ts               # Authentication manager
│   ├── Logger.ts                   # Structured logging
│   ├── ScreenshotHelper.ts         # Screenshot utilities
│   └── WaitHelper.ts               # Wait utilities
├── .env.example                    # Environment template
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc.json                # Prettier configuration
├── global-setup.ts                 # Global setup hooks
├── global-teardown.ts              # Global teardown hooks
├── playwright.config.ts            # Playwright configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🔧 Key Features Explained

### 1. Logger Utility

Structured logging with timestamps:

```typescript
import { Logger } from "../utils/Logger";

Logger.info("Test started");
Logger.error("Test failed", error);
Logger.step("Login", "User authentication");
```

### 2. API Helper

Simplified API testing:

```typescript
const response = await apiHelper.post("/api/users", userData);
await apiHelper.validateStatus(response, 201);
const data = await apiHelper.parseJson(response);
```

### 3. Test Data Builders

Fluent API for test data:

```typescript
const user = new UserBuilder().withEmail("test@example.com").withPassword("Password123!").build();

// Or use factory methods
const adminUser = UserBuilder.createAdminUser();
```

### 4. Wait Helper

Reusable wait utilities:

```typescript
const waitHelper = new WaitHelper(page);
await waitHelper.waitForVisible(".modal");
await waitHelper.waitForNetworkIdle();
await waitHelper.waitWithRetry(async () => somecondition());
```

### 5. Authentication Management

Session state persistence:

```typescript
const authHelper = new AuthHelper(page);
await authHelper.login("user@example.com", "password");
// State is automatically saved and can be reused
```

## 🏗️ Best Practices Implemented

### Test Structure

- AAA pattern (Arrange-Act-Assert)
- Test steps for better reporting
- Proper beforeEach/afterEach hooks

### Code Organization

- Page Object Model (POM)
- Dependency injection via fixtures
- Separation of test data
- Utility classes for reusability

### Error Handling

- Graceful fallbacks
- Comprehensive error logging
- Screenshot capture on failure

### CI/CD

- Parallel execution with sharding
- Blob report merging
- Artifact retention
- Workflow dispatch support

## 📊 Configuration

### Environment Variables (.env)

```bash
BASE_URL=https://playwright.dev/
HEADLESS=true
BROWSER=chromium
TIMEOUT=120000
```

### Playwright Config

Key settings:

- Global setup/teardown
- Multiple browser support
- Automatic retries in CI
- HTML reporting
- Trace on first retry

## 🤝 Contributing

1. Follow existing code patterns
2. Run linting before commit: `npm run lint:fix`
3. Format code: `npm run format`
4. Ensure tests pass: `npm test`
5. Update documentation as needed

