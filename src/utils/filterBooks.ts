import { Book } from "../types/Book";
import { SortType } from "../types/SortType";

export function filterBooks(
  books: Book[],
  sortType: SortType
) {
  let visibleBooks = [...books];
  
  switch (sortType) {
    case SortType.ACTIVE:
      visibleBooks = visibleBooks.filter(book => book.activated);
      break;
    case SortType.DEACTIVE:
      visibleBooks = visibleBooks.filter(book => !book.activated);
      break
    case SortType.ALL:
    default:
      break
  }

  return visibleBooks;
}