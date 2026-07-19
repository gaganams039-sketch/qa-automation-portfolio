import { test, expect } from '@playwright/test';

test('should pick a date 45 days from today in the jQuery UI datepicker', async ({ page }) => {
  await page.goto('https://jqueryui.com/resources/demos/datepicker/default.html');

  const input = page.getByRole('textbox');

  await expect(input).toBeVisible();
  await input.click();

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  const targetDay = targetDate.getDate().toString();
  const targetMonthYear = targetDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const expectedValue = targetDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const monthYearLabel = page.locator('.ui-datepicker-title');
  const nextButton = page.locator('.ui-datepicker-next');
  const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

  for (let i = 0; i < 12; i++) {
    const current = normalize(await monthYearLabel.textContent() ?? '');
    if (current.includes(normalize(targetMonthYear))) {
      break;
    }

    await nextButton.click();
  }

  const dayButton = page
    .locator('.ui-datepicker-calendar td:not(.ui-datepicker-other-month) a')
    .filter({ hasText: targetDay })
    .first();
  await expect(dayButton).toBeVisible();
  await dayButton.click();

  await expect(input).toHaveValue(expectedValue);
});
