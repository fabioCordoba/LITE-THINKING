import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { environment } from '../../environments/environments';

const ModalCreateProdct = () => {
  const baseUrl = environment.baseUrl;
  const [isOpen, setIsOpen] = useState(false);
  const [companies, setCompanies] = useState<{ nit: string; name: string }[]>([]);
  const [form, setForm] = useState({
    name: '',
    characteristics: '',
    prices: {
        USD: '',
        EUR: '',
        COP: ''
      },
    company: ''
  });

  useEffect(() => {
    fetch(`${baseUrl}/api/companies/`)
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      prices: {
        ...prevForm.prices,
        [name]: Number(value)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = JSON.stringify(form);
    const token = localStorage.getItem("access");

    try {
      const response = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/products/`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        data,
      });

      if (response.status === 201 || response.status === 200) {
        alert('Empresa creada correctamente');
        setForm({ name: '', characteristics: '', prices: '', company: '' });
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
          <div className="bg-white p-6 rounded shadow-lg w-120">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
            <h2 className="text-lg font-semibold mb-4">Crear Producto</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="characteristics"
                    placeholder="Caracteristicas"
                    value={form.characteristics}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <div className="grid grid-cols-3 gap-4">
                <input
                    type="number"
                    name="USD"
                    placeholder="Precio en USD"
                    value={form.prices.USD}
                    onChange={(e) => handlePriceChange(e)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    name="EUR"
                    placeholder="Precio en EUR"
                    value={form.prices.EUR}
                    onChange={(e) => handlePriceChange(e)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    name="COP"
                    placeholder="Precio en COP"
                    value={form.prices.COP}
                    onChange={(e) => handlePriceChange(e)}
                    className="w-full border px-3 py-2 rounded"
                />
                </div>

                <select
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    >
                    <option value="">Seleccione una empresa</option>
                    {companies.map((comp) => (
                        <option key={comp.nit} value={comp.nit}>
                        {comp.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Crear Producto
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

export default ModalCreateProdct;