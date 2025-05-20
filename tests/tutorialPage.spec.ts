// @ts-ignore
process.removeAllListeners('warning');
import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { recognizeBoardText } from '../utils/ocr';
import path from 'path';
import data from '../fixtures/systemValues.json';


test('Validate the tutorial game', async ({ page }) => {

    const pm = new PageManager(page);

    await pm.onBasePage().visitDefaultUrl();
    
    await pm.onTutorialPage().clickTutorialButton();
    await expect(page).toHaveURL(/tutorial/);
    
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.MoveTheArrowKeys);
  
    await page.keyboard.press('ArrowRight');
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.CombineTheBlocks);
  
    await page.keyboard.press('ArrowDown');
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.JoinTheNumbers);
  
    await pm.onBasePage().moveTheArrowKeys(2);
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.YouDoIt);
  
    await pm.onBasePage().moveTheArrowKeys(2);
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.UseUndo);
    
    await pm.onTutorialPage().clickUndoButton();
  
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.UseSwap);
    
    await pm.onTutorialPage().clickUndoButton();
     
    await expect(await pm.onTutorialPage().getTutorialText()).toContainText(data.TutorialMessages.FirstSwap);

    await pm.onTutorialPage().getMatriz();

    await pm.onTutorialPage().clickOnBlocks();

    await expect(pm.onTutorialPage().readyText).toContainText(data.TutorialMessages.EndTutorial);
  });
  
  