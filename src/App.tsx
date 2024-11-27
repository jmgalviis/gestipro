import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Inicio/Dashboard.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";
import Usuarios from "./components/Usuarios/Usuarios.tsx";
import Unidades from "./components/Torres/Unidades.tsx";
import UnidadesPrivadas from "./components/UnidadesPrivadas/UnidadesPrivadas.tsx";
import Visitas from "./components/Visitas/Visitas.tsx";
import Zonas from "./components/ZonasComunes/Zonas.tsx";
import Reservas from "./components/ZonasComunes/Reservas.tsx";
import Seguros from "./components/Seguros/Seguros.tsx";
import Mantenimientos from "./components/Mantenimientos/Mantenimientos.tsx";
import Archivos from "./components/Archivos/Archivos.tsx";
import Asambleas from "./components/Asambleas/Asambleas.tsx";
import Pqrs from "./components/Pqrs/Pqrs.tsx";
import Carteras from "./components/Cartera/Carteras.tsx";
import CuotasAdministracion from "./components/CuotasAdministracion/CuotasAdministracion.tsx";
import Mensajes from "./components/Mensajes/Mensajes.tsx";
import Login from "./components/Login.tsx";
import LoginUno from "./components/LoginUno.tsx";

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login-uno" element={<LoginUno />} />
          <Route
              path="*"
              element={
                  <div className="flex h-screen bg-gray-100">
                      <Sidebar />
                      <div className="flex-1 flex flex-col overflow-hidden">
                          <Header />
                          <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/usuarios" element={<Usuarios />} />
                              <Route path="/unidades" element={<Unidades />} />
                              <Route path="/unidades-privadas" element={<UnidadesPrivadas />} />
                              <Route path="/visitas" element={<Visitas />} />
                              <Route path="/zonas" element={<Zonas />} />
                              <Route path="/reservas" element={<Reservas />} />
                              <Route path="/seguros" element={<Seguros />} />
                              <Route path="/mantenimientos" element={<Mantenimientos />} />
                              <Route path="/archivos" element={<Archivos />} />
                              <Route path="/asambleas" element={<Asambleas />} />
                              <Route path="/pqrs" element={<Pqrs />} />
                              <Route path="/carteras" element={<Carteras />} />
                              <Route path="/cuotas" element={<CuotasAdministracion />} />
                              <Route path="/mensajes" element={<Mensajes />} />
                          </Routes>
                      </div>
                  </div>
              }
          />
      </Routes>
  )
}

          export default App
