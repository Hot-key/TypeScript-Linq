import { GeneratorEnumerator } from "./DataType/GeneratorEnumerator";
import { GeneratorEnumerable } from "./DataType/GeneratorEnumerable";
import "./Linq/Linq";

function* Fibonacci() {
  let current = 1;
  let previous = 0;

  while (previous < 100) {
    yield current;

    let temp = previous;
    previous = current;
    current += temp;
  }
}

var enumerable = new GeneratorEnumerable(Fibonacci);

var enumerable2 = enumerable.Select(x => x + 1).Where(x => x > 10);

for (let a of enumerable2) {
  console.log(a);
}
