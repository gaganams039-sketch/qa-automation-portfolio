# Copilot instructions

- Use Playwright for all E2E tests
- Use role-based locators (getByRole, getByPlaceholder) over CSS selectors
- No fixed sleeps or waitForTimeout
- Every test must have at least one happy path and one negative case
- Use async/await throughout
- Test files go in tests/todomvc/
