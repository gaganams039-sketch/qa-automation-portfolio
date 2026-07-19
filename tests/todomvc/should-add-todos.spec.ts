// spec: specs/todomvc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo creation and editing', () => {
  test('should add todos from the input', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await expect(newTodo).toBeVisible();
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');

    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy milk' })).toHaveCount(1);
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    await newTodo.fill('Write tests');
    await newTodo.press('Enter');
    await newTodo.fill('Walk the dog');
    await newTodo.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Write tests' })).toHaveCount(1);
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' })).toHaveCount(1);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });

  test('should update the count after each added todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const todoLabels = ['First todo', 'Second todo', 'Third todo'];

    await expect(newTodo).toBeVisible();

    for (const [index, label] of todoLabels.entries()) {
      await newTodo.fill(label);
      await newTodo.press('Enter');

      await expect(page.locator('.todo-list li')).toHaveCount(index + 1);
      await expect(page.locator('.todo-list li').filter({ hasText: label })).toHaveCount(1);
      await expect(page.locator('.todo-count')).toContainText(`${index + 1} item${index === 0 ? '' : 's'} left`);
    }
  });

  test('should not add an empty todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await expect(newTodo).toBeVisible();
    await newTodo.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.todo-count')).toHaveCount(0);
  });

  test('should not add a todo containing only spaces', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await expect(newTodo).toBeVisible();
    await newTodo.fill('   ');
    await newTodo.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.todo-count')).toHaveCount(0);
  });
});
