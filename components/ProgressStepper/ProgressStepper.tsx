import styles from "./ProgressStepper.module.css";
interface MyProps {
  state: number;
  setState: (arg0: number) => void;
}
const ProgressStepper: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ state, setState }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progress}
          style={{ width: `${state * 50}%` }}
        ></div>
        <div className={`${styles.circle} ${state >= 1 ? styles.active : ""}`}>
          {state >= 1 ? <img src="./images/Check.svg" /> : "1"}
        </div>
        <div className={`${styles.circle} ${state >= 2 ? styles.active : ""}`}>
          {state >= 2 ? <img src="./images/Check.svg" /> : "2"}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
