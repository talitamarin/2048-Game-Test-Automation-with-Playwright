import { Page } from "playwright"
import { basePage } from "./basePage"
import { MainTestPage } from "./mainTestPage"

export class PageManager {

    private page: Page;
    private basePage: basePage;
    private mainTestPage: MainTestPage;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new basePage(page);
        this.mainTestPage = new MainTestPage(page);
    }

    onBasePage(): basePage {
        return this.basePage;
    }

    onMainTestPage(): MainTestPage {
        return this.mainTestPage;
    }
}

