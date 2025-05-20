import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";
import { MenuType } from "../utils/types";

export class basePage {
    
    readonly page: Page;
    readonly menu: Locator;
    readonly menuItems: Locator;

    constructor(page: Page) {
       
     this.page = page;
     this.menu = this.page.locator('h1[class="flex items-center justify-center text-5xl font-bold "]').getByText('2048')
     this.menuItems = page.locator('ul.flex > li')

  }

  async moveTheArrowKeys(numberOfMoves: number): Promise<void> {

    const moves = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

    for (let i = 0; i < numberOfMoves; i++) {
      for (const move of moves) {
        await this.page.keyboard.press(move);
        await this.page.waitForTimeout(50);
      }
    }
  }

  async visitDefaultUrl() {
    await this.page.goto('https://play2048.co/');
  }

  async chooseItemFromMenu(index: number, MenuItem: MenuType ) {
    await this.menu.click();
    
    const menuItem = this.menuItems.nth(index);
  
    await menuItem.click();

    await expect(menuItem).toContainText(MenuItem);
} 

async validadeCurrentUrl(page: Page, url) {

  await page.waitForURL(url)
  await expect.soft(page.url()).toContain(url)
} 

}