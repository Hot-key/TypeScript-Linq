import { IEnumerator } from "../DataType/IEnumerator";
import { IEnumerable } from "../DataType/IEnumerable";
import { Enumerable } from "../DataType/Enumerable";
import { SelectEnumerableIterator } from "./SelectEnumerableIterator";

export abstract class NewIterator<TSource> extends Enumerable implements IEnumerator<TSource>, IEnumerable<TSource> {
  constructor() {
    super();
  }

  public Current: TSource;

  public abstract MoveNext(): boolean;
  public abstract Reset(): void;

  public GetEnumerator() {
    return this as IEnumerator<TSource>;
  }

  *[Symbol.iterator]() {
    let enumerator = this.GetEnumerator();

    while (enumerator.MoveNext()) {
      yield enumerator.Current;
    }
  }

  // public Select<TResult>(selector: (data: TSource) => TResult) {
  //   return new SelectEnumerableIterator<TSource, TResult>(this, selector);
  // }
}
