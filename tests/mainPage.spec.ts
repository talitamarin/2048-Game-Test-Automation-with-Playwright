// @ts-ignore
process.removeAllListeners('warning');
import { test, expect, Locator } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { recognizeBoardText } from '../utils/ocr';
import fs from 'fs';
import path from 'path';

test('Visit the web site 2048', async ({ page }) => {
  await page.goto('https://play2048.co/');
  await expect(page).toHaveTitle(/2048/);
});

test('Validate all the items on dropdown menu is visible', async ({ page }) => {
  test.setTimeout(50000);

  await page.goto('https://play2048.co/');

  const menu = page.locator('button[class="hover:bg-beige relative z-30 flex items-center gap-2 rounded-xl p-1 px-2 transition-colors duration-75 md:-mx-2 "]')

  await expect(menu).toBeAttached();

  await page.locator('h1[class="flex items-center justify-center text-5xl font-bold "]').getByText('2048').click();

  const menuItems = page.locator('ul.flex > li')

  await expect(menuItems).toHaveCount(4);

  await expect(menuItems.nth(0)).toContainText(['Standard']);
  await expect(menuItems.nth(1)).toContainText(['Classic']);
  await expect(menuItems.nth(2)).toContainText(['Tutorial']);
  await expect(menuItems.nth(3)).toContainText(['Plus']);

});

test('Validate the New Game button', async ({ page }) => {
  test.setTimeout(50000);

  await page.goto('https://play2048.co/');

  await expect(page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 from-button-gradient-start to-button-gradient-end shadow-button bg-gradient-to-b text-white px-4 h-10 relative"]')).toContainText('New Game');

  await page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 from-button-gradient-start to-button-gradient-end shadow-button bg-gradient-to-b text-white px-4 h-10 relative"]').click()

  await expect(page.locator('div[class="flex flex-col gap-2"]')).toBeVisible();
  await expect(page.locator('div[class="flex flex-col gap-2"]')).toContainText('Are you sure you want to start a new game? All progress will be lost.')

  await page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 from-button-gradient-start to-button-gradient-end shadow-button bg-gradient-to-b text-white px-4 h-12 "]').getByText('Start New Game').click()

  await expect(page.locator('div[class="flex flex-col gap-2"]')).toBeVisible();
  await expect(page.locator('div[class="flex flex-col gap-2"]')).toContainText('New game started!')

  //Adicionar um expect após clicar no botão de start new game

});

test('Validate play the game', async ({ page }) => {
  test.setTimeout(125000);

  await page.goto('https://play2048.co/');
  await expect(page).toHaveTitle(/2048/);

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

test('Validate go to the Plus Game', async ({ page }) => {

  await page.goto('https://play2048.co/');

  await page.locator('h1[class="flex items-center justify-center text-5xl font-bold "]').getByText('2048').click();

  const menuItems = page.locator('ul.flex > li')

  await expect(menuItems).toHaveCount(4);
  await expect(menuItems.nth(3)).toContainText(['Plus']);

  await menuItems.nth(3).click();

  await expect(page).toHaveURL(/plus/);

  await expect(page.locator('span[class="text-64-red inline-flex items-baseline gap-[2px] font-medium"]')).toContainText('2048 Plus');
});

test.only('Validate the tutorial game', async ({ page }) => {
  const pm = new PageManager(page);
  await page.goto('https://play2048.co/');
  
  await pm.onMainTestPage().clickTutorialButton();
  await expect(page).toHaveURL(/tutorial/);
  
  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('Use the arrow keys to move the tiles.');

  await page.keyboard.press('ArrowRight');

  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('The tiles all moved in the same direction and a new one appeared.');

  await page.keyboard.press('ArrowDown');

  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('Tiles with the same number join when they touch.');

  await pm.onBasePage().moveTheArrowKeys(2);

  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('You’re getting the hang of it!');

  await pm.onBasePage().moveTheArrowKeys(2);

  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('If you make mistakes, you can use undo. Try it out!');
  
  await pm.onMainTestPage().clickUndoButton();

  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('Undo isn’t the only powerup you can use. Try “Swap Two Tiles”!');
  
  await pm.onMainTestPage().clickUndoButton();
   
  await expect(await pm.onMainTestPage().getTutorialText()).toContainText('Choose the first tile');
  
  // OCR célula a célula
  const matriz: string[][] = [];
  for (let i = 1; i <= 4; i++) {
    const linha: string[] = [];
    for (let j = 1; j <= 4; j++) {
      const cell = pm.onMainTestPage()[`blk${i}x${j}`];
      const cellPath = path.join(__dirname, `../screenshots/cells/cell_${i}_${j}.png`);
      await cell.screenshot({ path: cellPath });
      const valor = (await recognizeBoardText(cellPath)).replace(/\D/g, '');
      linha.push(valor || '0');
    }
    matriz.push(linha);
  }
  console.log('\n🔢 Matriz final por célula:\n', matriz);

  // Clique nos dois primeiros blocos com valor para usar o swap
  const canvas = await page.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Canvas não encontrado');

  const cellWidth = box.width / 4;
  const cellHeight = box.height / 4;

  const blocosComValor: {i: number, j: number}[] = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (matriz[i][j] !== '0') {
        blocosComValor.push({i, j});
        if (blocosComValor.length === 2) break;
      }
    }
    if (blocosComValor.length === 2) break;
  }

  for (const bloco of blocosComValor) {
    const x = box.x + bloco.j * cellWidth + cellWidth / 2;
    const y = box.y + bloco.i * cellHeight + cellHeight / 2;
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
  }

  await expect(await page.locator('div[class="flex flex-col gap-2"]')).toContainText('You’re Ready');
});

