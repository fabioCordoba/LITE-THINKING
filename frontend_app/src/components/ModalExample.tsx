import React, { useState } from 'react';

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-normal bg-purple-200 text-purple-600"
      >
        Abrir Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Este es un modal</h2>
            <p className="mb-4">Contenido del modal aquí.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalExample;