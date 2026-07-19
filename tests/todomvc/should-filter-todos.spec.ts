// spec: specs/todomvc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering and state visibility', () => {
  test('should filter todos by all active and completed views', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const input = page.getByPlaceholder('What needs to be done?');
    for (const label of ['Buy milk', 'Write tests', 'Walk the dog']) {
      await input.fill(label);
      await input.press('Enter');
    }

    await page.locator('.todo-list li').filter({ hasText: 'Write tests' }).locator('.toggle').check();

    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy milk' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Write tests' })).toHaveCount(0);

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Write tests' })).toHaveCount(1);

    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy milk' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Write tests' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' })).toHaveCount(1);
  });
});
