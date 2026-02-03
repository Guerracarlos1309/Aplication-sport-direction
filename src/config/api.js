/**
 * Configuración centralizada de la API
 * Este archivo proporciona la URL base de la API desde las variables de entorno
 */

// Obtener la URL base desde las variables de entorno o usar localhost como fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Exportar la URL base completa con /api
export const API_BASE = `${API_BASE_URL}/api`;

// Exportar también la URL base sin /api por si se necesita
export const API_URL = API_BASE_URL;

export default API_BASE;
