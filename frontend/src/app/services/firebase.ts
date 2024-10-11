// src/services/firebase.service.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB6J9EvWTSJz0KMEdtvyIqrBUmRWRg5n3w',
  authDomain: 'daisukekaraoke-auth.firebaseapp.com',
  projectId: 'daisukekaraoke-auth',
  storageBucket: 'daisukekaraoke-auth.appspot.com',
  messagingSenderId: '348208515791',
  appId: '1:348208515791:web:0492ae073319f09d2445ba',
  measurementId: 'G-W3WM1VDRTF',
};

// Função para inicializar o Firebase
export function inicializarFirebase() {
  // Verifica se o Firebase já foi inicializado
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp(); // Retorna a instância existente
  }
}

// Inicializa o Auth a partir do app inicializado
export const app = inicializarFirebase();
export const auth = getAuth(app);
