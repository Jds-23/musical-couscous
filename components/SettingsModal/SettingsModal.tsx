import styles from "./SettingsModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const SettingsModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ isOpen, onClose, ...props }) => {
    return (
      <>
        <CustomModal
          title={"Settings"}
          isOpen={isOpen}
          onClose={onClose}
          maxWidth={"650px"}
          {...props}
        >
          <ModalBody paddingBottom={"20px"}>
            <h3 className={styles.heading}>Transactions Settings</h3>
            <div className={styles.label} style={{ marginTop: "20px" }}>
              <h4>Slippage tolerance</h4>
              <QuestionOutlineIcon />
            </div>
            <div className={styles.tolerance}>
              <Input variant="filled" />
              <Input variant="filled" />
              <Input variant="filled" />
              <Input variant="filled" />
            </div>
            <div className={styles.label} style={{ marginTop: "20px" }}>
              <h4>Transaction deadline</h4>
              <QuestionOutlineIcon />
            </div>
            <div className={styles.deadline}>
              <Input width="90px" marginRight="10px" variant="filled" />
              <p>minutes</p>
            </div>
            <h3 className={styles.heading} style={{ marginTop: "30px" }}>
              Interface Settings
            </h3>
            <div className={styles.switches}>
              <div className={styles.label}>
                <h4>Toggle Expert Mode</h4>
                <QuestionOutlineIcon />
              </div>
              <Switch size="lg" />
            </div>
            <div className={styles.switches}>
              <div className={styles.label}>
                <h4>Disable Multipleshops</h4>
                <QuestionOutlineIcon />
              </div>
              <Switch size="lg" />
            </div>
            <div className={styles.switches}>
              <div className={styles.label}>
                <h4>Audio</h4>
                <QuestionOutlineIcon />
              </div>
              <Switch size="lg" />
            </div>
          </ModalBody>
        </CustomModal>
      </>
    );
  };

export default SettingsModal;
