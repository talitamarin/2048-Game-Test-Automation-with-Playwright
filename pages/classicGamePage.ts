import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";

export class ClassicGamePage {

    readonly page: Page;

    constructor(page: Page) { 
        this.page = page;
        
    }
}