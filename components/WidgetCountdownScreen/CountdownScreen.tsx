import styles from "./CountdownScreen.module.css";
import CountdownTimer from "../WidgetCountdownTimer/CountdownTimer";
import { Theme, useTheme } from "../../Context/StateProvider";
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
  console.log(theme);
  return (
    <WidgetScreen show={show} setShow={setShow}>
      <>
        <div className={styles.countdown__content}>
          <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
          <div className={styles.line}></div>
          <CountdownTimer opensDate={opensDate} />
        </div>
      </>
    </WidgetScreen>
  );
};

export default CountdownScreen;
