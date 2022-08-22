// function makeFunc(){
//     var name="mozilla";
//     function displayName() { // displayName() 은 내부 함수이며, 클로저다.
//         var hi="makadskfj";
//         alert(name); // 부모 함수에서 선언된 변수를 사용한다.
//       }
//       displayName();
// }

// var myFunc=makeFunc();
// myFunc();






// function makeAdder(x) {
//     var y = 1;
//     return function(z) {
//       y = 100;
//       return x + y + z;
//     };
//   }

//   console.log(makeAdder(5));

//   var add5 = makeAdder(5);
//   var add10 = makeAdder(10);
//   //클로저에 x와 y의 환경이 저장됨

//   console.log(add5(2));  // 107 (x:5 + y:100 + z:2)
//   console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//   //함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산





// var counter = (function() {
//     var privateCounter = 0;
//     function changeBy(val) {
//       privateCounter += val;
//     }
//     return {
//       increment: function() {
//         changeBy(1);
//       },
//       decrement: function() {
//         changeBy(-1);
//       },
//       value: function() {
//         return privateCounter;
//       }
//     };
//   })();

//   console.log(counter.value()); // logs 0
//   counter.increment();
//   counter.increment();
//   console.log(counter.value()); // logs 2
//   counter.decrement();
//   console.log(counter.value()); // logs 1






var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      decrement: function() {
        changeBy(-1);
      },
      value: function() {
        return privateCounter;
      }
    }
  };

  var counter1 = makeCounter();
  var counter2 = makeCounter();
  alert(counter1.value()); /* 0 */
  counter1.increment();
  counter1.increment();
  alert(counter1.value()); /* 2 */
  counter1.decrement();
  alert(counter1.value()); /* 1 */
  alert(counter2.value()); /* 0 */

  