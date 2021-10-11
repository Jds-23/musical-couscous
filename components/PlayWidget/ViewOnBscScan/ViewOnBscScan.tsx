import styles from "./ViewOnBscScan.module.css";
import { Theme, useTheme } from "../../../context/StateProvider";

const ViewOnBscScan = () => {
  const { theme } = useTheme();
  return (
    <a
      className={`${styles.viewOnBscScan} ${
        theme === "Dark" ? styles.dark : ""
      }`}
    >
      {theme === "Dark" ? (
        <img src="./images/ArrowUp.png" alt="Arrow Up" />
      ) : (
        <img src="./images/ArrowUpLight.png" alt="Arrow Up" />
      )}
      <p>View On BscScan</p>
    </a>
  );
};

export default ViewOnBscScan;
