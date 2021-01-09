import { IEnumerator } from "../DataType/IEnumerator";
import { IEnumerable } from "../DataType/IEnumerable";
import { NewIterator } from "./NewIterator";

export class WhereEnumerableIterator<TSource> extends NewIterator<TSource> {
  constructor(source: IEnumerable<TSource>, selector: (data: TSource) => boolean) {
    super();
    this.source = source;
    this.selector = selector;
    this.Reset();
  }

  public Current: TSource;
  private readonly source: IEnumerable<TSource>;
  private iterator: Iterator<TSource>;
  private readonly selector: (data: TSource) => boolean;

  public MoveNext(): boolean {
    if (this.iterator) {
      let curr = this.iterator.next();
      this.Current = curr.value;
      return !curr.done;
    }
    return false;
  }

  public Reset(): void {
    let enumerator = this.source.GetEnumerator();
    this.Current = null;
    this.iterator = {
      next: () => {
        while (enumerator.MoveNext()) {
          if (this.selector(enumerator.Current)) {
            return {
              done: false,
              value: enumerator.Current,
            };
          }
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }
}
