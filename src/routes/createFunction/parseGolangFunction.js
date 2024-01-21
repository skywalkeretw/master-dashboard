export function parseGoCode(code) {
    // Regular expression for Go function
    const regex = /func\s+(\w+)\s*\(([^)]*)\)\s*([^)]*)\s*{\s*/;
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

function parseInputString(parametersString) {
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

function parseReturnString(returnTypeString) {
    const structRegex = /struct\s*{([^}]*)}/;
    const structMatch = returnTypeString.match(structRegex);

    if (structMatch) {
        // If a struct is detected, parse and convert to JSON
        const structBody = structMatch[1].trim();
        const properties = structBody.split(/\s*,\s*/);

        const jsonObject = {};
        properties.forEach(property => {
            const [key, value] = property.split(/\s*:\s*/);
            jsonObject[key] = value;
        });

        return JSON.stringify(jsonObject, null, 2); // Pretty print JSON
    }

    // Return the original returnTypeString if no struct is detected
    return returnTypeString;
}

function getGoTypeInformation(typeName, goFileContent) {
    const typeRegex = new RegExp(`type\\s+${typeName}\\s*struct\\s*{([^}]*)}`);
    const typeMatch = goFileContent.match(typeRegex);
  
    if (typeMatch) {
      const typeBody = typeMatch[1].trim();
      const properties = typeBody.split(/\s*;\s*/);
  
      const typeInfo = {};
      properties.forEach(property => {
        const [propertyName, propertyType] = property.split(/\s*:\s*/);
        typeInfo[propertyName] = propertyType;
      });
  
      return typeInfo;
    }
  
    return null; // Type not found
  }

// const goCode = "func processData(data string, x struct{}) []struct{name string} { /* function body */ }";

// console.log(parseGoCode(goCode));
