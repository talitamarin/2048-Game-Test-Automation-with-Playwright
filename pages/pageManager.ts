import { Page } from "playwright"
import { basePage } from "./basePage"
import { TutorialPage } from "./tutorialPage"

export class PageManager {

    private page: Page;
    private basePage: basePage;
    private tutorialPage: TutorialPage;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new basePage(page);
        this.tutorialPage = new TutorialPage(page);
    }

    onBasePage(): basePage {
        return this.basePage;
    }

    onTutorialPage(): TutorialPage {
        return this.tutorialPage;
    }
}

