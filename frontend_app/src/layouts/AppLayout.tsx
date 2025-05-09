import { Link, Outlet } from 'react-router-dom'
const AuthLayout = () => {
  const user = "Usuario";
  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.href = "/"; // redirige al login
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Mi Panel</h1>
          <div className="space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600">
              Empresas
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Productos
            </Link>
            <Link to="/export" className="text-gray-700 hover:text-blue-600">
            Export
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
        <Outlet />
    </div>
    </>
  )
}

export default AuthLayout