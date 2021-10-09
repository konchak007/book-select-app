import Browser from "../utils/Browser";

import { GenreData } from "../types";

class BookService {
  private static url = "https://www.goodreads.com/choiceawards/best-books-2020";

  public static async getGenres(): Promise<GenreData[]> {
    const browser = new Browser();
    await browser.init({
      headless: true,
    });

    await browser.goto(this.url);

    const names = await browser.page.evaluate(() => {
      return Array.from(document.querySelectorAll(".category")).map(
        (categoryElement) => {
          const genre = categoryElement
            .querySelector(".category__copy")
            .textContent.trim();

          const sampleBook = categoryElement
            .querySelector(".category__winnerImage")
            .getAttribute("alt");

          return { genre, sampleBook };
        }
      );
    });

    browser.close();

    return names;
  }

  public static async getBooksByGenre(genre: string): Promise<string[]> {
    const browser = new Browser();
    await browser.init({
      headless: true,
    });

    await browser.goto(this.url);

    await browser.clickByTagAndText("h4", genre);
    await browser.waitForSelector(".resultShown");

    const bookList = await browser.page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".resultShown .answerWrapper img")
      ).map((imgElement) => {
        const bookName = imgElement.getAttribute("alt");

        return bookName;
      });
    });

    browser.close();

    return bookList;
  }
}

export default BookService;
