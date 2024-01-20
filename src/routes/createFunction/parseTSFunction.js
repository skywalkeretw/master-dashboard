export function parseTSCode(code){

    const regex = /function\s+(\w+)\s*\(([^)]*)\)\s*:\s*({[^}]+}|[^;{]+)\s*{/;
    const match = code.match(regex);

    const functionName = match[1];        // "processData"
    const parameters = match[2];          // "data: string, options: { enabled: boolean }"
    const parametersJSON = parseInputString(parameters);
    const returnType = match[3];           // "{ result: string, status: boolean }"
    const returnJSON = parseStringToObject2(returnType)
    return {
        name: functionName,
        parameters: parametersJSON,
        return: returnJSON
    }
}

function parseInputString(inputString) {
    const result = {};

    // Split inputString into key-value pairs
    const keyValuePairs = inputString.split(', ');

    // Process each key-value pair
    keyValuePairs.forEach((pair) => {
        const [key, value] = pair.split(':').map((item) => item.trim());
        
        // Convert value to a valid JSON format
        result[key] = isJSONString(value) ? JSON.parse(value) : value;
    });

    return result;
}

// Check if a string is a valid JSON format
function isJSONString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}


function parseStringToObject2(inputString) {
    try {
      // Remove spaces and curly braces from the input string
      const cleanedString = inputString.replace(/\s/g, '').replace(/[{}]/g, '');
  
      // Split the string into key-value pairs
      const pairs = cleanedString.split(',');
  
      // Initialize an empty object to store the key-value pairs
      const resultObject = {};
  
      // Iterate through each pair and extract key and value
      pairs.forEach(pair => {
        const [key, value] = pair.split(':');
  
        // Remove leading and trailing whitespaces from key and value
        const cleanKey = key.trim();
  
        // Remove unnecessary quotes from the value
        const cleanValue = value.trim().replace(/^["']|["']$/g, '');
  
        // Add the key-value pair to the result object
        resultObject[cleanKey] = cleanValue;
      });
  
      return resultObject;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return null; // Return null in case of an error
    }
  }

const inputString = "function processData(data: string, x: number): string { /* function body */ }";


console.log(parseTSCode(inputString))