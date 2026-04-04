import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logomazo.png';

// Interfaz para los leads simulados
interface Lead {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  ciclo: string;
  mensaje: string;
  fecha: string;
}

// Datos de prueba (mock data)
const mockLeads: Lead[] = [
  {
    id: 1,
    nombre: 'Ana María',
    apellidos: 'García López',
    email: 'ana.garcia@ejemplo.com',
    ciclo: 'DAM',
    mensaje: 'Quisiera saber los horarios de mañana.',
    fecha: '02/04/2026',
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellidos: 'Rodríguez',
    email: 'carlos.rod@mail.com',
    ciclo: 'SMR',
    mensaje: '¿Tienen becas disponibles?',
    fecha: '03/04/2026',
  },
  {
    id: 3,
    nombre: 'Lucía',
    apellidos: 'Fernández',
    email: 'lucia.f@ejemplo.es',
    ciclo: 'FPB Administración',
    mensaje: '',
    fecha: '03/04/2026',
  },
];

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtenemos los datos del usuario desde el estado o el localStorage
  const userState = location.state?.user;
  const localUserStr = localStorage.getItem('adminUser');
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  
  const user = userState || localUser || {};
  const username = user.username || 'Administrador';
  const profileImg = user.profile_img;

  const handleLogout = () => {
    // Limpiar tokens de sesión
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Superior del Panel */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-9 h-9 rounded-full" />
            <span className="font-bold text-gray-800 tracking-wide hidden sm:block">Panel de Gestión - Mazo</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {profileImg ? (
                <img src={profileImg} alt={username} className="w-10 h-10 rounded-full object-cover border-2 border-fp-primary/30 shadow-sm" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-fp-primary/10 text-fp-primary flex items-center justify-center font-bold border-2 border-fp-primary/30 shadow-sm">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Hola de nuevo,</span>
                <span className="text-fp-primary font-bold text-sm leading-tight">{username}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 w-screen mx-auto px-6 py-10 max-w-[1400px]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Información</h1>
          <p className="text-gray-500 text-sm mt-1">Personas que han llenado el formulario de contacto.</p>
        </div>

        {/* Tabla de Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Fecha</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Nombre Completo</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Correo Electrónico</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Ciclo de Interés</th>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/3">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {lead.fecha}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {lead.nombre} {lead.apellidos}
                    </td>
                    <td className="px-6 py-4">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.ciclo}
                      </span>
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs" title={lead.mensaje}>
                      {lead.mensaje || <span className="text-gray-400 italic">Sin mensaje</span>}
                    </td>
                  </tr>
                ))}
                {mockLeads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No hay solicitudes registradas aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
            <span>Mostrando {mockLeads.length} registros</span>
          </div>
        </div>
      </main>
    </div>
  );
}
