import styles from "./InfoCards.module.css";
import Info from "../Info/Info";
import React from "react";
export interface info {
  label: string;
  data: string;
  isYellow?: boolean;
}
interface MyProps {
  infoArr: info[];
}
const InfoCards: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  infoArr,
  ...props
}) => {
  return (
    <div className={styles.container} {...props}>
      {infoArr.map(({ label, data, isYellow }, id) => {
        return (
          <div key={id}>
            <Info>{label}</Info>
            <p style={isYellow ? { color: "#ECB42A" } : {}}>{data}</p>
          </div>
        );
      })}
    </div>
  );
};

export default InfoCards;
