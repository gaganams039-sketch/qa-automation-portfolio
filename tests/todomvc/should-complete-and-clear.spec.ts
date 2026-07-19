// spec: specs/todomvc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Completion and bulk actions', () => {
  test('should mark todos complete and clear completed', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const input = page.getByPlaceholder('What needs to be done?');
    for (const label of ['Buy milk', 'Write tests', 'Walk the dog']) {
      await input.fill(label);
      await input.press('Enter');
    }

    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);

    await todoItems.nth(1).locator('.toggle').check();
    await expect(todoItems.nth(1)).toHaveClass(/completed/);
    await expect(page.locator('.todo-count')).toContainText('2 items left');

    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(todoItems).toHaveCount(2);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Write tests' })).toHaveCount(0);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy milk' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' })).toHaveCount(1);
  });
});
