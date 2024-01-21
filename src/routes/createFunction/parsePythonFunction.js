export function parsePyCode(code) {
    const regex = /def\s+(\w+)\s*\(\s*([^)]*)\s*\)\s*->\s*({[^}]+}|[^:]+)?\s*:/;
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

function parseInputString(inputString) {
    const result = {};

    // Split inputString into key-value pairs
    const parametersList = inputString.split(', ');

    // Process each parameter
    parametersList.forEach((parameter) => {
        const [name, type] = parameter.split(':').map((item) => item.trim());

        // Convert Python type to a valid JSON format
        result[name] = parsePythonType(type);
    });

    return result;
}

function parseReturnString(returnType) {
    return parsePythonType(returnType);
}

function parsePythonType(typeString) {
    const cleanedType = typeString.replace(/\s/g, '');

    if (pythonTypes.includes(cleanedType)) {
        return cleanedType;
    }

    if (cleanedType.startsWith('List[') && cleanedType.endsWith(']')) {
        const innerType = cleanedType.substring(5, cleanedType.length - 1);
        return [parsePythonType(innerType)];
    }

    // Handle other complex types as needed

    return cleanedType; // Assuming it's a simple type if not recognized
}


const pythonTypes = [
    'int',
    'float',
    'str',
    'bool',
    'List[int]',
    'List[float]',
    'List[str]',
    'List[bool]',
    // # Add other Python types as needed
];