import CustomModal from "../Modal/Modal";
import { ModalBody } from "@chakra-ui/react";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmSwapModal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ isOpen, onClose, ...props }) => {
  return (
    <>
      <CustomModal
        title={"Confirm Swap"}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        <ModalBody>
          <h1>No Transactions History</h1>
        </ModalBody>
      </CustomModal>
    </>
  );
};
export default ConfirmSwapModal;
