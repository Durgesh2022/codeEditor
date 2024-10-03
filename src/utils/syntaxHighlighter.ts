export const highlightSyntax = (code: string, lang: string): string => {
    if (lang === 'JS' || lang === 'TS') {
      // Basic regex patterns for keywords, strings, comments, and numbers
      const patterns: { regex: RegExp; cssClass: string }[] = [
        { regex: /(\/\/.*$)/gm, cssClass: 'comment' }, // Single-line comments
        { regex: /\/\*[\s\S]*?\*\//g, cssClass: 'comment' }, // Multi-line comments
        { regex: /(".*?"|'.*?'|`.*?`)/g, cssClass: 'string' }, // Strings
        { regex: /\b(const|let|var|function|return|if|else|for|while|import|from|export|class|extends|constructor)\b/g, cssClass: 'keyword' }, // Keywords
        { regex: /\b(\d+)\b/g, cssClass: 'number' }, // Numbers
      ];
  
      // Escape HTML special characters
      let escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
  
      // Apply syntax highlighting
      patterns.forEach(pattern => {
        escapedCode = escapedCode.replace(pattern.regex, match => `<span class="${pattern.cssClass}">${match}</span>`);
      });
  
      // Handle new lines
      escapedCode = escapedCode.replace(/\n/g, '<br/>');
  
      return escapedCode;
    }
  
    return code;
  };
  