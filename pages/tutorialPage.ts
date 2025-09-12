import { expect, Locator, Page } from "@playwright/test";
import { createWorker } from 'tesseract.js';
import { recognizeBoardText } from "../utils/ocr";
import path from "path";
import { PageManager } from "./pageManager";


export class TutorialPage {

  readonly page: Page;
  readonly svg: Locator;
  readonly box: Locator;
  readonly grid: Locator;
  readonly blk1x1: Locator;
  readonly blk1x2: Locator;
  readonly blk1x3: Locator;
  readonly blk1x4: Locator;
  readonly blk2x1: Locator;
  readonly blk2x2: Locator;
  readonly blk2x3: Locator;
  readonly blk2x4: Locator;
  readonly blk3x1: Locator;
  readonly blk3x2: Locator;
  readonly blk3x3: Locator;
  readonly blk3x4: Locator;
  readonly blk4x1: Locator;
  readonly blk4x2: Locator;
  readonly blk4x3: Locator;
  readonly blk4x4: Locator;
  readonly readyText: Locator;

  constructor(page: Page) {

    this.page = page;
    this.svg = this.page.locator('svg[class="pointer-events-none absolute transform-gpu touch-none opacity-0"]')
    this.grid = this.page.locator('canvas[class="absolute touch-none object-contain "]')
    this.box = this.page.locator('g[filter="url(#boardPlaceholder_svg__a)"]')
    this.blk1x1 = this.page.locator('g[filter="url(#boardPlaceholder_svg__c)"]')
    this.blk1x2 = this.page.locator('g[filter="url(#boardPlaceholder_svg__d)"]')
    this.blk1x3 = this.page.locator('g[filter="url(#boardPlaceholder_svg__e)"]')
    this.blk1x4 = this.page.locator('g[filter="url(#boardPlaceholder_svg__f)"]')
    this.blk2x1 = this.page.locator('g[filter="url(#boardPlaceholder_svg__g)"]')
    this.blk2x2 = this.page.locator('g[filter="url(#boardPlaceholder_svg__h)"]')
    this.blk2x3 = this.page.locator('g[filter="url(#boardPlaceholder_svg__i)"]')
    this.blk2x4 = this.page.locator('g[filter="url(#boardPlaceholder_svg__j)"]')
    this.blk3x1 = this.page.locator('g[filter="url(#boardPlaceholder_svg__k)"]')
    this.blk3x2 = this.page.locator('g[filter="url(#boardPlaceholder_svg__l)"]')
    this.blk3x3 = this.page.locator('g[filter="url(#boardPlaceholder_svg__m)"]')
    this.blk3x4 = this.page.locator('g[filter="url(#boardPlaceholder_svg__n)"]')
    this.blk4x1 = this.page.locator('g[filter="url(#boardPlaceholder_svg__o)"]')
    this.blk4x2 = this.page.locator('g[filter="url(#boardPlaceholder_svg__p)"]')
    this.blk4x3 = this.page.locator('g[filter="url(#boardPlaceholder_svg__q)"]')
    this.blk4x4 = this.page.locator('g[filter="url(#boardPlaceholder_svg__r)"]')
    this.readyText = this.page.locator('div[class="flex flex-col gap-2"]')
  }

  async clickTutorialButton() {
    await this.page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 bg-near-black text-white px-4 h-10 text-sm sm:text-base"]').getByText('Play Tutorial').click();
  }

  async clickUndoButton() {
    const undoButton = this.page.locator('button[class="xs:p-2 xs:rounded-lg relative z-40 flex aspect-square w-full shrink items-center justify-center self-stretch rounded-md p-1 text-white transition-[background,shadow] duration-[50ms] bg-leather shadow-button"]');
    await undoButton.isEnabled();
    await undoButton.click();
  }

  async getTutorialText() {
    return this.page.locator('span[class="mb-1 last:mb-0"]').first();
  }

  async getMatriz(): Promise<string[][]> {
    const pm = new PageManager(this.page);
    const matriz: string[][] = [];
    for (let i = 1; i <= 4; i++) {
      const row: string[] = [];
      for (let j = 1; j <= 4; j++) {
        const cell = pm.onTutorialPage()[`blk${i}x${j}`];
        const cellPath = path.join(__dirname, `../screenshots/cells/cell_${i}_${j}.png`);
        await cell.screenshot({ path: cellPath });
        const value = (await recognizeBoardText(cellPath)).replace(/\D/g, '');
        row.push(value || '0');
      }
      matriz.push(row);
    }
    return matriz;
  }

  async clickOnBlocks() {
    const matriz = await this.getMatriz();

    // Click on the two first blocks with value to use the swap
    const canvas = await this.page.locator('canvas').first();
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');

    const cellWidth = box.width / 4;
    const cellHeight = box.height / 4;

    const blocksWithValue: { i: number, j: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (matriz[i][j] !== '0') {
          blocksWithValue.push({ i, j });
          if (blocksWithValue.length === 2) break;
        }
      }
      if (blocksWithValue.length === 2) break;
    }

    for (const blocks of blocksWithValue) {
      const x = box.x + blocks.j * cellWidth + cellWidth / 2;
      const y = box.y + blocks.i * cellHeight + cellHeight / 2;
      await this.page.mouse.click(x, y);
      await this.page.waitForTimeout(200);
    }
  }
}