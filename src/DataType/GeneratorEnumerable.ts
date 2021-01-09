import { IEnumerable } from "./IEnumerable";
import { IEnumerator } from "./IEnumerator";
import { GeneratorEnumerator } from "./GeneratorEnumerator";
import { Enumerable } from "./Enumerable";

export class GeneratorEnumerable<T> extends Enumerable implements IEnumerable<T> {
  constructor(generator: () => Generator<T>) {
    super();
    this.Generator = generator;
  }
  public Generator: () => Generator<T>;

  public GetEnumerator(): IEnumerator<T> {
    return new GeneratorEnumerator(this.Generator);
  }

  *[Symbol.iterator]() {
    let enumerator = this.GetEnumerator();

    while (enumerator.MoveNext()) {
      yield enumerator.Current;
    }
  }
}
