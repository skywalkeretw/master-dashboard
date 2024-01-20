export function parseGoCode(code) {
    // Regular expression for Go function
    const regex = /func\s+(\w+)\s*\(([^)]*)\)\s*([^)]*)\s*{/;
    const match = code.match(regex);

    if (!match) {
        return null; // Return null if no match is found
    }

    const functionName = match[1]; // Function name
    const parameters = match[2]; // Parameters
    const returnType = match[3]; // Return type

    return {
        name: functionName,
        parameters: parseGoParameters(parameters),
        return: parseGoReturnType(returnType),
    };
}

function parseGoParameters(parametersString) {
    const result = {};

    // Split parametersString into individual parameters
    const parameters = parametersString.split(', ');

    // Process each parameter
    parameters.forEach((param) => {
        const [name, type] = param.split(' ').map((item) => item.trim());

        // Add the parameter to the result object
        result[name] = type;
    });

    return result;
}

function parseGoReturnType(returnTypeString) {
    // You can implement the parsing logic for Go return types here
    // This may involve handling complex types, arrays, structs, etc.

    // For simplicity, returning the raw returnTypeString in this example
    return returnTypeString;
}

const goCode = "func processData(data string, x struct{}) []struct{name string} { /* function body */ }";

console.log(parseGoCode(goCode));
