export const formatCode = (code: string, lang: string): string => {
    if (lang === 'JS' || lang === 'TS') {
      const lines = code.split('\n');
      let indentLevel = 0;
      let inMultiLineComment = false;
  
      const formattedLines = lines.map(line => {
        let trimmedLine = line.trim();
  
        // Handle multi-line comments
        if (/^\/\*/.test(trimmedLine)) {
          inMultiLineComment = true;
        }
        if (/\*\//.test(trimmedLine)) {
          inMultiLineComment = false;
        }
  
        // Check for closing braces, decrease indent
        if (!inMultiLineComment && /^}/.test(trimmedLine)) {
          indentLevel = Math.max(indentLevel - 1, 0);
        }
  
        const indent = '  '.repeat(indentLevel);
  
        // Check for opening braces, increase indent
        if (!inMultiLineComment && /\{$/.test(trimmedLine)) {
          indentLevel += 1;
        }
  
        // Ensure spacing after keywords (like `if`, `for`)
        const keywordSpacing = trimmedLine.replace(/(if|for|while|switch|catch)\(/g, '$1 (');
  
        return indent + keywordSpacing;
      });
  
      return formattedLines.join('\n');
    }
  
    return code;
  };
  