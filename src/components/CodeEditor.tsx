// src/components/CodeEditor.tsx
import React, { useEffect, useRef, useState } from 'react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
}

const highlightSyntax = (code: string, language: string): string => {
  // Basic regex-based syntax highlighting (extend as needed)
  let highlightedCode = code
    .replace(/(\/\/[^\n]*)/g, '<span class=comment>$1</span>') // Single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '<span class=comment>$&</span>') // Multi-line comments
    .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '<span class=string>$1</span>') // Strings
    .replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|import|from|export)\b/g, '<span class=keyword>$1</span>') // Keywords
    .replace(/\b(\d+)\b/g, '<span class="number">$1</span>'); // Numbers

  return highlightedCode;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, language }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHighlightedCode(highlightSyntax(code, language));
  }, [code, language]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    onCodeChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '  ');
    }
  };

  return (
    <div
      contentEditable
      className="w-full h-96 p-4 border border-gray-300 bg-gray-900 text-white font-mono whitespace-pre overflow-auto"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      ref={codeRef}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeEditor;
