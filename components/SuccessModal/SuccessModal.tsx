import styles from "./SuccessModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import CustomButton from "../Button/Button";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const SuccessModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ isOpen, onClose, ...props }) => {
    return (
      <>
        <CustomModal
          title={"Recent Transactions"}
          isOpen={isOpen}
          onClose={onClose}
          {...props}
        >
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img className={styles.image} src={"./images/BigArrow.svg"} />
            <h1 style={{ fontSize: "23px" }} className={styles.text}>
              Transaction Submitted
            </h1>
            <h1 className={styles.text}>View on BscScan</h1>
            <div className={styles.addInfo}>
              <p>
                Add GAIN PROTOCOL to Metamask
                <img src={"./images/MetaMask.svg"} />
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <CustomButton>Close</CustomButton>
          </ModalFooter>
        </CustomModal>
      </>
    );
  };

export default SuccessModal;
