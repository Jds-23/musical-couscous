import styles from "./ErrorModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../Button/Button";
import { useTheme } from "../../context/StateProvider";
interface MyProps {
  isOpen: boolean;
  errorMessage: string;
  onClose: () => void;
}
const ErrorModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  isOpen,
  onClose,
  errorMessage,
  ...props
}) => {
  const { theme } = useTheme();
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
          background={theme === "Dark" ? "#000" : "#fff"}
        >
          {theme === "Dark" ? (
            <img className={styles.image} src={"./images/ErrorVDark.svg"} />
          ) : (
            <img className={styles.image} src={"./images/Error.svg"} />
          )}
          <h1
            className={`
          ${theme === "Dark" ? styles.dark : ""}
          ${styles.text}`}
          >
            The transaction cannot succeed due to error: {errorMessage}.
            {/* This is probably an issue with one of the tokens you are swapping. */}
          </h1>
        </ModalBody>
        <ModalFooter background={theme === "Dark" ? "#000" : "#fff"}>
          <CustomButton block>Dismiss</CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default ErrorModal;
