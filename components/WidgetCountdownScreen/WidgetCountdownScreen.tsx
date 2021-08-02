import styles from "./WidgetCountdownScreen.module.css";
import WidgetCountdownTimer from "../WidgetCountdownTimer/WidgetCountdownTimer";
import { Theme, useTheme } from "../../context/StateProvider";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
interface MyProps {
  opensDate: string;
  show: boolean;
  setShow: (arg: boolean) => void;
  label: string;
}
const CountdownScreen: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ opensDate, show, setShow, label }) => {
  const { theme, setTheme } = useTheme();
  return (
    <WidgetScreen show={show} setShow={setShow}>
      <>
        <div className={styles.countdown__content}>
          <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
          <div className={styles.line}></div>
          <WidgetCountdownTimer opensDate={opensDate} />
        </div>
      </>
    </WidgetScreen>
  );
};

export default CountdownScreen;
