import { useEffect, useState } from "react";
import styles from "./AnimatedLoader.module.css";

const AnimatedLoader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({}) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const Timeout = setTimeout(() => {
      setValue(!value);
    }, 5000);
    return () => {
      clearTimeout(Timeout);
    };
  }, [value]);
  useEffect(() => {
    setValue((value) => !value);
  }, []);
  return (
    <div className={`${styles.diamond} ${value ? styles.display : ""}`}>
      <div className={styles.stripe1}></div>
      <div className={styles.stripe2}></div>
      <div className={styles.stripe3}></div>
      <div className={styles.stripe4}></div>
      <div className={styles.stripe5}></div>
    </div>
  );
};

export default AnimatedLoader;
