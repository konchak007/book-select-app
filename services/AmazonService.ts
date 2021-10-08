import Browser from "../utils/Browser";

class AmazonService {
  private static searchUrl = "https://www.amazon.com/s?k=";

  public static async checkoutBook(bookName: string) {
    const browser = new Browser();
    await browser.init({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    await browser.goto(`${this.searchUrl}${bookName}+hardcover`);

    await browser.clickByTagAndText("a", "Hardcover");
    await browser.clickBySelector("#add-to-cart-button");
    await browser.clickBySelector("#nav-cart");
  }
}

export default AmazonService;
