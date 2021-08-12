import styles from "./Footer.module.css";
import { Theme, useTheme } from "../../../context/StateProvider";

interface MyProps {
  setShow: () => void;
}
const SwapXHeader: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  setShow,
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      {...props}
      className={`${styles.header} ${theme === "Dark" ? styles.dark : ""}`}
    >
      <button onClick={() => setShow()} className={styles.close}>
        Go Back
      </button>{" "}
    </div>
  );
};

export default SwapXHeader;
