const {SHA256} = require('crypto-js'); //this is only for test
const jwt = require('jsonwebtoken');


//****** version for json web token
const data = {
    id: 10
};

const token = jwt.sign(data, '123abc');
console.log(`Token: ${token}`);

const decoded = jwt.verify(token, '123abc');
console.log(`decoded: ${JSON.stringify(decoded)}`);
console.log('decoded', decoded);



//****** version for crypto-js
// const message = 'I am user number 3';
// const hash = SHA256(message).toString();
//
//
// //I create token
// let data = {
//     id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// };
//
//
// // ******* now I changin someting and I do not have someSecret value
// // token.data = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// // and here verifying
// const resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();
//
// if(resultHash === token.hash){
//     console.log('Data was not change');
// }else{
//     console.log('Data was change. Do not trust!');
// }


