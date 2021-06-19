import styles from "./Main.module.css";
import RecentTransaction from "../RecentTransaction/RecentTransaction";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useState } from "react";

interface MyProps {
  type: string;
}
const Main: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  type,
  children,
  ...props
}) => {
  const [recentTransaction, setRecentTransaction] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  return (
    <>
      <RecentTransaction
        isOpen={recentTransaction}
        onClose={() => setRecentTransaction(false)}
      />
      <SettingsModal
        isOpen={settingsModal}
        onClose={() => setSettingsModal(false)}
      />
      <main className={styles.main} {...props}>
        <div className={styles.main__header}>
          <div className={styles.main__header__left}>
            <p>Exchange</p>
            <p>{type} Gain in an Instant</p>
          </div>
          <div className={styles.main__header__right}>
            <button className={styles.main__header__buttons}>
              <img
                onClick={() => setSettingsModal(true)}
                src={"./images/MenuIcon.svg"}
              />
            </button>
            <button className={styles.main__header__buttons}>
              <img
                onClick={() => setRecentTransaction(true)}
                src={"./images/RecentIcon.svg"}
              />
            </button>
          </div>
        </div>
        <div className={styles.main__body}>{children}</div>
      </main>
    </>
  );
};

export default Main;
