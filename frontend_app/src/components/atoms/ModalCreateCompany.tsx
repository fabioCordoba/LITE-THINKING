import axios from 'axios';
import React, { useState } from 'react';
import { environment } from '../../environments/environments';

const ModalCreateCompany = () => {
  const baseUrl = environment.baseUrl;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    nit: '',
    name: '',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = JSON.stringify(form);
    const token = localStorage.getItem("access");

    console.log(token);

    try {
      const response = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/companies/`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        data,
      });

      if (response.status === 201 || response.status === 200) {
        alert('Empresa creada correctamente');
        setForm({ nit: '', name: '', address: '', phone: '' });
      }
    } catch (error) {
      console.error('Error al crear empresa', error);
      alert('Error al crear empresa');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-normal bg-purple-200 text-purple-600"
      >
        create
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
            <h2 className="text-lg font-semibold mb-4">Crear empresa</h2>
                <input
                    type="text"
                    name="nit"
                    placeholder="NIT"
                    value={form.nit}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Nombre de la empresa"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Crear Empresa
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                    Cerrar
                </button>
                </form>
            
        
            
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreateCompany;