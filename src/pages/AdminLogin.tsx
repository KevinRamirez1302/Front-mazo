import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logomazo.png';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // TODO: Coloca aquí la URL real de tu API de Login
  const API_LOGIN_URL = 'http://localhost:3000/usuarios/login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // ==== LÓGICA DE API (Descomentar cuando el backend esté listo) ====
      
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas o error en el servidor');
      }

      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('adminToken', data.access_token);
        // Opcional: podrías guardar los datos del usuario en localStorage también si es necesario
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        navigate('/admin-panel', { state: { user: data.user } });
      } else {
        throw new Error('No se recibió token de acceso del servidor');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-gray-100 flex flex-col items-center">
        <div className="mb-8 text-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mx-auto mb-4 shadow-sm" />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Acceso Privado</h2>
          <p className="text-sm text-gray-500 mt-2">Área restringida para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="username">
              Usuario de Administrador
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fp-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Ej. admin_mazo"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fp-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-fp-primary text-white rounded-lg font-medium hover:bg-fp-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fp-primary transition-all duration-200 shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-fp-primary transition-colors duration-200"
          >
            &larr; Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
}
