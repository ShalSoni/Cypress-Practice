import cypress from "cypress";

//Method 1:
//function reverseString(str) {
    //return str.split('').reverse().join('');
  //}

  
//method 2:
function reverseString(str) {
    let reversed = '';
    len = str.length
   
    for (let i=len - 1; i >= 0; i--) {
        reversed = reversed + str[i]
    }
    return reversed
    
}
 
 const reversedStr = reverseString('Hello World!')
 console.log(reversedStr)

