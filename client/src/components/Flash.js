import React from "react";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import styles from "./flash.module.css";

function Flash({ message,width, type, duration, position, active, setActive }) {
  const FlashClassNames = {
    [styles.error]: type === "error",
    [styles.warning]: type === "warning",
    [styles.success]: type === "success",
    [styles.bleft]: position === "bleft",
    [styles.bright]: position === "bright",
    [styles.tright]: position === "tright",
    [styles.tleft]: position === "tleft",
    [styles.tcenter]: position === "tcenter",
    [styles.bcenter]: position === "bcenter",
    [styles.bcenter]: position === "bcenter",
    [styles.fullWidth]: width === "full",
    [styles.smallWidth]: width === "small",
    [styles.mediumWidth]: width === "medium",
    [styles.largeWidth]: width === "large"
  };
  return (
    <CSSTransition
      in={active}
      timeout={duration}
      classNames="flash"
      unmountOnExit
      onExit={() => setActive((state) => !state)}
    >
      <div className={classnames(styles.flash, FlashClassNames)}>
        <div className={styles.flashMessage}>{message}</div>
        <button
          className={styles.flashDismiss}
          onClick={() => setActive((state) => !state)}
        >
          &#10005;
        </button>
      </div>
    </CSSTransition>
  );
}

export default Flash;
