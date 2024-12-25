// Configurações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgFRQYluZdsWMizR1ESBn_X9Aq_IIIOZk",
  authDomain: "sistema-de-comentarios-972e6.firebaseapp.com",
  projectId: "sistema-de-comentarios-972e6",
  storageBucket: "sistema-de-comentarios-972e6.appspot.com",
  messagingSenderId: "872216046988",
  appId: "1:872216046988:web:00f25480ca246b439bfaa9"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const reviewList = document.getElementById('review-list');
  const reviewForm = document.getElementById('review-form');

  // Carrega avaliações do Firestore
  const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
  onSnapshot(q, (snapshot) => {
    reviewList.innerHTML = '';
    snapshot.forEach((doc) => {
      const review = doc.data();
      const div = document.createElement('div');
      div.classList.add('review');
      div.innerHTML = `
        <strong>${review.name}</strong>
        <p>${review.comment}</p>
        <span>${new Date(review.timestamp).toLocaleString()}</span>
      `;
      reviewList.appendChild(div);
    });
  });

  // Envia nova avaliação
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    addDoc(collection(db, 'reviews'), {
      name,
      comment,
      timestamp: Date.now()
    }).then(() => {
      reviewForm.reset();
    }).catch((error) => {
      console.error('Erro ao enviar avaliação:', error);
    });
  });

  // Scroll suave para links internos
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Exemplo de funcionalidade interativa - troca de tema
  const themeButton = document.getElementById('theme-button');
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeButton.textContent = document.body.classList.contains('dark-theme') ? 'Tema Claro' : 'Tema Escuro';
  });
});
