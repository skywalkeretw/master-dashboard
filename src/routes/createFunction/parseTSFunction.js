export function parseTSCode(code){
  const regex = /function\s+(\w+)\s*\(\s*([^)]*)\s*\)\s*(?::\s*({[^}]+}|[^;{]+)\s*)?\s*{/;
  const match = code.match(regex);

  let retData = {
    name: "",
    parameters: {},
    return: {}
  }

  if (match === null){
    console.log("Regex failed ")
    return retData
  }

  retData.name = match[1];        // "processData"

  const parameters = match[2];          // "data: string, options: { enabled: boolean }"
  if (parameters !== undefined) {
    retData.parameters = parseInputString(parameters);

  }
  const returnType = match[3];           // "{ result: string, status: boolean }"
  console.log(returnType)
  if (returnType !== undefined) {
    retData.return = parseReturnString(returnType)
  }

  console.log(retData)
  return retData
}

const typescriptTypes = [
    'number',
    'string',
    'boolean',
    'number[]',
    'string[]',
    'boolean[]',
    // 'null',
    // 'undefined',
    // 'void',
    // 'object',
    // '{} (object literal)',
    // 'Array<T>',
    // '[T, U, ...rest]',
    // '(parameter: type) => returnType',
    // 'enum',
    // 'type MyType = T1 | T2',
    // 'type CombinedType = T1 & T2',
    // 'type MyGeneric<T> = SomeType<T>',
    // 'type MyConditionalType<T> = T extends U ? X : Y',
    // 'type MyMappedType<T> = { [K in keyof T]: SomeType }',
    // 'type MyLiteralType = \'value1\' | \'value2\'',
    // 'Partial<T>',
    // 'Readonly<T>',
    // 'Record<K, T>',
    // 'Pick<T, K>',
    // 'Omit<T, K>',
    // 'ReturnType<T>',
    // 'Parameters<T>',
  ];

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


function parseReturnString(inputString) {
    try {
      // Remove spaces and curly braces from the input string
      const cleanedString = inputString.replace(/\s/g, '').replace(/[{}]/g, '');

      if (cleanedString === ''){
        return "empty"
      }

      // If the input is a standalone type, return it directly
      if (typescriptTypes.includes(cleanedString.toLowerCase())) {
        return cleanedString;
      }
  
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
  
        // Check if the value is a string and a valid type
        if (cleanValue === '') {
          resultObject[cleanKey] = "empty";
        // } else if (isNaN(cleanValue) && !validTypes.includes(cleanValue.toLowerCase())) {
        //   resultObject[cleanKey] = { error: 'Invalid type' };
        } else {
          // Add the key-value pair to the result object
          resultObject[cleanKey] = isNaN(cleanValue) ? cleanValue : "empty";
        }
      });
  
      return resultObject;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return "empty"; // Return null in case of an error
    }
  }

// const inputString = "some other code function processData(data: string, x: {}}): {name: string}[] { /* function body */ }";


// console.log(parseTSCode(inputString))