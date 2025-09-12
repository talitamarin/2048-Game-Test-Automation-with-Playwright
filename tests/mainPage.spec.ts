import { test, expect, Locator } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import data from '../fixtures/systemValues.json';
import urls from '../fixtures/systemUrls.json';

test('Visit the web site 2048', async ({ page }) => {

  const pm = new PageManager(page);

  await pm.onBasePage().visitDefaultUrl();
  
  await expect(page).toHaveTitle(/2048/);
});

test('Validate all the items on dropdown menu is visible', async ({ page }) => {
  test.setTimeout(50000);

  const pm = new PageManager(page);

  await pm.onBasePage().visitDefaultUrl();

  await expect(pm.onBasePage().menu).toBeAttached();

  await pm.onBasePage().menu.click();

  await expect(pm.onBasePage().menuItems).toHaveCount(4);

  await expect(pm.onBasePage().menuItems.nth(0)).toContainText(['Standard']);
  await expect(pm.onBasePage().menuItems.nth(1)).toContainText(['Classic']);
  await expect(pm.onBasePage().menuItems.nth(2)).toContainText(['Tutorial']);
  await expect(pm.onBasePage().menuItems.nth(3)).toContainText(['Plus']);

});

test('Validate the New Game button', async ({ page }) => {
  test.setTimeout(50000);

  const pm = new PageManager(page);

  await pm.onBasePage().visitDefaultUrl();

  await expect(pm.onMainPage().newGameButton).toBeAttached();

 await pm.onMainPage().newGameButton.click()

  await expect(pm.onMainPage().newGameModal).toBeVisible();
  await expect(pm.onMainPage().newGameModal).toContainText(data.NewGameMessages.ProgressGameMessage)

  await pm.onMainPage().startNewGameButton.getByText('Start New Game').click()

});

test('Validate play the game', async ({ page }) => {
  test.setTimeout(125000);

 const pm = new PageManager(page);

  await pm.onBasePage().visitDefaultUrl();

  await pm.onBasePage().moveTheArrowKeys(30);

  await pm.onClassicGamePage().ValidateGameOver(30);

});

test('Validate go to the Plus Game', async ({ page }) => {

 const pm = new PageManager(page);
 
  await pm.onBasePage().visitDefaultUrl();

  await pm.onBasePage().chooseItemFromMenu(4, 'Plus');

  await expect(page).toHaveURL(urls.plus_page);

  await expect(pm.onMainPage().plusGameModal).toContainText(data.PlusGameMessages.PlusGameStartedMessage);
});

