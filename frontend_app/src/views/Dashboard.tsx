
import React from "react";
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const user = "Usuario";
  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.href = "/"; // redirige al login
  };

  return (
    <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Bienvenido, {user}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">Aquí puedes ver el resumen de tu sistema.</p>
          {/* Aquí puedes agregar cards, tablas, estadísticas, etc */}
        </div>
      </main>
  );
};

export default Dashboard;
