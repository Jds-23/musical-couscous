import styles from "./MobileMenuDrawerItem.module.css";
interface Props {
  label: string;
}
const MobileMenuDrawerItem: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & Props
> = ({ label, ...props }) => {
  return (
    <a {...props} className={styles.wrapper__nav__box__item}>
      <div>
        <img src={`./images/Icons/${label}.svg`} />
      </div>
      <p style={label === "presale" ? { fontSize: "14px" } : {}}>{label}</p>
    </a>
  );
};

export default MobileMenuDrawerItem;
