import { auth } from '../lib/firebaseConfig';
import {
  authGoogle,
  signInWithPassword,
} from '../lib/authentication';
import { googleAccess, logo } from './img';

export const login = (onNavigate) => {
  //* Aqui estamos creando lo que va en HTML.
  const loginSection = document.createElement('form');
  const coverImg = document.createElement('img');
  const loginHeader = document.createElement('h1');
  const emailInput = document.createElement('input');
  const passwordLabel = document.createElement('label');
  const passwordInput = document.createElement('input');
  const loginBtn = document.createElement('button');
  const BtnGoogle = document.createElement('img');

  //* Estamos asignando atributos para todos los elementos creados.
  loginSection.setAttribute('id', 'loginSection');

  loginHeader.innerHTML = 'Ingresa tus datos';

  coverImg.setAttribute('id', 'LogoPetropolis');
  coverImg.src = logo;
  coverImg.setAttribute('alt', 'LogoPetropolis');

  emailInput.setAttribute('type', 'text');
  emailInput.setAttribute('id', 'emailInput');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('placeholder', 'Escribe tu correo');

  passwordLabel.setAttribute('id', 'password');
  passwordLabel.setAttribute('name', 'password');
  passwordLabel.innerHTML = 'Contraseña:';

  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('id', 'password');
  passwordInput.setAttribute('name', 'password');

  loginBtn.setAttribute('id', 'loginBtn');
  loginBtn.setAttribute('type', 'submit');
  loginBtn.textContent = 'Entrar';

  BtnGoogle.setAttribute('id', 'BtnGoogle');
  BtnGoogle.src = googleAccess;
  BtnGoogle.setAttribute('alt', 'BtnGoogle');

  //* Aqui estamos agregando todo a la sección de loginSection
  loginSection.appendChild(loginHeader);
  loginSection.appendChild(coverImg);
  loginSection.appendChild(emailInput);
  loginSection.appendChild(passwordLabel);
  loginSection.appendChild(passwordInput);
  loginSection.appendChild(loginBtn);
  loginSection.appendChild(BtnGoogle);

  // Summit envia los dato del formulario a la Web
  loginSection.addEventListener('submit', async (e) => {
    e.preventDefault(); // detiene la acción y realiza otra personalizada
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      signInWithPassword(email, password);
      const name = email.split('@')[0]; // obtener el nombre de usuario
      if (email === '' || password === '') {
        alert('Ingrese todos los campos');
        return;
      }
      localStorage.setItem('name', name);
      onNavigate('/welcome');
    } catch (error) {
      if (error.code === 'auth/wrong-password') { // Error que indica que la contraseña ingresada no coincide
        alert('Contraseña invalida');
      }
      if (error.code === 'auth/invalid-email') { // Error que indica que el Email ingresado no coincide
        alert('Correo invalido');
      }
    }
  });

  // Boton para ingresar con Google
  BtnGoogle.addEventListener('click', async () => {
    try {
      await authGoogle();
      const user = auth.currentUser;
      const name = user.displayName;
      localStorage.setItem('name', name);
      onNavigate('/welcome');
    } catch (error) {
      alert('Google error');
    }
  });
  return loginSection;
};
