import styles from "./SuccessModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import CustomButton from "../Button/Button";
import { useTheme } from "../../context/StateProvider";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const SuccessModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ isOpen, onClose, ...props }) => {
    const { theme } = useTheme();
    return (
      <>
        <CustomModal
          title={"Success"}
          isOpen={isOpen}
          onClose={onClose}
          maxWidth={"593px"}
          {...props}
        >
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor={theme === "Dark" ? "#000" : "#fff"}
          >
            {theme === "Dark" ? (
              <img
                alt="Arrow"
                className={styles.image}
                src={"./images/BigArrowVDark.svg"}
              />
            ) : (
              <img
                alt="Arrow"
                className={styles.image}
                src={"./images/BigArrow.svg"}
              />
            )}
            <h1
              style={{ fontSize: "23px" }}
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.text
              }`}
            >
              Transaction Submitted
            </h1>
            <h1
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.text
              }`}
            >
              View on BscScan
            </h1>
            <div
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.addInfo
              }`}
            >
              <p>
                Add GAIN PROTOCOL to Metamask
                <img alt="Meta Mask" src={"./images/MetaMask.svg"} />
              </p>
            </div>
          </ModalBody>
          <ModalFooter backgroundColor={theme === "Dark" ? "#000" : "#fff"}>
            <CustomButton onClick={onClose}>Close</CustomButton>
          </ModalFooter>
        </CustomModal>
      </>
    );
  };

export default SuccessModal;
