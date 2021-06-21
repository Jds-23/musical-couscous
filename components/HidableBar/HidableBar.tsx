import styles from "./HidableBar.module.css";
interface MyProps {
  isHidden: boolean;
}
const HidableBar: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  isHidden,
  children,
  ...props
}) => {
  return (
    <div
      className={`${styles.moreDetails__container} ${
        !isHidden ? styles.moreDetails__see : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default HidableBar;
