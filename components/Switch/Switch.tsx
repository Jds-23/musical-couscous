import React from "react";
import styles from "./Switch.module.css";
interface MyProps {
  state: number;
  setState: (arg0: number) => void;
  options: string[];
}
const Switch: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  state,
  options,
  setState,
  ...props
}) => {
  return (
    <div className={styles.switch}>
      {options.map((option, id) => {
        return (
          <button
            onClick={() => setState(id)}
            key={id}
            className={`${styles.switch__option} ${
              id === state ? styles.switch__option__active : ""
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Switch;
