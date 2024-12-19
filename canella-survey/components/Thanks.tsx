// components/Thanks.tsx
"use client";
import React, { useEffect } from "react";
import styles from "../styles/Thanks.module.css";  // Importando o CSS

const Thanks = () => {
  useEffect(() => {
    document.title = "Pesquisa de Satisfação - Canella & Santos";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>Obrigado pelo seu feedback!</h1>
        <p className={styles.text}>
          Agradecemos sinceramente por dedicar seu tempo para preencher nossa avaliação, sua resposta foi registrada.
          Seu feedback tem nos ajudado a melhorar constantemente. 
        </p>
        <p className={styles.strongText}>
          <strong>Você pode fechar esta página.</strong>
        </p>
      </div>
    </div>
  );
};

export default Thanks;
