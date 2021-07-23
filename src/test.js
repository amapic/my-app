Subject=require('rxjs/Subject');

// sortBy = require('lodash/sortBy');
// var users = [
// 	{ 'user': 'fred',   'age': 48 },
// 	{ 'user': 'barney', 'age': 36 },
// 	{ 'user': 'fred',   'age': 40 },
// 	{ 'user': 'barney', 'age': 34 }
//   ];
   
//   sortBy(users, [function(o) { return o.user; }]);
//   // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
//   console.log(users[0]);
//   console.log(sortBy(users,['age']));
// console.log(sortBy(users,['age'])[0]);



 
const subject = new Subject();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(1);
subject.next(2);

  