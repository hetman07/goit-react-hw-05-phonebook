import React from "react";
import styles from "./Alert.module.css";

export default function Alert() {
  return (
    <div className={styles.alert}>
      <span className={styles.alertText}>Contact is dublication!</span>
    </div>
  );
}
