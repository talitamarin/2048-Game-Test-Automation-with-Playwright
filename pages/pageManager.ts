import { Page } from "playwright"
import { basePage } from "./basePage"
import { TutorialPage } from "./tutorialPage"
import { ClassicGamePage } from "./classicGamePage";

export class PageManager {

    private page: Page;
    private basePage: basePage;
    private tutorialPage: TutorialPage;
    private classicGamePage: ClassicGamePage;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new basePage(page);
        this.tutorialPage = new TutorialPage(page);
        this.classicGamePage = new ClassicGamePage(page);
    }

    onBasePage(): basePage {
        return this.basePage;
    }

    onTutorialPage(): TutorialPage {
        return this.tutorialPage;
    }

    onClassicGamePage(): ClassicGamePage {
        return this.classicGamePage;
    }
}

