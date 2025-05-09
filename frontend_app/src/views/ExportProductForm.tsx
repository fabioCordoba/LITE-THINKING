import { useState, useEffect } from 'react';
import { environment } from '../environments/environments';

export default function ExportProductForm() {
  const baseUrl = environment.baseUrl;
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/companies/')
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  const handleDownload = async (e:any) => {
    e.preventDefault();

    let endpoint = `${baseUrl}/api/companies/export`;
    if (selectedCompany) {
      endpoint = `${baseUrl}/api/companies/${selectedCompany}/export-products-pdf/`;
    }

    if (email) {
      const res = await fetch(`${baseUrl}/api/companies/send-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          nit: selectedCompany || null
        }),
      });
  
      if (res.ok) {
        alert('PDF enviado por correo');
      } else {
        alert('Error al enviar el PDF por correo');
      }
    }

    const res = await fetch(endpoint);
    if (!res.ok) {
      alert('Hubo un error al generar el PDF');
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">

      <form onSubmit={handleDownload} className="max-w-md mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Exportar productos</h2>

        <label className="block mb-2 font-semibold">Empresa</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="">Todas las empresas</option>
          {companies.map((company) => (
            <option key={company.nit} value={company.nit}>
              {company.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Correo electrónico</label>
        <span className='text-xs'>Agrega tu Email si deseas que se te envie adicionalmente el Reporte</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Descargar PDF
        </button>
      </form>
    </div>
  );
}