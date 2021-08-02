import styles from "./WidgetScreen.module.css";
import { Theme, useTheme } from "../../context/StateProvider";
interface MyProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  hideClose?: boolean;
}
const WidgetScreen: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ show, setShow, children, hideClose = false, className, ...props }) => {
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`${styles.root} ${show ? styles.root__show : ""}
    ${theme === "Dark" ? styles.dark : ""} ${className ? className : ""}`}
        {...props}
      >
        <div
          className={`${styles.widgetScreen__background} ${styles.widgetScreen__background__show}`}
        />
        <div className={styles.widgetScreen__background} />
        <img
          src={"./images/background/LeftTop.svg"}
          className={styles.widgetScreen__bg_left_top}
        />

        <img
          src={"./images/background/TopRight.svg"}
          className={styles.widgetScreen__bg_right_top}
        />
        <img
          src={"./images/background/LeftBottom.svg"}
          className={styles.widgetScreen__bg_left_bottom}
        />
        <img
          src={"./images/background/RightBottom.svg"}
          className={styles.widgetScreen__bg_right_bottom}
        />
        {children}
        {!hideClose && (
          <button onClick={() => setShow(false)} className={styles.close}>
            Close
          </button>
        )}
      </div>
    );
  };

export default WidgetScreen;
