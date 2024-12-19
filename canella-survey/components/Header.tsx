import React from "react";
import styles from "../styles/Header.module.css"; // Import do CSS Module
import Image from 'next/image';

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.contentWrapper}>
        <Image
          src="/LogoCanella.png" // Caminho relativo para a logo na pasta "public"
          alt="Logo"
          className={styles.logo}
          width={280}
          height={100}
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
