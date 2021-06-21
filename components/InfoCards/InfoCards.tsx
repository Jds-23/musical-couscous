import styles from "./InfoCards.module.css";
import React from "react";
export interface info {
  label: string;
  data: string;
  isYellow?: boolean;
}
const InfoCards: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className={styles.container} {...props}>
      {children}
    </div>
  );
};

export default InfoCards;
