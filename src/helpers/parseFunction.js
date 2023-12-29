function parseFunction(code, language) {
    let functionRegex, paramRegex, returnTypeIndex;
  
    if (language === 'go') {
      functionRegex = /func\s+(\w+)\(([^)]*)\)\s+([^{}]+)\s*{/;
      paramRegex = /\s*(\w+)\s+(\w+)/g;
      returnTypeIndex = 3;
    } else if (language === 'python') {
      functionRegex = /def\s+(\w+)\(([^)]*)\)\s*:/;
      paramRegex = /\s*(\w+)(?:\s*:\s*(\w+))?/g;
      returnTypeIndex = null; // Python doesn't explicitly specify return type
    } else if (language === 'nodejs') {
      functionRegex = /function\s+(\w+)\(([^)]*)\)\s*{/;
      //paramRegex = /\s*(\w+)\s*:\s*(\w+)/g;
      paramRegex = /\s*(\w+)(?:\s*:\s*(\w+))?/g;
      returnTypeIndex = null; // JavaScript doesn't explicitly specify return type
    } else {
      throw new Error('Unsupported language');
    }
  
    const match = code.match(functionRegex);
  
    if (!match) {
      throw new Error(`Invalid ${language} function syntax`);
    }
  
    const functionName = match[1];
    const paramsString = match[2].trim();
    const returnType = returnTypeIndex ? match[returnTypeIndex]?.trim() : null;
  
    const params = {};
    let paramMatch;
    while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
      const paramName = paramMatch[1];
      const paramType = paramMatch[2] || 'any';
      params[paramName] = paramType;
    }
  
    return {
      name: functionName,
      params: params,
      ret: returnType || 'any',
    };
  }
  

  export default parseFunction;