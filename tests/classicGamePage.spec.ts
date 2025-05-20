import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import urls from '../fixtures/systemUrls.json';

test('Validate go to the Classic Game', async ({ page }) => {
  
  const pm = new PageManager(page);
  await pm.onBasePage().visitDefaultUrl();
  await pm.onBasePage().chooseItemFromMenu(1, 'Classic');
 
  await pm.onBasePage().validadeCurrentUrl(page, urls.classic_page);
 

});

test('Validate play the Classic Game', async ({ page }) => {
    test.setTimeout(125000);

    const pm = new PageManager(page);

    await pm.onBasePage().visitDefaultUrl();
    await pm.onBasePage().chooseItemFromMenu(1, 'Classic');

    await pm.onBasePage().moveTheArrowKeys(30);

    await pm.onClassicGamePage().ValidateGameOver(30);
});

