/* global BigInt */

export async function getPrime(bits){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let test_number = getRandom(bits);
            // Loop that breaks if rabin says a number is prime
            while(! millarRabin(test_number)){
                test_number = getRandom(bits);
            }
            resolve(test_number.toString());
        }, 0);
    });
}
// with the number of bits it returns a random odd number 
function getRandom(bits){
    let bitShift = BigInt(Math.round(Math.random() * 1));
    bits = BigInt(bits);
    let d = Math.floor(Math.random() * 200);
    d = BigInt(d);
    return((BigInt(2) ** (bits - bitShift)) * d - BigInt(1));
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
