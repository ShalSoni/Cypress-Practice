const { resolve } = require("path");

async function getText(){
    return "func text"
}

getText().then((text) => {
    console.log(text);
}).catch((err) => {
    console.log(JSON.stringify(err));
});

async function solvePromise() {
    const promise = new Promise ((resolve), (reject) => {
        resolve('promise is resolved')
    })
        const result = await promise;
        console.log(promise)    
}

solvePromise();

//try-catch
async function resPromise() {
    const promise1 = new Promise ((resolve),(reject) => {
        reject('promise rejected')
    })}

try {
    const result1 = await promise1;
    console.log(result1);
} catch(err) {
    console.log(JSON.stringify(err))
}
