import CustomModal from "../Modal/Modal";
import styles from "./ConfirmSwapModal.module.css";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../Button/Button";
import { useTheme } from "../../context/StateProvider";
import Info from "../Info/Info";

interface MyProps {
  isOpen: boolean;
  onClose: () => void;
  successToast: Function;
  onSuccessOpen: () => void;
}

const ConfirmSwapModal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ isOpen, onClose, successToast, onSuccessOpen, ...props }) => {
  const { theme } = useTheme();
  return (
    <>
      <CustomModal
        title={"Confirm Swap"}
        isOpen={isOpen}
        onClose={onClose}
        maxWidth={"553px"}
        {...props}
      >
        <ModalBody background={theme === "Dark" ? "#000" : "#fff"}>
          <div
            className={`${styles.row1} ${theme === "Dark" ? styles.dark : ""}`}
          >
            <div
              className={`${styles.row1__currency} ${
                theme === "Dark" ? styles.dark : ""
              }`}
            >
              <div>
                <img src={"./images/BNB.svg"} />
                <p>0.004454</p>
              </div>
              <p>BNB</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.979"
                height="22.166"
                viewBox="0 0 19.979 22.166"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient"
                    y1="0.5"
                    x2="1"
                    y2="0.5"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#cfc5f7" />
                    <stop offset="0.894" stop-color="#cfa8f7" />
                  </linearGradient>
                </defs>
                <path
                  id="ArrowBottom"
                  d="M6547.521,560.4a1.6,1.6,0,0,0-2.26,0l-5.663,5.663V550.919a1.6,1.6,0,1,0-3.2,0V566l-5.663-5.663a1.6,1.6,0,0,0-2.26,2.26l8.258,8.258a1.589,1.589,0,0,0,1.263.629h.028a1.594,1.594,0,0,0,1.13-.468l8.363-8.363A1.6,1.6,0,0,0,6547.521,560.4Z"
                  transform="translate(-6528.011 -549.32)"
                  fill="url(#linear-gradient)"
                />
              </svg>
            </div>
            <div
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.row1__currency
              }`}
            >
              <div>
                <img src={"./images/GP.svg"} />

                <p>0.004454</p>
              </div>
              <p>GAIN PROTOCOL</p>
            </div>
            <p>
              Output is estimated. You will receive at least 23.6125 GAIN
              PROTOCOL or the transaction will revert.
            </p>
          </div>

          <div
            className={`${styles.row2} ${theme === "Dark" ? styles.dark : ""}`}
          >
            <div>
              <h4 className={styles.label}>Price</h4>
              <p style={{ fontSize: "10px" }}>
                0.04989897 BNB per Gain Protocol
              </p>
            </div>
            <div>
              <Info
                tooltip="Bypasses confirmation modals and allows high slippage trades. Use at your own risk."
                style={{ fontSize: "10px" }}
              >
                <h4>Toggle Expert Mode</h4>
              </Info>{" "}
              <p style={{ fontSize: "10px" }}>23.42 GAIN PROTOCOL</p>
            </div>
            <div>
              <Info tooltip="The difference between the market price and estimated price due to trade size.">
                Price Impact
              </Info>
              <p style={{ color: "#ECB42A", fontSize: "10px" }}>{"<"}0.99%</p>
            </div>
            <div>
              <Info
                tooltip="For each trade a 0.25% fee is paid
- 0.17% to LP token holders
- 0.03% to the Treasury
- 0.05% towards GAIN buyback and burn"
              >
                Liquidity Provider Fee
              </Info>
              <p style={{ fontSize: "10px" }}>23.0004</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter background={theme === "Dark" ? "#000" : "#fff"}>
          <CustomButton
            block
            onClick={() => {
              onClose();
              onSuccessOpen();
              successToast();
            }}
          >
            Confirm Swap
          </CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default ConfirmSwapModal;
