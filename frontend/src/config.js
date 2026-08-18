/**
 * API Configuration
 * Use a relative path by default so the app works on Vercel.
 * For local development, Vite proxy forwards /api calls to the backend.
 */

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');
export const PREDICT_ENDPOINT = `${API_BASE_URL || ''}/api/predict`; 