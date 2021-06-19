import styles from "./WalletInfoModal.module.css";
import CustomModal from "../Modal/Modal";
import CustomButton from "../Button/Button";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const WalletInfoModal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ isOpen, onClose, ...props }) => {
  return (
    <>
      <CustomModal
        title={"Your Wallet"}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        <ModalBody>
          <h1>0x394759jfhdsbjk3klpombvggma7s9d8asbn49nq2</h1>

          <div style={{ display: "flex" }}>
            <div className={styles.link}>
              <p>View on BscScan</p>
              <button>
                <img onClick={() => {}} src={"./images/OpenLink.svg"} />
              </button>
            </div>
            <div className={styles.link}>
              <p>Copy Address</p>
              <button>
                <img onClick={() => {}} src={"./images/CopyAddress.svg"} />
              </button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter justifyContent="flex-end">
          <CustomButton onClick={onClose}>Logout</CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default WalletInfoModal;
