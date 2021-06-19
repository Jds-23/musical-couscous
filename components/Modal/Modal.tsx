import styles from "./Modal.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
const CustomModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          marginLeft={"10px"}
          marginRight={"10px"}
          maxWidth={"600px"}
          borderRadius={"30px"}
          alignSelf={"center"}
        >
          <ModalHeader fontWeight="400">{title}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
