import { GeneratorEnumerator } from "./DataType/GeneratorEnumerator";
import { GeneratorEnumerable } from "./DataType/GeneratorEnumerable";
import "./Linq/Linq";

function* Fibonacci() {
  let current = 1;
  let previous = 0;
  while (true){
    yield current;
    let temp = previous;
    previous = current;
    current += temp;
  }
}

let enumerable = new GeneratorEnumerable(Fibonacci);

let newEnumerable = enumerable.Select(x => x * 2).Take(5);

for(let i of newEnumerable) {
  console.log(i);
}
console.log("-------------------------");

let newEnumerable2 = enumerable.Take(10).Where(x => x > 10);

for(let i of newEnumerable2) {
  console.log(i);
}
