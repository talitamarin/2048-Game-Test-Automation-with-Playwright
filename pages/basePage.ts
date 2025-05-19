import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";


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

  async chooseItemFromMenu(index: number, item: string ) {

    await this.menuItems.click();

    await expect(this.menuItems.nth(index)).toContainText(item);

    await this.menuItems.nth(index).click();
} 

}