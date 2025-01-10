import { WatchedList } from '../../../shared/providers/entities/watched-list';



export class CategoriesList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a.toString() === b.toString();
  }
}
