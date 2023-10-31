import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ stack, onHideToaster }) {
  const toastList = stack.map((toast) => (
    <li className={styles.toastWrapper} key={toast.id}>
      <Toast variant={toast.variant} onHide={() => onHideToaster(toast.id)}>
        {toast.message}
      </Toast>
    </li>
  ));

  return <ol className={styles.wrapper}>{toastList}</ol>;
}

export default ToastShelf;
