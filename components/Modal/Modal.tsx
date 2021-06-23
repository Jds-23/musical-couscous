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
  maxWidth?: string;
}
const CustomModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "600px",
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme={"brand.100"}>
        <ModalOverlay />
        <ModalContent
          marginLeft={"10px"}
          marginRight={"10px"}
          maxWidth={maxWidth}
          borderRadius={"30px"}
          overflow={"hidden"}
          alignSelf={"center"}
        >
          <ModalHeader fontWeight="400" backgroundColor="#F2F2F2">{title}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
