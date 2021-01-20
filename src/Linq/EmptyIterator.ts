import { IEnumerator } from "../DataType/IEnumerator";
import { IEnumerable } from "../DataType/IEnumerable";
import { SelectEnumerableIterator } from "./SelectEnumerableIterator";

export class EmptyIterator<TSource> implements IEnumerator<TSource>, IEnumerable<TSource> {
  constructor() {}

  public Current: TSource;

  public MoveNext(): boolean{
    // Do nothing
    return false;
  };

  public Reset(): void{
    // Do nothing
    return;
  };

  public GetEnumerator() {
    return this as IEnumerator<TSource>;
  }

  *[Symbol.iterator]() {
    // Do nothing
  }
}
