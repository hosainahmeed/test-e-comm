import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export const HeaderLogo: React.FC = () => {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.logoText}>
        <span className={styles.logoAccent}>Divan </span>Dion
      </span>
    </Link>
  );
};
