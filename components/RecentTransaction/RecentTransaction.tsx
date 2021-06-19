import CustomModal from "../Modal/Modal";
import { ModalFooter, ModalBody } from "@chakra-ui/react";
import CustomButton from "../Button/Button";
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
      >
        <ModalBody>
          <h1>No Transactions History</h1>
        </ModalBody>
      </CustomModal>
    </>
  );
};

export default RecentTransaction;
