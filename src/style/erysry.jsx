var reallyWeirdGenerator = function* (index) {
  yield index++;
  yield index + 5;
  yield index;
};

var iterator = reallyWeirdGenerator(0);
console.log(iterator.next());console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next().done);