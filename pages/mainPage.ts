import { Page, Locator } from "playwright";


export class MainPage {

    readonly page: Page;
    readonly newGameButton: Locator;
    readonly newGameModal: Locator;
    readonly startNewGameButton: Locator;
    readonly plusGameModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newGameButton = page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 from-button-gradient-start to-button-gradient-end shadow-button bg-gradient-to-b text-white px-4 h-10 relative"]'); 
        this.newGameModal = page.locator('div[class="flex flex-col gap-2"]');
        this.startNewGameButton = page.locator('button[class="white flex items-center justify-center whitespace-nowrap rounded-lg text-base disabled:opacity-50 from-button-gradient-start to-button-gradient-end shadow-button bg-gradient-to-b text-white px-4 h-12 "]');
        this.plusGameModal = page.locator('span[class="text-64-red inline-flex items-baseline gap-[2px] font-medium"]')
    }
    
    
} 