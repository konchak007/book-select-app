import readline from "readline";
import prompts from "prompts";

import BookService from "./services/BookService";
import AmazonService from "./services/AmazonService";

import { GenreData } from "./types";

class App {
  public static async start() {
    try {
      this.clearTerminal();
      console.log("Loading genres...");

      const genres = await BookService.getGenres();
      this.clearTerminal();

      const selectedGenre = await this.selectGenre(genres);
      this.clearTerminal();

      console.log("Loading books...");
      const booksList = await BookService.getBooksByGenre(selectedGenre);
      this.clearTerminal();

      const selectedBook = await this.selectBook(booksList);
      this.clearTerminal();

      console.log("Time to make a checkout...");

      await AmazonService.checkoutBook(selectedBook);
    } catch (error) {
      this.clearTerminal();

      console.log("Something went wrong!..");
      console.log("\n");

      const shouldStartAgain = await this.askToStartAgain();

      this.clearTerminal();

      if (shouldStartAgain) {
        this.start();
      } else {
        process.exit(0);
      }
    }
  }

  private static async askToStartAgain() {
    const { value } = await prompts({
      type: "confirm",
      name: "value",
      message: "Would you like to start again?",
      initial: true,
    });

    return value;
  }

  private static async selectBook(bookList: string[]): Promise<string> {
    const { value: selectedBook } = await prompts({
      type: "select",
      name: "value",
      message: "Select a book",
      choices: bookList.map((bookName) => ({
        title: bookName,
        value: bookName,
      })),
      initial: 0,
    });

    return selectedBook;
  }

  private static async selectGenre(genreList: GenreData[]): Promise<string> {
    const { value: selectedBook } = await prompts({
      type: "select",
      name: "value",
      message: "Select a genre",
      choices: genreList.map(({ genre, sampleBook }) => ({
        title: genre,
        description: sampleBook,
        value: genre,
      })),
      initial: 0,
    });

    return selectedBook;
  }

  private static clearTerminal() {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }
}

App.start();
