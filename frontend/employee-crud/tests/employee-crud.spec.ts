import { test, expect } from '@playwright/test';

test.describe('Employee CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    console.log('Navigated to homepage');
  });

  test('should create a new employee', async ({ page }) => {
    await page.waitForSelector('input#name');  // idで選択する
    console.log('Name input found');
    await page.fill('input#name', 'John Doe');
    await page.fill('input#position', 'Software Engineer');
    await page.fill('input#salary', '100000');
    await page.click('button[type="submit"]');
    console.log('Form submitted');

    await expect(page.locator('ul')).toContainText('John Doe');
    console.log('Employee created successfully');
  });

  test('should update an existing employee', async ({ page }) => {
    await page.waitForSelector('input#name');  // idで選択する
    console.log('Name input found');
    await page.fill('input#name', 'Jane Doe');
    await page.fill('input#position', 'Product Manager');
    await page.fill('input#salary', '120000');
    await page.click('button[type="submit"]');
    console.log('Form submitted');

    await page.click('button:has-text("Edit")');
    await page.fill('input#name', 'Jane Smith');
    await page.click('button[type="submit"]');
    console.log('Employee updated successfully');

    await expect(page.locator('ul')).toContainText('Jane Smith');
  });

  test('should delete an existing employee', async ({ page }) => {
    await page.waitForSelector('button:has-text("Delete")');
    console.log('Delete button found');
    await page.click('button:has-text("Delete")');
    console.log('Delete button clicked');
    await expect(page.locator('ul')).not.toContainText('John Doe');
    console.log('Employee deleted successfully');
  });
});
