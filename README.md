# QA Automation Portfolio

## Project Overview

This project is a QA automation portfolio that demonstrates browser-based test automation using Playwright and complementary AI-assisted testing tools. The goal is to show practical test authoring, test planning, visual and accessibility validation, and resilient locator strategies across real-world web demos.

The repository includes:
- Playwright end-to-end test examples
- TodoMVC and jQuery UI datepicker scenarios
- AI-assisted test planning and generation workflows
- A lightweight portfolio-style structure for showcasing QA automation work

## Tools Used

- Playwright for browser automation and end-to-end testing
- Playwright Test for test execution and assertions
- GitHub Copilot / AI-assisted authoring for generating and refining tests
- Applitools for visual testing concepts and comparison workflows
- AgentQL / ZeroStep-style self-healing locator ideas for resilient automation
- Browser automation and accessibility-oriented testing best practices

## Test Structure

The project is organized by scenario area:

- `tests/todomvc/` — TodoMVC user-flow tests
- `tests/jqueryui/` — jQuery UI datepicker interaction tests
- `specs/` — test plans and scenario documentation
- `seed.spec.ts` — starter test scaffold

Each test file focuses on a single user journey and follows Playwright best practices such as role-based locators, clear assertions, and deterministic waits.

## AI Impact

This project shows how AI-assisted tooling can reduce the time spent on repetitive QA tasks:

| Task | Before AI | With AI tools |
| --- | --- | --- |
| Planning test flows for TodoMVC | Manual analysis and hand-written scenario notes | Faster test-plan generation from a short app walkthrough |
| Writing Playwright specs | Time-consuming manual authoring and review | Faster scaffold generation with stronger structure and naming |
| Repairing flaky or broken locators | Manual debug and DOM inspection | Faster root-cause analysis and locator repair |
| Expanding coverage with new scenarios | Repeated manual setup and test drafting | Rapid test creation for follow-up cases |

In practice, the AI-assisted workflow in this repository speeds up the initial test creation and iteration loop, while still preserving Playwright’s explicit, verifiable execution model.

## AI Highlights

### 1. Playwright Healer agent fixing the TodoMVC counter assertion

In the TodoMVC edit/delete flow, the original assertion assumed that the footer counter element would still be present after the final todo was removed. The Healer agent identified that the app removes the counter entirely in the empty state and updated the test to assert the correct behavior instead.

### 2. Copilot-assisted debugging of the jQuery UI datepicker whitespace bug

The jQuery UI datepicker test initially failed because the month/year title on the calendar included whitespace and non-breaking spaces. The debugging workflow normalized the label text before comparing it to the target month, allowing the calendar navigation to reliably select the correct month and day.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the TodoMVC tests:
   ```bash
   npx playwright test tests/todomvc --headed
   ```

3. Run the jQuery UI datepicker test:
   ```bash
   npx playwright test tests/jqueryui/datepicker-45-days-from-today.spec.ts --headed
   ```

4. Run all tests:
   ```bash
   npx playwright test
   ```
