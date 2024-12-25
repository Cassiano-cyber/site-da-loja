// Importar as funções necessárias do Firebase Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgFRQYluZdsWMizR1ESBn_X9Aq_IIIOZk",
  authDomain: "sistema-de-comentarios-972e6.firebaseapp.com",
  projectId: "sistema-de-comentarios-972e6",
  storageBucket: "sistema-de-comentarios-972e6.appspot.com",
  messagingSenderId: "872216046988",
  appId: "1:872216046988:web:00f25480ca246b439bfaa9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
  const avaliacoesLista = document.getElementById('avaliacoes-lista');
  const avaliacaoForm = document.getElementById('avaliacao-form');

  // Carregar avaliações do Firestore
  const q = query(collection(db, 'avaliacoes'), orderBy('nome', 'desc'));
  onSnapshot(q, snapshot => {
    avaliacoesLista.innerHTML = ''; // Limpa a lista antes de adicionar novos dados
    snapshot.forEach(doc => {
      const avaliacao = doc.data();
      const div = document.createElement('div');
      div.classList.add('avaliacao');
      div.innerHTML = `<strong>${avaliacao.nome}</strong><p>${avaliacao.comentario}</p>`;
      avaliacoesLista.appendChild(div);
    });
  });

  // Enviar nova avaliação
  avaliacaoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    addDoc(collection(db, 'avaliacoes'), {
      nome: nome,
      comentario: comentario
    }).then(() => {
      avaliacaoForm.reset();
    }).catch(error => {
      console.error('Erro ao enviar avaliação: ', error);
    });
  });

  // Toggle dark mode
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Modal script
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 50);
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  });
});
