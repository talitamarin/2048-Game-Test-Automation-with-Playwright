import { test, expect } from '@playwright/test';

test('Validate go to the Classic Game', async ({ page }) => {

    await page.goto('https://play2048.co/');

    await page.locator('h1[class="flex items-center justify-center text-5xl font-bold "]').getByText('2048').click();

    const menuItems = page.locator('ul.flex > li')

    await expect(menuItems).toHaveCount(4);
  
    await expect(menuItems.nth(1)).toContainText(['Classic']);

    await menuItems.nth(1).click();

    await expect(page).toHaveURL(/classic/);
});

test('Validate play the Classic Game', async ({ page }) => {
    test.setTimeout(125000);

    await page.goto('https://play2048.co/');

    await page.locator('h1[class="flex items-center justify-center text-5xl font-bold "]').getByText('2048').click();

    const menuItems = page.locator('ul.flex > li')

    await expect(menuItems).toHaveCount(4);
  
    await expect(menuItems.nth(1)).toContainText(['Classic']);

    await menuItems.nth(1).click();

    await expect(page).toHaveURL(/classic/);

    const moves = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

  for (let i = 0; i < 30; i++) {
    for (const move of moves) {
      await page.keyboard.press(move);
      await page.waitForTimeout(50);
    }
  }

  const gameOverElement = page.locator('div[class="text-4xl font-semibold md:text-5xl"]');
  const isGameOver = await gameOverElement.isVisible() && await gameOverElement.textContent() === 'Game Over';

  if (isGameOver) {

    await expect(gameOverElement).toContainText('Game Over');

  } else {

    const moves = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

    for (let i = 0; i < 50; i++) {
      for (const move of moves) {
        await page.keyboard.press(move);
        await page.waitForTimeout(50);
      }
    }

    await expect(gameOverElement).toContainText('Game Over');
  }
    
});

