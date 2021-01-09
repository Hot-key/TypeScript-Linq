import { GeneratorEnumerator } from "../DataType/GeneratorEnumerator";
import { GeneratorEnumerable } from "../DataType/GeneratorEnumerable";
import "../Linq/Linq";
import assert from "assert";
import "mocha";

function* Test1Generator() {
  yield 1;
  yield 3;
  yield 5;
}

function* Test2Generator() {
  var a = 0;
  while (a < 10) {
    yield a;
    a++;
  }
}

function* Test3Generator() {
}

describe("GeneratorEnumerable Test", function () {
  describe("#Generator", function () {
    it("Test1 Generator", function () {
      let enumerable = new GeneratorEnumerable(Test1Generator);

      assert.deepStrictEqual(enumerable.Generator(), enumerable.Generator());
      assert.notStrictEqual(enumerable.Generator(), enumerable.Generator());
    });
    it("Test2 Generator", function () {
      let enumerable = new GeneratorEnumerable(Test2Generator);

      assert.deepStrictEqual(enumerable.Generator(), enumerable.Generator());
      assert.notStrictEqual(enumerable.Generator(), enumerable.Generator());
    });
    it("Test3 Generator", function () {
      let enumerable = new GeneratorEnumerable(Test3Generator);

      assert.deepStrictEqual(enumerable.Generator(), enumerable.Generator());
      assert.notStrictEqual(enumerable.Generator(), enumerable.Generator());
    });
  });

  describe("#GetEnumerator", function () {
    it("Test1 GetEnumerator", function () {
      let enumerable = new GeneratorEnumerable(Test1Generator);
      let enumerator1 = enumerable.GetEnumerator();
      let enumerator2 = enumerable.GetEnumerator();
      assert.notStrictEqual(enumerator1, enumerator2);
    });
  });

  describe("#[Symbol.iterator]", function () {
    it("Test1 [Symbol.iterator]", function () {
      let enumerable = new GeneratorEnumerable(Test1Generator);
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([1, 3, 5]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([1, 3, 5]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([1, 3, 5]));
    });
    it("Test2 [Symbol.iterator]", function () {
      let enumerable = new GeneratorEnumerable(Test2Generator);
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });
    it("Test3 [Symbol.iterator]", function () {
      let enumerable = new GeneratorEnumerable(Test3Generator);
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([]));
      assert.strictEqual(JSON.stringify([...enumerable]), JSON.stringify([]));
    });
  });
});

describe("GeneratorEnumerator Test", function () {
  describe("#MoveNext", function () {
    it("Test1 MoveNext", function () {
      let enumerable = new GeneratorEnumerable(Test1Generator);
      let enumerator = enumerable.GetEnumerator();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 3);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 5);
    });
    it("Test2 MoveNext", function () {
      let enumerable = new GeneratorEnumerable(Test2Generator);
      let enumerator = enumerable.GetEnumerator();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 0);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 2);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 3);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 4);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 5);
    });
    it("Test3 MoveNext", function () {
      let enumerable = new GeneratorEnumerable(Test3Generator);
      let enumerator = enumerable.GetEnumerator();
      let moveNext = enumerator.MoveNext();
      assert.strictEqual(moveNext, false);
    });
  });

  describe("#Reset", function () {
    it("Test1 MoveNext", function () {
      let enumerable = new GeneratorEnumerable(Test1Generator);
      let enumerator = enumerable.GetEnumerator();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 3);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 5);
      enumerator.Reset();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
    });
    it("Test2 MoveNext", function () {
      let enumerable = new GeneratorEnumerable(Test2Generator);
      let enumerator = enumerable.GetEnumerator();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 0);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 2);
      enumerator.Reset();
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 0);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 1);
      enumerator.Reset();
      assert.deepStrictEqual(enumerator.Current, null);
      enumerator.MoveNext();
      assert.deepStrictEqual(enumerator.Current, 0);
    });
  });
});
