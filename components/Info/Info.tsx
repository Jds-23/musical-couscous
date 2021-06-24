import styles from "./Info.module.css";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
interface MyProps {
  tooltip?: string;
}
const Info: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  children,
  tooltip = "Hey, I'm here!",
  ...props
}) => {
  return (
    <div className={styles.info} {...props}>
      <h4>{children}</h4>
      <Tooltip
        placement="top"
        hasArrow
        label={tooltip}
        aria-label="A tooltip"
        bg="#D9D0FB"
        color="#7A71A7"
        fontWeight="400"
        fontSize="10px"
      >
        <QuestionOutlineIcon cursor={"pointer"} />
      </Tooltip>
    </div>
  );
};

export default Info;
