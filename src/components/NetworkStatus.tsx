// components/NetworkStatus.tsx
"use client"; // Marca como cliente, para utilizar APIs do navegador como `window`

import { useState, useEffect } from "react";
import { message } from "antd";

const NetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  // Função para gerenciar a conectividade
  const checkOnlineStatus = () => {
    if (navigator.onLine) {
      setIsOffline(false);
    } else {
      setIsOffline(true);
    }
  };

  // Efeito para adicionar os event listeners de online/offline
  useEffect(() => {
    checkOnlineStatus(); // Verifica a conectividade inicial

    // Adiciona os eventos de mudança de estado da conexão
    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    // Cleanup ao desmontar o componente
    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, []);

  // Mostrar a mensagem de aviso quando estiver offline
  useEffect(() => {
    if (isOffline) {
      message.warning("Você está offline. Algumas funcionalidades podem não funcionar corretamente.", 0);
    } else {
      message.destroy(); // Limpar a mensagem de offline se voltar online
    }
  }, [isOffline]);

  return null; // Este componente não precisa renderizar nada visível
};

export default NetworkStatus;
