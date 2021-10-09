import puppeteer, {
  Browser as BrowserType,
  Page,
  PageEventObject,
} from "puppeteer";

class Browser {
  private instance: BrowserType = null;
  private pageInstance: Page = null;

  async init(config: object) {
    const browser = await puppeteer.launch(config);

    this.instance = browser;
    this.pageInstance = await browser.newPage();
  }

  public goto(url: string) {
    return this.page.goto(url);
  }

  public async clickBySelector(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  public async clickByTagAndText(tag: string, text: string) {
    const [clickableElement] = await this.page.$x(
      `//${tag}[contains(text(), '${text}')]`
    );

    await clickableElement.click();
  }

  public close() {
    return this.instance.close();
  }

  public async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  public onPage(eventType: keyof PageEventObject, callback: () => void) {
    this.page.on(eventType, callback);
  }

  public get page() {
    return this.pageInstance;
  }
}

export default Browser;
