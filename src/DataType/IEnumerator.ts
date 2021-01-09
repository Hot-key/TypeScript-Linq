export interface IEnumerator<T> {
  MoveNext(): boolean;
  Reset(): void;
  Current: T;
}
