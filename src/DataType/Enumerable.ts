import { IEnumerable } from "./IEnumerable";
import { IEnumerator } from "./IEnumerator";
import { GeneratorEnumerator } from "./GeneratorEnumerator";

export class Enumerable {
  public static AsEnumerable<TSource>(this: IEnumerable<TSource>): IEnumerable<TSource> {
    return this;
  }
}
