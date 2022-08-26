// //callback 함수
// function func(callback) {
// 	callback();
// }

// function callback() {
// 	console.log("callback");
// }

// func(callback);



// function findUserAndCallBack(id, cb) {
//     const user = {
//         id: id,
//         name: "User" + id,
//         email: id + "@test.com",
//     };
//     cb(user);
// }

// findUserAndCallBack(1, function (user) {
//     console.log("user:", user);
// });




// function findUser(id) {
//     let user;
//     setTimeout(function () {
//         console.log("waited 0.1 sec.");
//         user = {
//             id: id,
//             name: "User" + id,
//             email: id + "@test.com",
//         };
//     }, 100);
//     return user;
// }

// const user = findUser(1);
// console.log("user:", user);




// function findUser(id) {
//     const user = {
//         id: id,
//         name: "User" + id,
//         email: id + "@test.com",
//     };
//     return user;
// }

// const user = findUser(1);
// console.log("user:", user);



// doSomething1(function (result1) {
//     doSomething2(result1, function (result2) {
//         doSomething3(result2, function (finalResult) {
//             console.log('최종 실행 결과: ' + finalResult);
//         }, failureCallback);
//     }, failureCallback);
// }, failureCallback);



// doSomething1()
//     .then(function (reulst1) {
//         return doSomething2(result1);
//     })
//     .then(function (result2) {
//         return doSomething3(result2);
//     })
//     .then(function (finalResult) {
//         console.log('최종 실행 결과: ' + finalResult);
//     })
//     .catch(failureCallback);





// function findUserAndCallBack(id, cb) {
//     setTimeout(function () {
//         console.log("waited 0.1 sec.");
//         const user = {
//             id: id,
//             name: "User" + id,
//             email: id + "@test.com",
//         };
//         cb(user);
//     }, 100);
// }

// findUserAndCallBack(1, function (user) {
//     console.log("user:", user);
// });



// function findUser(id) {
//     let user;
//     setTimeout(function () {
//         console.log("waited 0.1 sec.");
//         user = {
//             id: id,
//             name: "User" + id,
//             email: id + "@test.com",
//         };
//     }, 100);
//     return user;
// }

// const user = findUser(1);
// console.log("user:", user);





// function findUserAndCallBack(id, cb) {
//     setTimeout(function () {
//       console.log("waited 0.1 sec.");
//       const user = {
//         id: id,
//         name: "User" + id,
//         email: id + "@test.com",
//       };
//       cb(user);
//     }, 100);
//   }
  
//   findUserAndCallBack(1, function (user) {
//     console.log("user:", user);
//   });




function findUser(id) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log("waited 0.1 sec.");
            const user = {
                id: id,
                name: "User" + id,
                email: id + "@test.com",
            };
            resolve(user);
        }, 100);
    });
}

findUser(1).then(function (user) {
    console.log("user:", user);
});





// function findUser(id) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             console.log("waited 0.1 sec.");
//             const user = {
//                 id: id,
//                 name: "User" + id,
//                 email: id + "@test.com",
//             };
//             resolve(user);
//         }, 100);
//     });
// }

// async function logUser(){
//     var result = await findUser(1);
//     console.log("user:",result);
// }

// logUser();





// function work1() {
// 	const start = Date.now();
// 	// Data.now() : 현재 날짜를 숫자 형태로 표시해주는 javascript 내장 함수
// 	for(let i=0; i<1000000000; i++) {
		
// 	}
// 	const end = Date.now();
// 	console.log(end - start + 'ms');
// }
// // 실행결과
// // 작업 시작
// // work1()
// // 다음 작업
// // => 동기처리는 순서대로 작업 진행

// console.log('작업 시작');
// work1();
// console.log('다음 작업');




// // setTimeout을 사용한 비동기
// function work2() {
// 	setTimeout(() => { // setTimeout(() => {}, 0) : 0초 뒤 실행하겠다는 함수
// 		const start = Date.now();
// 	// Data.now() : 현재 날짜를 숫자 형태로 표시해주는 javascript 내장 함수
// 		for(let i=0; i<1000000000; i++) {
			
// 		}
// 		const end = Date.now();
// 		console.log(end - start + 'ms');
// 	}, 0);
// }
// // 실행결과
// // 작업 시작
// // 다음 작업
// // work2()
// // => 비동기처리는 동시에 작업을 시작하여 먼저 완료되는 작업부터 노출
// // => 만약 work2 함수가 끝난 다음에 어떤 작업을 처리하고 싶다면 callback 함수를 파라미터로 전달해줌

// console.log('작업 시작');
// work2();
// console.log('다음 작업');








// // callback 함수를 사용
// function work3(callback) {
// 	setTimeout(() => {
// 		const start = Date.now();
// 	// Data.now() : 현재 날짜를 숫자 형태로 표시해주는 javascript 내장 함수
// 		for(let i=0; i<1000000000; i++) {
			
// 		}
// 		const end = Date.now();
// 		console.log(end - start + 'ms');
// 		callback(end - start);
// 	}, 0);
// }
// // 실행결과
// // 작업 시작
// // 다음 작업
// // 작업이 끝났어요! 
// // ms 걸렸다고 해요.

// console.log('작업 시작');
// work3((ms) => {
// 	console.log('작업이 끝났어요!');
// 	console.log(ms + 'ms 걸렸다고 해요.');
// });
// console.log('다음 작업');