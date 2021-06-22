import styles from "./ProgressBar.module.css";
interface myProps {
  percent?: number | undefined;
}
const ProgressBar: React.FC<myProps & React.HTMLAttributes<HTMLDivElement>> = ({
  percent = 0,
  ...props
}) => {
  return (
    <div {...props} className={styles.progressBar}>
      <div
        style={{ width: `${percent ? percent : 0}%` }}
        className={`${styles.progressBarChild} `}
      ></div>
      <span className={styles.label}>{percent}/100 GAIN</span>
    </div>
  );
};

export default ProgressBar;
