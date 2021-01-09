import { IEnumerator } from "./IEnumerator";

export class GeneratorEnumerator<T> implements IEnumerator<T> {
  constructor(generator: () => Generator<T>) {
    this.Generator = generator;
    this.Reset();
  }
  private Generator: () => Generator<T>;
  private Iterator: Iterator<T>;

  public MoveNext(): boolean {
    if (this.Iterator) {
      let curr = this.Iterator.next();
      this.Current = curr.value;
      return !curr.done;
    }
    return false;
  }

  public Reset(): void {
    this.Iterator = this.Generator();
    this.Current = null;
  }

  public Current: T;
}
