// src/components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC<{ files: string[]; onDelete: (file: string) => void }> = ({
  files,
  onDelete,
}) => {
  return (
    <div className="bg-gray-200 p-4 w-1/4">
      <h2 className="text-lg font-bold">Files</h2>
      <ul className="mt-2">
        {files.map((file) => (
          <li key={file} className="flex justify-between py-1">
            {file}
            <button
              onClick={() => onDelete(file)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
