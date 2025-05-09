import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './views/auth/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './views/Dashboard'
import CompaniesList from './views/CompaniesList'
import AuthLayout from './layouts/AuthLayout'
import ProductsList from './views/ProductsList'
import ExportProductForm from './views/ExportProductForm'


function Router() {


    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/export" element={<ExportProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

export default Router




