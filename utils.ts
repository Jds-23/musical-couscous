import { BigNumber, BigNumberish } from "ethers";
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers/lib/utils";
import { useContext } from "react";
import { ExternalStateContext } from "./context/ExternalState";

export function formatGain(number: BigNumberish, maxDecimalDigits: number = 9) {
  const str = formatUnits(number, 9);
  if (str.includes(".")) {
    const parts = str.split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "." +
      parts[1].slice(0, maxDecimalDigits)
    );
  }
  return str;
}

export function formatEtherShort(
  number: BigNumberish,
  maxDecimalDigits: number = 9
) {
  const str = formatEther(number);
  if (str.includes(".")) {
    const parts = str.split(".");
    return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
  }
  return str;
}

export function getPriceImpactString(value?: BigNumber, market?: BigNumber) {
  if (!value || !market) {
    return "-";
  }
  if (value.gt(market)) {
    return "N/A";
  }
  const impact = value.mul(10000).div(market);
  if (impact.isZero()) {
    return "<0.01%";
  }
  return `${(impact.toNumber() / 100).toFixed(2)}%`;
}

export function tryParseGain(value: string, defaultValue = BigNumber.from(0)) {
  try {
    return parseUnits(value, 9);
  } catch (err) {
    return defaultValue;
  }
}

export function tryParseEther(value: string, defaultValue = BigNumber.from(0)) {
  try {
    return parseEther(value);
  } catch (err) {
    return defaultValue;
  }
}

export function getAmountOut(
  reserveIn?: BigNumber,
  reserveOut?: BigNumber,
  amountIn?: BigNumber
) {
  return reserveIn && reserveOut && amountIn
    ? reserveOut
        .mul(amountIn)
        .mul(process.env.NEXT_PUBLIC_VARIABLE_1!)
        .div(
          reserveIn
            .mul(process.env.NEXT_PUBLIC_VARIABLE_2!)
            .add(amountIn.mul(process.env.NEXT_PUBLIC_VARIABLE_1!))
        )
    : undefined;
}

export function getAmountIn(
  reserveIn?: BigNumber,
  reserveOut?: BigNumber,
  amountOut?: BigNumber
) {
  if (!reserveIn || !reserveOut || !amountOut || amountOut.gt(reserveOut)) {
    return undefined;
  }
  const numerator = reserveIn.mul(amountOut).mul(10000);
  const denominator = reserveOut.sub(amountOut).mul(9975);
  console.log("BN", numerator.div(denominator).add(1));
  return numerator.div(denominator).add(1);
}

export function useLiquidity() {
  const { state: swapState } = useContext(ExternalStateContext);
  const [gain, bnb] =
    swapState.token0?.toHexString().toLowerCase() ==
    process.env.NEXT_PUBLIC_GP_ADDRESS?.toLowerCase()
      ? [swapState.reserves0, swapState.reserves1]
      : [swapState.reserves1, swapState.reserves0];
  return { gain, bnb };
}
