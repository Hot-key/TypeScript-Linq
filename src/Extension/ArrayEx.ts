import { extension } from './ExtensionDecorator';

declare global {  
  interface Array<T> {  
    SplitList(this : Array<T>, size: number): Array<Array<T>>;
  }  
}

export default class Extensions {
  @extension(Array)
  static SplitList<T>(this : Array<T>, size: number) : Array<Array<T>>{
    var results = [];
    while (this.length) {
        results.push(this.splice(0, size));
    }
    return results
  }
}