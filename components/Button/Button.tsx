import styles from "./Button.module.css";
interface ButtonProps {
  size?: string;
  block?: boolean;
  disabled?: boolean;
}
const CustomButton: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  block = false,
  size = "lg",
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${styles.button} 
      ${size === "lg" ? styles.button__large : ""}
      ${size === "sm" ? styles.button__small : ""}
      ${className ? className : ""}
      ${block ? styles.button__block : ""}
      ${disabled ? styles.button__disabled : ""}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
