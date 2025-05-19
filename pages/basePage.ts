import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";


export class basePage {
    
    readonly page: Page;

    constructor(page: Page) {
       
     this.page = page;

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
}