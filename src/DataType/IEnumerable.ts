import { IEnumerator } from "./IEnumerator";
import { Enumerable } from "./Enumerable";

export interface IEnumerable<T> extends Enumerable {
  GetEnumerator(): IEnumerator<T>;
  [Symbol.iterator](): Generator<T>;
}
