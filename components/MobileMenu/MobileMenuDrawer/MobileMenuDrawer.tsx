import MobileMenuDrawerHeader from "../MobileMenuDrawerHeader/MobileMenuDrawerHeader";
import styles from "./MobileMenuDrawer.module.css";
import MobileMenuDrawerItem from "../MobileMenuDrawerItem/MobileMenuDrawerItem";
interface MobileMenuDrawerProps {
  show: boolean;
  setShow: (show: boolean) => void;
  searchDrawer: boolean;
  setSearchDrawer: (searchDrawer: boolean) => void;
}
const MobileMenuDrawer: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MobileMenuDrawerProps
> = ({ setShow, show, searchDrawer, setSearchDrawer }) => {
  return (
    <div
      className={`${styles.mobileMenuDrawer} ${
        show ? styles.mobileMenuDrawer__show : ""
      }`}
    >
      <div className={styles.mobileMenuDrawer__content}>
        <MobileMenuDrawerHeader
          searchDrawer={searchDrawer}
          setSearchDrawer={setSearchDrawer}
        />
        <div className={styles.wrapper__nav}>
          <div className={styles.wrapper__nav__box}>
            <span
              style={{
                width: "23%",
                marginTop: "auto",
                marginBottom: "auto",
                margin: "auto",
                height: "1px",
                backgroundColor: "#fff",
              }}
            ></span>
            <span style={{ color: "#fff" }}>MENU</span>
            <span
              style={{
                width: "23%",
                marginTop: "auto",
                marginBottom: "auto",
                margin: "auto",
                height: "1px",
                backgroundColor: "#fff",
              }}
            ></span>
          </div>
          <div className={styles.wrapper__nav__box}>
            <MobileMenuDrawerItem
              label={"whitepaper"}
              href={"https://www.gainprotocol.com/whitepaper"}
            />
            <MobileMenuDrawerItem
              label={"protocols"}
              href={"https://www.gainprotocol.com/whitepaper#protocol"}
            />
            <MobileMenuDrawerItem label={"fees"} href={"/whitepaper#fees"} />
          </div>
          <div className={styles.wrapper__nav__box}>
            <MobileMenuDrawerItem
              label={"audits"}
              target="_blank"
              rel="noreferrer"
              href="https://solidity.finance/audits/GainProtocol/"
            />
            <MobileMenuDrawerItem
              label={"sweepstakes"}
              href={"https://www.gainprotocol.com/whitepaper#sweepstakes"}
            />
            <MobileMenuDrawerItem
              label={"swapx"}
              href="https://swapx.gainprotocol.com/"
            />
          </div>
          <div className={styles.wrapper__nav__box}>
            <MobileMenuDrawerItem
              label={"features"}
              target="_blank"
              rel="noreferrer"
              href="https://medium.com/gain-protocol/upcoming-features-of-gain-protocol-e4a15da3462d"
            />
            <MobileMenuDrawerItem label={"connect"} href={""} />
            <MobileMenuDrawerItem label={"branding"} href={""} />
          </div>
          <div className={styles.wrapper__nav__box}>
            <MobileMenuDrawerItem
              label={"presale"}
              href={"https://presale.gainprotocol.com/"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
