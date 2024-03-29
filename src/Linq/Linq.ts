import { extension } from "./ExtensionDecorator";
import { Enumerable } from "../DataType/Enumerable";
import { IEnumerable } from "../DataType/IEnumerable";
import { SelectEnumerableIterator } from "./SelectEnumerableIterator";
import { WhereEnumerableIterator } from "./WhereEnumerableIterator";
import { GeneratorEnumerable } from "../DataType/GeneratorEnumerable";

declare module "../DataType/Enumerable" {
  interface Enumerable {
    Select?<TSource, TResult>(this: IEnumerable<TSource>, action: (data: TSource) => TResult): IEnumerable<TResult>;
    Where?<TSource>(this: IEnumerable<TSource>, action: (data: TSource) => boolean): IEnumerable<TSource>;
    Take?<TSource>(this: IEnumerable<TSource>, count: number): IEnumerable<TSource>;
  }
}

export default class Extensions {
  @extension(Enumerable)
  static Select?<TSource, TResult>(this: IEnumerable<TSource>, action: (data: TSource) => TResult): IEnumerable<TResult> {
    return new SelectEnumerableIterator<TSource, TResult>(this, action);
  }
  @extension(Enumerable)
  static Where?<TSource>(this: IEnumerable<TSource>, action: (data: TSource) => boolean): IEnumerable<TSource> {
    return new WhereEnumerableIterator<TSource>(this, action);
  }
  @extension(Enumerable)
  static Take?<TSource>(this: IEnumerable<TSource>, count: number): IEnumerable<TSource> {
    let enumerable = this;
    
    return new GeneratorEnumerable(function* () {
      let enumerator = enumerable.GetEnumerator();
      while (enumerator.MoveNext()) {
        yield enumerator.Current;
        if (--count == 0) break;
      }
    });
  }
}
