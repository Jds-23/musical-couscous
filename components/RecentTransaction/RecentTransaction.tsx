import CustomModal from "../Modal/Modal";
import { ModalBody } from "@chakra-ui/react";
import styles from "./RecentTransaction.module.css"
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const RecentTransaction: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ isOpen, onClose, ...props }) => {
  return (
    <>
      <CustomModal
        title={"Recent Transactions"}
        isOpen={isOpen}
        onClose={onClose}
        maxWidth={"600px"}
        {...props}
      >
        <ModalBody>
          {/* <h1>No Transactions History</h1> */}
          <p className={styles.transaction}><h1>Swap 0.34 BNB for 10002 GAIN<img onClick={() => {}} src={"./images/OpenLink.svg"} /></h1>
          </p>
          <p className={styles.transaction}><h1>Swap 10002 GAIN for 0.5 BNB<img onClick={() => {}} src={"./images/OpenLink.svg"} /></h1>
          </p>
          <p className={styles.transaction}><h1>Swap 0.34 BNB for 10002 GAIN<img onClick={() => {}} src={"./images/OpenLink.svg"} /></h1>
          </p>
        </ModalBody>
      </CustomModal>
    </>
  );
};

export default RecentTransaction;
