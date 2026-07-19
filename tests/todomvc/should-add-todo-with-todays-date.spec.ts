import { test, expect } from '@playwright/test';

test('should add a todo with today\'s date in the title', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const today = new Date().toISOString().slice(0, 10);
  const todoTitle = `Plan for ${today}`;
  const input = page.getByPlaceholder('What needs to be done?');

  await expect(input).toBeVisible();
  await input.fill(todoTitle);
  await input.press('Enter');

  await expect(page.getByRole('listitem').filter({ hasText: todoTitle })).toHaveCount(1);
  await expect(page.locator('.todo-list li').filter({ hasText: todoTitle })).toHaveCount(1);
});
