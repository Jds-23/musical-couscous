import styles from "./ErrorModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../Button/Button";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const ErrorModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <>
      <CustomModal
        title={"Error"}
        isOpen={isOpen}
        maxWidth={"593px"}
        onClose={onClose}
        {...props}
      >
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img className={styles.image} src={"./images/Error.svg"} />
          <h1 className={styles.text}>
            The transaction cannot succeed due to error: undefined. This is
            probably an issue with one of the tokens you are swapping.
          </h1>
        </ModalBody>
        <ModalFooter>
          <CustomButton block>Dismiss</CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default ErrorModal;
