import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [stack, setStack] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const variantOptions = VARIANT_OPTIONS.map((option, idx) => {
    const id = `variant-${option}`;

    return (
      <label htmlFor={id} key={idx}>
        <input
          id={id}
          type="radio"
          name="variant"
          value={option}
          checked={variant === option}
          onChange={(event) => {
            setVariant(event.target.value);
          }}
        />
        {option}
      </label>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    const toast = {
      id: Math.random().toString(36).slice(2),
      variant,
      message,
    };
    setStack((prevState) => [...prevState, toast]);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  };
  const onHideToaster = (id) => {
    const filteredToasters = stack.filter((toaster) => toaster.id !== id);
    setStack(filteredToasters);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf stack={stack} onHideToaster={onHideToaster} />

      <form className={styles.controlsWrapper} onSubmit={submitHandler}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {variantOptions}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
