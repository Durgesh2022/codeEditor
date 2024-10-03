// src/App.tsx
import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import Sidebar from './components/Sidebar';
import  {formatCode}  from './utils/formatter';
import useLocalStorage from './hooks/useLocalStorage';


const App: React.FC = () => {
  const [language, setLanguage] = useState('JS');
  const [code, setCode] = useState('');
  const [files, setFiles] = useLocalStorage<string[]>('files', []);
  const [notifications, setNotifications] = useState<string | null>(null);

  const saveCode = () => {
    const fileName = prompt('Enter file name:');
    if (fileName && !files.includes(fileName)) {
      const fileData = {
        langCode: language,
        code: btoa(code), // Encode the code to base64
        lines: code.split('\n').length,
        size: `${(new Blob([code]).size / 1024).toFixed(2)}kb`,
      };
      setFiles([...files, fileName]);
      alert(`Saved: ${JSON.stringify(fileData)}`);
      setNotifications(`File "${fileName}" saved successfully!`);
    } else {
      setNotifications('File name already exists or was not provided.');
    }
  };

  const deleteFile = (file: string) => {
    setFiles(files.filter((f) => f !== file));
    setNotifications(`File "${file}" deleted successfully!`);
  };

  const handleFormatCode = () => {
    setCode(formatCode(code, language));
  };

  // Handle saving with CTRL + S
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent default save action
        saveCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, language, files]);

  return (
    <div className="flex h-screen">
      <Sidebar files={files} onDelete={deleteFile} />
      <div className="flex-1 p-4">
        <LanguageSelector selectedLang={language} onSelect={setLanguage} />
        <button onClick={saveCode} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button onClick={handleFormatCode} className="ml-2 p-2 bg-green-500 text-white rounded">
          Format
        </button>
        <CodeEditor code={code} onCodeChange={setCode} language={language} />
        {notifications && (
          <div className="mt-2 p-2 bg-green-200 text-green-800 rounded">{notifications}</div>
        )}
      </div>
    </div>
  );
};

export default App;
