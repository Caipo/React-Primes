/* global BigInt */

export function getPrime(bits) {
    bits = BigInt(bits);
    let max = 2n ** bits;
    let min = 2n ** (bits - 1n);

    return new Promise((resolve) => {
        function checkPrime() {
            let test_number = getRandom(max, min);

            if (millarRabin(test_number)) {
                resolve(test_number.toString());
            } else {
                // Schedule the next check to run on the next tick of the event loop
                setTimeout(checkPrime, 0);
            }
        }
        // Start the first check
        checkPrime();
    });
}

// with the number of bits it returns a random odd number 
function getRandom(max, min){
    let random = BigInt(Math.floor(Math.random() * 100000000000));
    return( (random * (max -  min) - min) / 100000000000n);
}


//  a ^ b mod n without blowing up the BigInt
function modExp(a, b, n) {
  a = a % n;
  var result = 1n;
  var x = a;
  while(b > 0n){
    var leastSignificantBit = b % 2n;
    b = b / 2n;

    if (leastSignificantBit === 1n) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
}

// Our prime number tester 
function millarRabin(n){
    n = BigInt(n);
    let b = n - BigInt(1);
    let i = BigInt(0);

    while(b % 2n === BigInt(0)){
        ++i;
        b =  b / 2n;
    }

    for(let k = 0; k < 60; k++){
        let a = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 2)) + 2;
        a = BigInt(a)

        let x = modExp(a, b, n) 

        for(let s = 0; s < i; s++){
            let y =  modExp(x, 2n, n);

            if (y === 1n && x !== 1n && x !== n - 1n){
                return(false);
            }
            if(y !== 1n){
                return(false);
         }
            return(true);
    } //for k
}//func

}
