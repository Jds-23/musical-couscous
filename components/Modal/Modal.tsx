import styles from "./Modal.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useTheme } from "../../context/StateProvider";

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
  const { theme } = useTheme();
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
          <ModalHeader
            fontWeight="400"
            fontSize="16px"
            color={theme === "Dark" ? "#CFC5F7" : "#24135B"}
            background={
              theme === "Dark"
                ? "linear-gradient(90deg, #1A1A1A 0%, #786FA6 100%)"
                : "#cfc5f7"
            }
          >
            {title}
          </ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
