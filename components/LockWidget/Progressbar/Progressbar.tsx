import styles from "./Progressbar.module.css";
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
      >
        <span className={styles.label}>{`${(current / limit) * 100}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
