import prompts from "prompts";

import BookService from "./services/BookService";
import AmazonService from "./services/AmazonService";

import { GenreData } from "./types";

class App {
  private static genres: GenreData[];

  public static async start() {
    try {
      this.genres = await BookService.getGenres();

      const selectedBook = await this.selectBook();

      await AmazonService.checkoutBook(selectedBook);
    } catch (error) {
      console.error(error);
    }
  }

  private static async selectBook(): Promise<string> {
    const { value: selectedBook } = await prompts({
      type: "select",
      name: "value",
      message: "Select a genre",
      choices: this.genres.map(({ genre, sampleBook }) => ({
        title: genre,
        description: sampleBook,
        value: sampleBook,
      })),
      initial: 1,
    });

    return selectedBook;
  }
}

App.start();
