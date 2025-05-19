// @ts-ignore
process.removeAllListeners('warning');
import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { recognizeBoardText } from '../utils/ocr';
import path from 'path';



test('Validate the tutorial game', async ({ page }) => {

    const pm = new PageManager(page);

    await pm.onBasePage().visitDefaultUrl();
    
    await pm.onTutorialPage().clickTutorialButton();
    await expect(page).toHaveURL(/tutorial/);
    
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('Use the arrow keys to move the tiles.');
  
    await page.keyboard.press('ArrowRight');
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('The tiles all moved in the same direction and a new one appeared.');
  
    await page.keyboard.press('ArrowDown');
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('Tiles with the same number join when they touch.');
  
    await pm.onBasePage().moveTheArrowKeys(2);
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('You’re getting the hang of it!');
  
    await pm.onBasePage().moveTheArrowKeys(2);
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('If you make mistakes, you can use undo. Try it out!');
    
    await pm.onTutorialPage().clickUndoButton();
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('Undo isn’t the only powerup you can use. Try “Swap Two Tiles”!');
    
    await pm.onTutorialPage().clickUndoButton();
     
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText('Choose the first tile');
    
    // OCR célula a célula
    const matriz: string[][] = [];
    for (let i = 1; i <= 4; i++) {
      const linha: string[] = [];
      for (let j = 1; j <= 4; j++) {
        const cell = pm.onTutorialPage()[`blk${i}x${j}`];
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
  
  