import styles from "./WalletInfoModal.module.css";
import CustomModal from "../Modal/Modal";
import CustomButton from "../Button/Button";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import { useWalletAddress } from "../../context/StateProvider";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const WalletInfoModal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ isOpen, onClose, ...props }) => {
  const { address, setAddress } = useWalletAddress();
  return (
    <>
      <CustomModal
        title={"Your Wallet"}
        isOpen={isOpen}
        onClose={onClose}
        maxWidth={"700px"}
        {...props}
      >
        <ModalBody>
          <h1 style={{ fontSize: "18px",  color:"#7a71a7" }}>{address}</h1>
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
          <CustomButton
            onClick={() => {
              setAddress("");
              onClose();
            }}
          >
            Logout
          </CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default WalletInfoModal;
