import styles from "./CountdownScreen.module.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
interface MyProps {
  opensDate: string;
}
const CountdownScreen: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ opensDate }) => {
  return (
    <div>
      <div className={styles.countdown__content}>
        <h1>TRADING OPENS IN </h1>
        <div className={styles.line}></div>
        <CountdownTimer opensDate={opensDate} />
      </div>
    </div>
  );
};

export default CountdownScreen;
