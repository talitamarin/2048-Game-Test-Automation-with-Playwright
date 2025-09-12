import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";

export class ClassicGamePage {

    readonly page: Page;
    readonly gameOverElement: Locator;

    constructor(page: Page) { 
        this.page = page;
        this.gameOverElement = page.locator('div[class="text-4xl font-semibold md:text-5xl"]');
    }

    async ValidateGameOver(numberOfMoves: number) {

        const isGameOver = await this.gameOverElement.isVisible() && await this.gameOverElement.textContent() === 'Game Over';
      
        if (isGameOver) {
      
        await expect(this.gameOverElement).toContainText('Game Over');
      
        } else {
      
          const moves = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
      
          for (let i = 0; i < numberOfMoves; i++) {
            for (const move of moves) {
              await this.page.keyboard.press(move);
              await this.page.waitForTimeout(50);
            }
          }
      
          await expect(this.gameOverElement).toContainText('Game Over');
        }
    }
}