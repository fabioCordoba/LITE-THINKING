import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompaniesList: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://lite-thinking.fabiocordoba.me/api/companies/')
      .then(response => setCompanies(response.data))
      .catch(error => console.error("Error fetching companies", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Empresas Registradas</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">NIT</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Dirección</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Teléfono</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                <button className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-normal bg-purple-200 text-purple-600"
                    >
                    Agregar
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map(company => (
              <tr key={company.nit} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{company.nit}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{company.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{company.address}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{company.phone}</td>
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

export default CompaniesList;