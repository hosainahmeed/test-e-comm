import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export const TopBar: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <span>
        🚚 Free shipping on orders over $100 · Use code{" "}
        <strong>FIRST10</strong> for 10% off your first order
      </span>
      <Link href="/wholesale" className={styles.topBarLink}>
        Wholesale ↗
      </Link>
    </div>
  );
};
