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


const inputString = "function processData(data: string, x: number): {name: string, age: number} { /* function body */ }";

const regex = /function\s+(\w+)\s*\(([^)]*)\)\s*:\s*({[^}]+}|[^;{]+)\s*{/;
const match = inputString.match(regex);

// Extracting information from the match
const functionName = match[1];        // "processData"
const parameters = match[2];          // "data: string, options: { enabled: boolean }"
const returnType = match[3];           // "{ result: string, status: boolean }"

// console.log("Function Name:", functionName);
// console.log("Parameters:", parameters);
// let outputJson = parseInputString(parameters);
// console.log("Parameters JSON:", outputJson);

// console.log("Return Type:", returnType);

// ----->

function parseStringOrJSON(input) {
    if (!input || input.trim() === '') {
      return null; // Return null if the string is empty
    }
  
    // Replace single quotes with double quotes and ensure keys and values are quoted
    const sanitizedInput = input.replace(/'/g, '"').replace(/(\w+)(?=:)/g, '"$1"');
  
    // Attempt to parse as JSON
    try {
      const json = JSON.parse(sanitizedInput);
  
      // Check if the parsed JSON is an object
      if (json && typeof json === 'object') {
        return json;
      }
    } catch (e) {
      // If parsing as JSON fails, treat it as a string
      const trimmedInput = input.trim();
      const validTypes = ['string', 'number', 'boolean']; // Add more valid types as needed
  
      // Check if the string matches one of the specified types
      if (validTypes.includes(trimmedInput.toLowerCase())) {
        return trimmedInput;
      }
    }
  
    // Return null if the input doesn't match the specified conditions
    return null;
  }
  
  // Example usage:
  const input1 = 'number';
  const result1 = parseStringOrJSON(input1);
  console.log(result1); // Output: 'string'
  
  const input2 = '{ "key": "value" }';
  const result2 = parseStringOrJSON(input2);
  console.log(result2); // Output: { key: 'value' }
  
  const input3 = ''; // Empty string
  const result3 = parseStringOrJSON(input3);
  console.log(result3); // Output: null
  
  const input4 = "{ key: value }";
  const result4 = parseStringOrJSON(input4);
  console.log(result4); // Output: { key: 'value' }
  
// #####

function parseStringToObject(inputString) {
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
        const cleanValue = value.trim();
  
        // Add the key-value pair to the result object
        resultObject[cleanKey] = cleanValue;
      });
  
      return resultObject;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return null; // Return null in case of an error
    }
  }
  
  // Example usage:
  const input10 = '{ key: "value" }';
  const input20 = '{a: 123, b: "string"}';
  
  const result10 = parseStringToObject(input10);
  const result20 = parseStringToObject(input20);
  
  console.log(result10); // Output: { key: 'value' }
  console.log(result20); // Output: { a: '123', b: 'string' }
  

// asdf

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
  
  // Example usage:
  const input11 = '{ key: "value" }';
  const input21 = '{a: 123, b: "string"}';
  
  const result11 = parseStringToObject2(input11);
  const result21 = parseStringToObject2(input21);
  
  console.log(result11); // Output: { key: 'value' }
  console.log(result21); // Output: { a: '123', b: 'string' }
  