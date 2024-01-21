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
        return retData
    }

    retData.name = match[1];        // "processData"

    const parameters = match[2];          // "data: string, options: { enabled: boolean }"
    if (parameters !== undefined) {
      retData.parameters = parseInputString(parameters, code);
  
    }
    const returnType = match[3];
    if (returnType !== undefined) {
      retData.return = parseReturnString(returnType, code)
    }
  
    return retData
}

function parseInputString(parametersString, code) {
    const result = {};

    // Split parametersString into individual parameters
    const parameters = parametersString.split(', ');

    // Process each parameter
    parameters.forEach((param) => {
        const [name, type] = param.split(' ').map((item) => item.trim());

        // Check if the type is a supported Go type
        const supportedTypes = ['int', 'string', 'bool', 'float32', 'float64'];
        if (supportedTypes.includes(type)) {
            result[name] = type;
        } else {
            // If not a supported type, check if it is a custom type
            const customTypeInfo = getGoTypeInformation(type, code);

            if (customTypeInfo) {
                // Remove leading and trailing whitespaces from the type values
                Object.keys(customTypeInfo).forEach(key => {
                    customTypeInfo[key] = customTypeInfo[key].trim();
                });

                result[name] = customTypeInfo;
            } else {
                // If not a custom type, add it as is
                result[name] = type;
            }
        }
    });

    return result;
}


function parseReturnString(returnTypeString, code) {
    // Supported Go types
    const supportedTypes = ['int', 'string', 'bool', 'float32', 'float64'];
  
    // Remove leading and trailing whitespaces
    returnTypeString = returnTypeString.trim();
  
    // Check if returnTypeString is a supported type
    if (supportedTypes.includes(returnTypeString)) {
      return returnTypeString;
    }
  
    // Check if returnTypeString is a named type
    const namedTypeRegex = /\b(\w+)\b/;
    const namedTypeMatch = returnTypeString.match(namedTypeRegex);
  
    if (namedTypeMatch) {
      const typeName = namedTypeMatch[1];
  
      // Call getGoTypeInformation for named types
      const typeInformation = getGoTypeInformation(typeName, code);
      return typeInformation
    //   if (typeInformation) {
    //     // Remove leading and trailing whitespaces from the type values
    //     // Object.keys(typeInformation).forEach(key => {
    //     //   typeInformation[key] = typeInformation[key].trim();
    //     // });
  
    //     return JSON.stringify(typeInformation, null, 2); // Pretty print JSON
    //   }
    }
  
    // If a struct is detected, parse and convert to JSON
    const structRegex = /struct\s*{([^}]*)}/;
    const structMatch = returnTypeString.match(structRegex);
  
    if (structMatch) {
      const structBody = structMatch[1].trim();
      const properties = structBody.split(/\s*,\s*/);
  
      const jsonObject = {};
      properties.forEach(property => {
        const [key, value] = property.split(/\s*:\s*/);
        // Remove leading and trailing whitespaces from the struct values
        jsonObject[key] = value.trim();
      });
  
      return JSON.stringify(jsonObject, null, 2); // Pretty print JSON
    }
  
    // Return the original returnTypeString if no struct or named type is detected
    return returnTypeString;
  }
  
  
  

  function getGoTypeInformation(typeName, goFileContent) {
    const structRegex = new RegExp(`type\\s+${typeName}\\s*struct\\s*{([^}]*)}`);
    const structMatch = goFileContent.match(structRegex);
  
    if (structMatch) {
      const structBody = structMatch[1].trim();
      const fieldRegex = /\b(\w+)\s+(\w+)\b/g;
  
      let match;
      const typeInfo = {};
  
      while ((match = fieldRegex.exec(structBody)) !== null) {
        const [, propertyName, propertyType] = match;
        typeInfo[propertyName] = propertyType;
      }
  
      return typeInfo;
    }
  
    return null; // Type not found
  }