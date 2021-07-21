//Reid Watson 7/20/2021 COMP 3270

//Initialize 19 blank arrays
let A1=[], A2 = [], A3=[], A4=[], A5=[], A6=[], A7=[], A8=[], A9=[], A10=[], A11=[], A12=[], A13=[], A14=[], A15=[], A16=[], A17=[], A18=[], A19=[];

//Initialize a two-dimensional matrix with 19 rows and 8 columns, to hold the resulting data and create the output txt file.
let matrix = new Array(19).fill(0).map(() => new Array(8).fill(0));

//Define the number of trials to run when testing the time of each algorithm.
const numberOfTrials = 10000;

//Get the file input from the DOM to be used in other functions, and access whatever file the user uploads.
let fileInput = document.getElementById("fileInput");

//Click listener for the button that says 'Run with Input File'
//This collects the file currently uploaded to the HTML input element, creates an array of integers from it,
//and runs the 4 algorithms on the array, logging the result to the console and also displaying it on the page.
//I figured out how to use the JS FileReader by looking at https://javascript.info/file
document.getElementById("run").onclick = () => {

    //Get the file from fileInput
    let file = fileInput.files[0];

    //Initialize a new filereader
    let reader = new FileReader();

    //Read the file as text
    reader.readAsText(file);

    //Once the file reader loads, run this function
    reader.onload = () => {
        
        //Create an array from reading the file with a comma delimited
        let parsedArray = reader.result.split(",");
        //Initialize a new array to hold the int values, since the above line reads them in as strings.
        let intArray = [];
        //For each element in the parsed array, parse the element as an int and add it to the intArray
        parsedArray.forEach((element, index) => {
            intArray[index] = parseInt(element);
        });

        //Build a string containing the output of the 4 algorithms over the whole array.
        let output = "algorithm-1: " + Algorithm1(intArray, 0, intArray.length-1)
                        + "; algorithm-2: " + Algorithm2(intArray, 0, intArray.length-1)
                        + "; algorithm-3: " + MaxSum(intArray, 0, intArray.length-1)
                        + "; algorithm-4: " + Algorithm4(intArray, 0, intArray.length-1)

        //Write the string to the web browser console.
        console.log(output);

        //Display the string on the page in an empty HTML <p> tag, so you don't have to look in the console.
        document.getElementById("fileRunOutput").innerHTML = output;
    };
  
}

//Click listener that clears the value of any files currently uploaded in the input tag.
//Also clears out any resulting text generated from clicking the green button that says 'Run with Random Ints'
document.getElementById("clear").onclick = () => {
    fileInput.value = '';
    document.getElementById("fileRunOutput").innerHTML = '';
}

//Generates random integers for all available elements in the 19 Arrays of variable length.
function generateNumbers() {
    //Define min and max values of typical Int32 range
    const min = -2147483647;
    const max = 2147483647;

    //Loop through numbers 10-100, incrementing by 5
    for (var i = 10; i <=100; i = i+5) {

        //Figure out which array to target, by dividing by 5 and subtracting 1 from the loop variable. e.g. i=10 => 10/5=2, 2-1=1, so Array 1
        let targetArray = (Math.round(i/5))-1;

        //Loop from 0 to the array length-1 to fill out all elements in the array.
        for (var a = 0; a < i; a++) {

            //Create a random integer using the range specified above.
            let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

            //Switch on the calculated target array, to target the correct array.
            switch (targetArray) {
                //Set the specified index on the specified array to the random int. 
                case 1:
                    A1[a] = randomInt;
                    break;
                case 2:
                    A2[a] = randomInt;
                    break;
                case 3:
                    A3[a] = randomInt;
                    break;
                case 4:
                    A4[a] = randomInt;
                    break;
                case 5:
                    A5[a] = randomInt;
                    break;
                case 6:
                    A6[a] = randomInt;
                    break;
                case 7:
                    A7[a] = randomInt;
                    break;
                case 8:
                    A8[a] = randomInt;
                    break;
                case 9:
                    A9[a] = randomInt;
                    break;
                case 10:
                    A10[a] = randomInt;
                    break;
                case 11:
                    A11[a] = randomInt;
                    break;
                case 12:
                    A12[a] = randomInt;
                    break;
                case 13:
                    A13[a] = randomInt;
                    break;
                case 14:
                    A14[a] = randomInt;
                    break;
                case 15:
                    A15[a] = randomInt;
                    break;
                case 16:
                    A16[a] = randomInt;
                    break;
                case 17:
                    A17[a] = randomInt;
                    break;
                case 18:
                    A18[a] = randomInt;
                    break;
                case 19:
                    A19[a] = randomInt;
                    break;
            }
        }
    }
}

//Get the estimated complexity based on the ceiling of the calculated time complexity for each algorithm.
//param index: 1,2,3, or 4. Specifies which algorithm's time complexity to use.
//param n: input value representing the length of the array to calculate an estimated time for.
function getEstimatedComplexity(index, n) {
    switch (index) {
        case 1:
            return Math.round((n**3)/1000);
        case 2:
            return Math.round(((n**2)*(Math.log(n)))/1000);
        case 3:
            return Math.round((n**2)/1000);
        case 4:
            return Math.round(Math.log(n)/1000);
    }
}

//Runs the trials and tracks the time it takes to run each algorithm, placing the result in the matrix.
//param array: the input array to run the algorithms with.
//param arrayIndex: The numeric index of the array, used to fill out the matrix in the correct location.
//I initially was using 'Date.now()' to get the current timestamp, but changed to 'performance.now()'
//after consulting https://stackoverflow.com/questions/30795525/performance-now-vs-date-now
function doTrials(array, arrayIndex) {

    //Test algorithm 1
    var startTime1 = performance.now();//Get current timestamp before running
    for (var a = 0; a < numberOfTrials; a++) {//Peform execution based on numberOfTrials
        Algorithm1(array, 0, array.length-1);//Run Algorithm 1 on input array, for all elements
    }
    var endTime1 = performance.now();//Get timestamp after running
    matrix[arrayIndex-1][0] = Math.round(endTime1 - startTime1);//Insert running time (ms) at the array index's row in column 1
    matrix[arrayIndex-1][4] = getEstimatedComplexity(1, array.length);//Insert the estimated time in column 5


    //Test algorithm 2
    var startTime2 = performance.now();
    for (var a = 0; a < numberOfTrials; a++) {
        Algorithm2(array, 0, array.length-1);
    }
    var endTime2 = performance.now();
    matrix[arrayIndex-1][1] = Math.round(endTime2 - startTime2);//Insert running time (ms) at the array index's row in column 2
    matrix[arrayIndex-1][5] = getEstimatedComplexity(2, array.length);//Insert the estimated time in column 6


    //Test algorithm 3
    var startTime3 = performance.now();
    for (var a = 0; a < numberOfTrials; a++) {
        MaxSum(array, 0, array.length-1);
    }
    var endTime3 = performance.now();
    matrix[arrayIndex-1][2] = Math.round(endTime3 - startTime3);//Insert running time (ms) at the array index's row in column 3
    matrix[arrayIndex-1][6] = getEstimatedComplexity(3, array.length);//Insert the estimated time in column 7


    //Test algorithm 4
    var startTime4 = performance.now();
    for (var a = 0; a < numberOfTrials; a++) {
        Algorithm4(array, 0, array.length-1);
    }
    var endTime4 = performance.now();
    matrix[arrayIndex-1][3] = Math.round(endTime4 - startTime4);//Insert running time (ms) at the array index's row in column 4
    matrix[arrayIndex-1][7] = getEstimatedComplexity(4, array.length);//Insert the estimated time in column 8
}

//Click listener for the 'Run with Random Ints' array.
//Generates random numbers, then runs trials on each array.
//This listener generates the resulting matrix and downloads the file in the user's web browser.
document.getElementById("runOnArrays").onclick = () => {

    //Call a function to generate the random ints in Array 1-19.
    generateNumbers();

    //Loop through an index 1 to 19, running the algorithm trials one at a time based on the index array, to hit all arrays.
    for (var i = 1; i <= 19; i++) {
        switch (i) {
            //Send in the appropriate input array, along with its index to be used in creating the matrix.
            case 1:
                doTrials(A1, i);
                break;
            case 2:
                doTrials(A2, i);
                break;
            case 3:
                doTrials(A3, i);
                break;
            case 4:
                doTrials(A4, i);
                break;
            case 5:
                doTrials(A5, i);
                break;
            case 6:
                doTrials(A6, i);
                break;
            case 7:
                doTrials(A7, i);
                break;
            case 8:
                doTrials(A8, i);
                break;
            case 9:
                doTrials(A9, i);
                break;
            case 10:
                doTrials(A10, i);
                break;
            case 11:
                doTrials(A11, i);
                break;
            case 12:
                doTrials(A12, i);
                break;
            case 13:
                doTrials(A13, i);
                break;
            case 14:
                doTrials(A14, i);
                break;
            case 15:
                doTrials(A15, i);
                break;
            case 16:
                doTrials(A16, i);
                break;
            case 17:
                doTrials(A17, i);
                break;
            case 18:
                doTrials(A18, i);
                break;
            case 19:
                doTrials(A19, i);
                break;
        }
    }


    //Create the file to be downloaded, reidwatson_phw_output.txt.
    //The '\ufeff' is a non-character space that is required for the file to open correctly in excel, because of 
    //encoding issues that come when writing to a .txt file, encoded as a .csv file, from js to excel.

    //I figured out how to do this by referencing
    //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
    //and https://stackoverflow.com/questions/18249290/generate-csv-for-excel-via-javascript-with-unicode-characters

    //Encode the file as a text csv file
    let csvContent = "data:text/csv;charset=utf-8," + "\ufeff";

    //Prepend the line of headers to the csv file.
    csvContent += "algorithm-1,algorithm-2,algorithm-3,algorithm-4,T1(n),T2(n),T3(n),T4(n)\n";

    //For each element in the two-dimensional matrix, create a string of all array contents 
    //separated by a comma delimiter, then append a newline before going to the next iteration.
    csvContent += matrix.map(e => e.join(",")).join("\n");

    //Create a hidden HTML anchor tag, append it to the DOM, then click it to get the effect of downloading a file
    //Without the user having to do anything themselves.
    let encodedUri = encodeURI(csvContent);//Encode the csv content as a Universal Resource Identifier.
    let link = document.createElement("a");//Dynamically create an anchor tag.
    link.setAttribute("href", encodedUri);//Define the Hypertext Reference to the encoved csv file.
    link.setAttribute("download", "reidwatson_phw_output.txt");//give the file a name with a .txt extension, to adhere to project specifications.
    document.body.appendChild(link);//Append anchor tag to the HTML page
    link.click();//simulate a click on the anchor tag
}

////////////////////////////////////////////////////////////////////////////////////
//                            Algorithm Implementation                            //
////////////////////////////////////////////////////////////////////////////////////

function Algorithm1(X, P, Q) {
    let maxSoFar = 0;
    for (var L = P; L <= Q; L++) {
        for (var U = L; U <= Q; U++) {
            var sum = 0;
            for (var I = L; I <= U; I++) {
                sum = sum + X[I];
            }
            maxSoFar = Math.max(maxSoFar, sum);
        }
    }
    return maxSoFar;
}

function Algorithm2(X, P, Q) {
    let maxSoFar = 0;
    for (var L = P; L <= Q; L++) {
        var sum = 0;
        for (var U = L; U <= Q; U++) {
            sum = sum + X[U];
            maxSoFar = Math.max(maxSoFar, sum);
        }
    }
    return maxSoFar;
}

//Algorithm3
function MaxSum(X, L, U) {
    if (L > U) {
        return 0;
    }
    if (L === U) {
        return Math.max(0, X[L]);
    }
    var M = ~~((L + U) / 2);

    //Find the max crossing to left
    var sum = 0, maxToLeft = 0;
    for (var I = M; I >= L; I--) {
        sum = sum + X[I];
        maxToLeft = Math.max(maxToLeft, sum);
    }

    //Find the max crossing to right
    sum = 0;
    var maxToRight = 0;
    for (var I = M+1; I <= U; I++) {
        sum = sum + X[I];
        maxToRight = Math.max(maxToRight, sum);
    }

    var maxCrossing = maxToLeft + maxToRight;

    var maxInA = MaxSum(X,L,M);
    var maxInB = MaxSum(X,M+1,U);

    return Math.max(maxCrossing, maxInA, maxInB);
}

function Algorithm4(X, P, Q) {
    var maxSoFar = 0, maxEndingHere = 0;
    for (var I = P; I <= Q; I++) {
        maxEndingHere = Math.max(0, maxEndingHere + X[I]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}