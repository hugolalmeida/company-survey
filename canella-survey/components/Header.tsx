import React from "react";
import styles from "../styles/Header.module.css"; // Import do CSS Module

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.contentWrapper}>
        <img
          src="/LogoCanella.png" // Caminho relativo para a logo na pasta "public"
          alt="Logo"
          className={styles.logo}
        />
        <p className={styles.text}>
          <strong>
            Ajude-nos a melhorar! Deixe aqui sua avaliação sobre nossos Serviços
          </strong>
        </p>
      </div>
    </header>
  );
}

export default Header;
