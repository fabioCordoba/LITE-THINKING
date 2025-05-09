import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from '../environments/environments';
import SmartInput from '../components/atoms/SmartInput';
import ModalExample from '../components/ModalExample';
import ModalCreateProdct from '../components/atoms/ModalCreateProdct';

type Currency = 'COP' | 'USD' | 'EUR';
type Prices = {
  [key in Currency]?: number;
};

interface Product {
  code: string;
  name: string;
  characteristics: string;
  prices: Prices;
  company: string;
}

const ProductsList: React.FC = () => {
  const baseUrl = environment.baseUrl;
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState<Product[]>(products);

  const displayedProducts = filtered.length > 0 ? filtered : products;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
  }, []);

  const fetchCompanies = async () => {
    const res = await fetch(`${baseUrl}/api/companies/`);
    const data = await res.json();
    setCompanies(data);
  };

  const fetchProducts = async () => {
    const res = await fetch(`${baseUrl}/api/products/`);
    const data = await res.json();
    setProducts(data);
  };

  const handleCompanyChange = async (companyNIT: any) => {
    setSelectedCompany(companyNIT);
    const res = await fetch(`${baseUrl}/api/companies/${companyNIT}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const handleSearch = (query: string) => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(result);
    
    setFiltered(result);
  };

  const filteredProducts = selectedCompany
  ? products.filter(p => p.company === selectedCompany)
  : products;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
      <select
        value={selectedCompany}
        onChange={(e) => handleCompanyChange(e.target.value)}
        className="border rounded p-2 mb-4"
        >
        <option value="">Seleccione una empresa</option>
        {companies.map(company => (
            <option key={company.nit} value={company.nit}>
            {company.name}
            </option>
        ))}
        </select>

        <SmartInput onSearch={handleSearch} />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Código</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Características</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Precios</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Empresa</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              <ModalCreateProdct />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedProducts.map(product => (
              <tr key={product.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{product.code}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{product.characteristics}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {Object.entries(product.prices || {}).map(([currency, price]) => (
                    <div key={currency}>
                      {currency}: {formatPrice(price)}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{companies.find(c => c.nit === product.company)?.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                <div className="flex item-center justify-center ">
                        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </button>
                        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;