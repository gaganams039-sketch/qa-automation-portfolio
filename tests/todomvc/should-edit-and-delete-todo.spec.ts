// spec: specs/todomvc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo creation and editing', () => {
  test('should edit and delete a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    await page.getByPlaceholder('What needs to be done?').fill('Study Playwright');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    const todoItem = page.locator('.todo-list li').filter({ hasText: 'Study Playwright' }).first();
    await expect(todoItem).toBeVisible();

    await todoItem.dblclick();
    const editInput = page.locator('.edit');
    await expect(editInput).toBeVisible();
    await editInput.fill('Study Playwright basics');
    await editInput.press('Enter');

    await expect(page.locator('.todo-list li').filter({ hasText: 'Study Playwright basics' })).toHaveCount(1);

    await page.locator('.todo-list li').filter({ hasText: 'Study Playwright basics' }).hover();
    await page.locator('.destroy').last().click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.todo-count')).toHaveCount(0);
  });
});
