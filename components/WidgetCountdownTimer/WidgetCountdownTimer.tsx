import { useEffect } from "react";
import { useState } from "react";
import styles from "./WidgetCountdownTimer.module.css";
import timer from "./timer";
interface MyProps {
  opensDate: string;
}
const WidgetCountdownTimer: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ opensDate }) => {
  const [state, setState] = useState([0, 0, 0, 0]);
  useEffect(() => {
    setInterval(
      () =>
        setState(
          timer(
            new Date(opensDate).getTime() -
              new Date().getTimezoneOffset() * 60000
          )
        ),
      1000
    );
  }, []);
  return (
    <div className={styles.timer}>
      <div>
        <h3>{state[0]}</h3>
        <p>days</p>
      </div>
      <div>
        <h3>{state[1]}</h3>
        <p>hours</p>
      </div>
      <div>
        <h3>{state[2]}</h3>
        <p>minutes</p>
      </div>
      <div>
        <h3>{state[3]}</h3>
        <p>seconds</p>
      </div>
    </div>
  );
};

export default WidgetCountdownTimer;
