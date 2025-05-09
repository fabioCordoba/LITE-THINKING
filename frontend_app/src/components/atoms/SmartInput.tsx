import React, { useState } from 'react';

interface SmartInputProps {
  onSearch: (value: string) => void;
}

const SmartInput: React.FC<SmartInputProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <input
      className="border p-2 rounded w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Buscar productos con IA..."
    />
  );
};

export default SmartInput;