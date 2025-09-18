//FIRST 10 LAKH PRIME NUMBERS

function checkPrime(num) {
    for (let p=2; p <=Math.sqrt(num); p++) {
        if (num % p === 0) {
            return false;
        }
    }
    return num > 1;
}

function getPrimes(){
    const primeNums = [];
    let p = 1;
    while (primeNums.length < 1000000) {
        if (checkPrime(p)){
            primeNums.push(p);
        }
        p++;
    }
}