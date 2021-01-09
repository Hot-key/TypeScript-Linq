import { IEnumerator } from "../DataType/IEnumerator";
import { IEnumerable } from "../DataType/IEnumerable";
import { NewIterator } from "./NewIterator";

export class SelectEnumerableIterator<TSource, TResult> extends NewIterator<TResult> {
  constructor(source: IEnumerable<TSource>, selector: (data: TSource) => TResult) {
    super();
    this.source = source;
    this.selector = selector;
    this.Reset();
  }

  public Current: TResult;
  private readonly source: IEnumerable<TSource>;
  private iterator: Iterator<TResult>;
  private readonly selector: (data: TSource) => TResult;

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
        let done = enumerator.MoveNext();
        let value = enumerator.Current;
        return {
          done: !done,
          value: this.selector(value),
        };
      },
    };
  }
}
