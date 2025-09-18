//An anagram check ensures both strings contain the same characters with the same frequency, ignoring case and spaces.
/// <reference types="cypress" />

describe('Code1', () => {

    it('Anagrams', () => {
        function areAnagrams(str1, str2) {
            // Normalize strings: lowercase, remove spaces
            const cleanStr1 = str1.toLowerCase().replace(/\s/g, '');
            const cleanStr2 = str2.toLowerCase().replace(/\s/g, '');
          
            // Quick length check
            if (cleanStr1.length !== cleanStr2.length) return false;
          
            // Sort characters and compare
            const sorted1 = cleanStr1.split('').sort().join('');
            const sorted2 = cleanStr2.split('').sort().join('');
          
            return sorted1 === sorted2;
          }
          
          // Test case
          const input1 = "anagram";
          const input2 = "nagaram";
          
          console.log(areAnagrams(input1, input2)); // Output: true
      })
    
    })