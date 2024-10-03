// src/components/LanguageSelector.tsx
import React from 'react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'JS', name: 'Javascript' },
  { code: 'TS', name: 'Typescript' },
];

const LanguageSelector: React.FC<{ selectedLang: string; onSelect: (code: string) => void }> = ({
  selectedLang,
  onSelect,
}) => {
  return (
    <select value={selectedLang} onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
