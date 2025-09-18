function multiply(a){
    let m = a*4
}

function sum(b, c, callback){
    let  d = b + c;
    callback(d);
}

sum(4, 8, multiply) //48

//ARRAY SORT IN DESCENDING ORDER
let arr = [12,65,32,90];
arr.sort();

let sorted = arr.sort(a, b, function(a, b) {
    return b-a;
})

//ARRAY FILTER - even numbers
let arr1 = [23,86,34,10];
let evenNums = arr1.filter(filtercallback);

function filtercallback(el){
    return el % 2 === 0;
}




