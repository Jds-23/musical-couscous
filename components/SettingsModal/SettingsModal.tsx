import styles from "./SettingsModal.module.css";
import CustomModal from "../Modal/Modal";
import { ModalBody } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import Info from "../Info/Info";
import { useState } from "react";
import { useTheme, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
interface MyProps {
  isOpen: boolean;
  onClose: () => void;
}
const deadlineRegex = /^[0-9\b]+$/;
const slippageToleranceRegex = /^\d*\.?\d*$/;
const SettingsModal: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ isOpen, onClose, ...props }) => {
    const [tolerance, setTolerance] = useState("4");
    const [toleranceError, setToleranceError] = useState("");
    const [deadlineError, setDeadlineError] = useState("");
    const [activeTolerance, setActiveTolerance] = useState(false);
    const [activeDeadline, setActiveDeadline] = useState(false);
    const [deadline, setDeadline] = useState("20");
    const { theme } = useTheme();
    const { state, dispatch } = useAppContext();
    return (
      <>
        <CustomModal
          title={"Settings"}
          isOpen={isOpen}
          onClose={onClose}
          maxWidth={"650px"}
          {...props}
        >
          <ModalBody
            backgroundColor={theme === "Dark" ? "#000" : "#fff"}
            paddingBottom={"20px"}
          >
            <h3
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.heading
              }`}
            >
              Transactions Settings
            </h3>
            <Info
              tooltip="Your transaction will revert if the price changes unfavorably by more than this percentage."
              style={{ marginTop: "20px", fontSize: "10px" }}
            >
              <h4>Slippage tolerance</h4>
            </Info>
            <div className={styles.tolerance}>
              <button
                className={`${styles.button} ${
                  state.slippageTolerance === "1.0" ? styles.button__active : ""
                } ${styles.tolerance__button__1}`}
                onClick={() =>
                  dispatch({
                    type: Types.tolerance,
                    payload: { tolerance: "1.0" },
                  })
                }
              >
                1
              </button>
              <button
                className={`${styles.button} ${
                  state.slippageTolerance === "4" ? styles.button__active : ""
                } ${styles.tolerance__button__2}`}
                onClick={() =>
                  dispatch({
                    type: Types.tolerance,
                    payload: { tolerance: "4" },
                  })
                }
              >
                4
              </button>
              <button
                className={`${styles.button} ${
                  state.slippageTolerance === "5.5" ? styles.button__active : ""
                } ${styles.tolerance__button__3}`}
                onClick={() =>
                  dispatch({
                    type: Types.tolerance,
                    payload: { tolerance: "5.5" },
                  })
                }
              >
                5.5
              </button>
              <Input
                value={activeTolerance ? tolerance : state.slippageTolerance}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    slippageToleranceRegex.test(e.target.value)
                  ) {
                    setTolerance(e.target.value);
                    if (e.target.value !== "" && e.target.value !== ".") {
                      console.log(0.1 <= parseFloat(e.target.value));
                      if (0.1 <= parseFloat(e.target.value)) {
                        dispatch({
                          type: Types.tolerance,
                          payload: { tolerance: e.target.value },
                        });
                        setToleranceError("");
                      } else {
                        setToleranceError("Enter a valid slippage percentage");
                      }
                    } else {
                      setToleranceError("Enter a valid slippage percentage");
                    }
                  }
                }}
                onFocus={() => {
                  setTolerance(state.slippageTolerance);
                  setActiveTolerance(true);
                }}
                onBlur={() => {
                  setToleranceError("");
                  setActiveTolerance(false);
                }}
                className={styles.tolerance__input}
                borderRadius="9px"
                variant="filled"
                color="#7a71a7"
              />
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>
              {toleranceError}
            </span>
            <Info
              tooltip="Your transaction will revert if it is pending for more than this long."
              style={{ marginTop: "20px", fontSize: "10px" }}
            >
              <h4>Transaction deadline</h4>
            </Info>
            <div
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.deadline
              }`}
            >
              <Input
                width="90px"
                marginRight="10px"
                variant="filled"
                value={activeDeadline ? deadline : state.transactionDeadline}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    deadlineRegex.test(e.target.value)
                  ) {
                    setDeadline(e.target.value);
                    if (e.target.value !== "") {
                      if (parseFloat(e.target.value) >= 1) {
                        dispatch({
                          type: Types.transactionDeadline,
                          payload: { transactionDeadline: e.target.value },
                        });
                        setDeadlineError("");
                      } else {
                        setDeadlineError("Enter a valid deadline");
                      }
                    } else {
                      setDeadlineError("Enter a valid deadline");
                    }
                  }
                }}
                onFocus={() => {
                  setDeadline(state.transactionDeadline);
                  setActiveDeadline(true);
                }}
                onBlur={() => {
                  setDeadlineError("");
                  setActiveDeadline(false);
                }}
                color="#7a71a7"
              />
              <p>minutes</p>
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>
              {deadlineError}
            </span>
            {/* <h3
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.heading
              }`}
              style={{ marginTop: "30px" }}
            >
              Interface Settings
            </h3> */}
            {/* {<div className={styles.switches}>
              <Info
                tooltip="Bypasses confirmation modals and allows high slippage trades. Use at your own risk."
                style={{ fontSize: "10px" }}
              >
                <h4>Toggle Expert Mode</h4>
              </Info>
              <Switch
                isChecked={state.toggleExpertMode}
                onChange={() => {
                  dispatch({
                    type: Types.toggleExpertMode,
                    payload: { toggleExpertMode: !state.toggleExpertMode },
                  });
                }}
                size="lg"
                colorScheme={"brand"}
              />
            </div>} */}
          </ModalBody>
        </CustomModal>
      </>
    );
  };

export default SettingsModal;
