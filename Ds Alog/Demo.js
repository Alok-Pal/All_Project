//  Checking sum zero
// [-5, -4, -3, -2 , 0 , 2, 4, 6, 8]

function sumZero(arr) {

    const arry = arr;
    for (let i = 0; i < arry.length; i++) {

        for (let j = 0; j < arry.length; j++) {

            if (arry[i] + arry[j + 1] == 0) {
                
                return [arry[i], arry[j+1]]
            }

        }
    }

}

let given = [-5, -4, -3, -2 , 0 , 2, 4, 6, 8]

console.log(sumZero(given))

