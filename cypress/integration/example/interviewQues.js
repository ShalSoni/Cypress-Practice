//1. OddEven
function evenOdd(num) {
    if (num % 2 === 0)
    {
        console.log('Number ${num} is even')
    }
    else 
        console.log('Number ${num} is odd')
}

evenOdd(12);

//Even Odd count
const counts = arr.reduce(
  (acc, num) => {
    num % 2 === 0 ? acc.even++ : acc.odd++;
    return acc;
  },
  { even: 0, odd: 0 }
);

console.log(`Even: ${counts.even}, Odd: ${counts.odd}`);


//2. Prime Number
function primeNum(num1){
    if (num1 <= 1) return false;
    if (num1 === 2) return true;
    if (num1 % 2 === 0) return false;

    const sqrt = Math.sqrt(num1);
    for (let i = 3; sqrt; i++) {
        if (num1 % i === 0) {
            return false
        }
        return true;
    }
}

//3. Fibonacci series
function fibUpto(limit) {
    let a = 0, b = 1;
    const result1 = []

    while (a<=limit){
        result1.push(a)
        [a,b] = [b, a+b]
    }
    return result1;
 
}

//4. Swap 2 numbers without using 3rd var
function swapNums(a,b) {
    a = a+b
    b = a-b
    a = a-b

    console.log('Numbers are swapped')
}

//5. Factorial on given number
function factorial(num2) {
    var fact = 1
    for (let i = 1; 1 <= num2; i++) {
        fact = fact *i;
    }
    console.log('Factorial is ${fact}')
}

//6. Reverse number
function reverseNum(num3) {
    let reversed = 0;
    while (num3 !== 0){
        reversed = reversed*10 + (num3 % 10);
        num3 = Math.floor(num3/10)
    }
    return reversed;
}

//7. Armstrong Number
function isArmstrong(num4){
    let digits = num4.toString.split('');
    let power = digits.length
    let sum = digits.reduce((acc,digit) => acc + Math.pow(parseInt(digit),power), 0)
}


//8. Palindrome
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^0-9a-z]/gi,'')
    let reversed = []
    for (let i=cleaned.length-1; i>=0; i--){
        reversed.push(cleaned[i])
    }
    return reversed.join('') === str;
}

//9. Sum of digits of a number
function sumOfDigits(num) 
{
    let sum = 0;
    while (num > 0)
    {
        sum = sum + (num%10); //extract last digit
        num = Math.floor(num/10);
    }
    return sum;
}

//10. Reverse each word of a given sentence
function reverseEachWord (sentence){
    const removeSpace = sentence.split(' ');
    const revSentence = removeSpace.map( word => word.split('').reverse().join(''));
    return revSentence.join(' ');
}

//11. Find duplicate characters in string
function dupChars(string1) {
    const charCount = {}
    const duplicates = new Set()

    for (let char in string1) {
        if (char === ' ') continue; //skip spaces
        char = char.toLowerCase();

        if (charCount[char]) {
            charCount[char] += 1;
        } else {
            charCount[char] = 1;
        }

        // charCount[char] = (charCount[char] || 0) + 1;
        if (charCount[char] > 1){
            duplicates.add(char);
        }
        return Array.from(duplicates)
        
}
}

function findDuplicateCharactersWithCount(str) {
  const charCount = {};
  const duplicates1 = {};

  for (let char1 of str) {
    // Optional: make it case-insensitive
    // char = char.toLowerCase();

    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let char1 of charCount) {
    if (charCount[char1] > 1) {
      duplicates[char1] = charCount[char1];
    }
  }

  return duplicates1;
}

//12. Count character in string
function countCharcaters(stringc){
    const charCounts = {};
    for (let char2 of stringc){
        charCounts[char2] = (charCounts[char2] || 0) + 1;
        
    }
    return charCounts;
}

//13. Array consists of integers and special  characters,sum only integers

function sumOnlyInt(mixedArray) {
    const sum = mixedArray.reduce((acc, val) => {
        return Number.isInteger(val) ? acc + val : acc;
    }, 0);
}


//14. 