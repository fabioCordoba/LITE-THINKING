
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environments/environments";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const baseUrl = environment.baseUrl;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí va tu lógica de autenticación
    const success = await loginUser(email, password);

    if (success) {
      // Redirigir al dashboard
      navigate("/dashboard");
    } else {
      alert("Login fallido");
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();

      // Guardar token o cualquier otro dato si hace falta
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      return true;
    } catch (error) {
      console.error("Error en login", error);
      return false;
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-2xl shadow-md space-y-6"
        >
        <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar sesión</h2>

        <div>
            <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
            Iniciar sesión
        </button>
        </form>
  );
};

export default Login;