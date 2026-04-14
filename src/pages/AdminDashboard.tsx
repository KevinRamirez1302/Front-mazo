import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logomazo.png';
import { obtenerPersonas, eliminarPersona, type PersonaPayload } from '../api';
import { 
  Users, Trash2, Search, Download, ChevronLeft, ChevronRight, 
  BookOpen, LogOut, Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

// Interfaz para los leads
interface Lead extends PersonaPayload {
  id: number;
  created_at?: string; 
}

const COLORS = ['#2b3f82', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para las mejoras aplicadas
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Obtenemos los datos del usuario desde el estado o el localStorage
  const userState = location.state?.user;
  const localUserStr = localStorage.getItem('adminUser');
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  
  const user = userState || localUser || {};
  const username = user.username || 'Administrador';
  const profileImg = user.profile_img;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const data = await obtenerPersonas();
        // Ordenar con el mÃ¡s reciente primero (asumiendo que id mayor es mÃ¡s reciente)
        const sortedData = data.sort((a: Lead, b: Lead) => b.id - a.id);
        setLeads(sortedData);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('No se pudieron cargar los datos de la API.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${name}?`)) {
      try {
        setIsDeleting(id);
        await eliminarPersona(id);
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
        // Ajustar paginaciÃ³n si la pÃ¡gina conectada se queda vacÃ­a
        if (currentLeads.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('Ocurrió un error al intentar eliminar el registro.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'DNI/NIE', 'Curso', 'Mensaje'];
    const rows = leads.map(lead => [
      lead.id,
      lead.nombre,
      lead.apellido,
      lead.email,
      lead.telefono || '',
      lead.dni || '',
      lead.curso,
      (lead.mensaje || '').replace(/\n/g, ' ').replace(/;/g, ',')
    ]);
    
    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
    ].join('\n');
    
    // Necesario para que Excel tome UTF-8 correctamente (BOM)
    const blob = new Blob(["\uFEFF"+csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_mazo_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado 
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = 
        `${lead.nombre} ${lead.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.dni && lead.dni.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchCourse = filterCourse === 'Todos' || lead.curso === filterCourse;
      return matchSearch && matchCourse;
    });
  }, [leads, searchTerm, filterCourse]);

  // Reset pagination if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCourse]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Estadísticas para KPIs y Gráficos
  const stats = useMemo(() => {
    const coursesCount: Record<string, number> = {};
    const cursosUnicos: Set<string> = new Set();
    
    leads.forEach(lead => {
      cursosUnicos.add(lead.curso);
      coursesCount[lead.curso] = (coursesCount[lead.curso] || 0) + 1;
    });
    
    const chartData = Object.entries(coursesCount)
      .map(([name, count]) => ({ name: name.split(' ')[0], fullName: name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total: leads.length,
      topCourse: chartData.length > 0 ? chartData[0].fullName : 'N/A',
      uniqueCourses: cursosUnicos.size,
      availableCourses: Array.from(cursosUnicos).sort(),
      chartData
    };
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar Superior del Panel */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
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
                <div className="w-10 h-10 rounded-full bg-fp-primary/10 text-fp-primary flex items-center justify-center font-bold border-2 border-fp-primary/30 shadow-sm uppercase">
                  {username.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Administrador</span>
                <span className="text-gray-800 font-bold text-sm leading-tight">{username}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
            >
              <LogOut size={16} />
              <span className="hidden sm:block">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 w-full mx-auto px-6 py-8 max-w-[1400px]">
        {/* Cabecera y bienvenida */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard General</h1>
            <p className="text-gray-500 text-sm mt-1">Analíticas y gestión de solicitudes de información.</p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center justify-center gap-2 bg-fp-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-fp-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            Exportar CSV
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
            {error}
          </div>
        )}

        {/* Sección Analíticas */}
        {!isLoading && !error && leads.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Cards KPI */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Leads</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Curso + Popular</h3>
                    <p className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">{stats.topCourse}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
              <h3 className="text-gray-700 font-semibold mb-6 flex items-center gap-2">
                Demanda por Ciclos
              </h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip 
                      cursor={{fill: '#f3f4f6'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {stats.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Filtros y Búsqueda */}
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o DNI..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fp-primary/20 focus:border-fp-primary transition-all text-sm"
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Filtrar:</span>
            <select 
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-fp-primary focus:border-fp-primary block py-2 px-3 outline-none"
            >
              <option value="Todos">Todos los ciclos</option>
              {stats.availableCourses.map(curso => (
                <option key={curso} value={curso}>{curso}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla de Leads */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold w-12 text-center">ID</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Contacto</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Teléfono / DNI</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Ciclo de Interés</th>
                  <th scope="col" className="px-5 py-4 font-semibold w-64">Mensaje</th>
                  <th scope="col" className="px-5 py-4 font-semibold text-center w-24">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col justify-center items-center gap-3 text-gray-500">
                        <Loader2 className="animate-spin text-fp-primary h-8 w-8" />
                        <span className="font-medium text-sm">Cargando la base de datos...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search size={40} className="text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-600">No se encontraron resultados</p>
                        <p className="text-sm">Prueba ajustando los filtros de búsqueda</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-5 py-4 text-center text-gray-400 font-mono text-xs">
                        #{lead.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">{lead.nombre} {lead.apellido}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{lead.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-gray-800">{lead.telefono || <span className="text-gray-300 italic">Sin tel.</span>}</div>
                        <div className="text-gray-500 text-xs mt-0.5 font-mono">{lead.dni || <span className="text-gray-300 italic">Sin DNI</span>}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-fp-primary/10 text-fp-primary border border-fp-primary/20">
                          {lead.curso}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="line-clamp-2 text-xs text-gray-600" title={lead.mensaje}>
                          {lead.mensaje || <span className="text-gray-400 italic">Sin observaciones</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleDelete(lead.id, `${lead.nombre} ${lead.apellido}`)}
                          disabled={isDeleting === lead.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mx-auto group-hover:bg-white border border-transparent group-hover:border-gray-200"
                          title="Eliminar registro"
                        >
                          {isDeleting === lead.id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer de Tabla con Paginación */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Mostrando {filteredLeads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, filteredLeads.length)} de <span className="font-medium text-gray-900">{filteredLeads.length}</span> registros
            </span>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show pages around current page
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 2 + i;
                        if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                      }
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          currentPage === pageNum 
                            ? 'bg-fp-primary text-white ' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


