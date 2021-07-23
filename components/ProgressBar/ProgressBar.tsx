import styles from "./ProgressBar.module.css";
interface myProps {
  limit?: number | undefined;
  current?: number | undefined;
}
const ProgressBar: React.FC<myProps & React.HTMLAttributes<HTMLDivElement>> = ({
  limit = 0,
  current = 0,
  ...props
}) => {
  return (
    <div {...props} className={styles.progressBar}>
      <div
        style={{ width: `${(current / limit) * 100}%` }}
        className={`${styles.progressBarChild} `}
      ></div>
      <span className={styles.label}>
        {new Intl.NumberFormat("en-US").format(current)}
        {" / "}
        {new Intl.NumberFormat("en-US").format(limit)} GAIN
      </span>
    </div>
  );
};

export default ProgressBar;
