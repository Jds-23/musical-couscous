import styles from "./Button.module.css";
interface ButtonProps {
  size?: string;
  block?: boolean;
}
const CustomButton: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, block = false, size = "lg", className, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} 
      ${size === "lg" ? styles.button__large : ""}
      ${size === "sm" ? styles.button__small : ""}
      ${className ? className : ""}
      ${block ? styles.button__block : ""}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
