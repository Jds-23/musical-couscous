//@ts-ignore
import { createWatcher } from "@makerdao/multicall";
import { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";

const useWatcher = (calls: any) => {
  const [state, updateState] = useState<any>({});
  const prevCalls = useRef(calls);
  const watcher = useRef(
    createWatcher(calls, {
      rpcUrl: process.env.NEXT_PUBLIC_REACT_APP_NETWORK_URL,
      multicallAddress: process.env.NEXT_PUBLIC_MULTICALL,
      interval: 10000,
    })
  );
  useEffect(() => {
    watcher.current.subscribe((update: { type: any; value: any }) => {
      updateState((s: any) => ({ ...s, [update.type]: update.value }));
    });
    watcher.current.start();
  }, [watcher]);

  useEffect(() => {
    if (_.isEqual(prevCalls.current, calls)) {
      return;
    }
    prevCalls.current = calls;
    watcher.current.recreate(calls, {
      rpcUrl: process.env.NEXT_PUBLIC_REACT_APP_NETWORK_URL,
      multicallAddress: process.env.NEXT_PUBLIC_MULTICALL,
      interval: 10000,
    });
  }, [calls, prevCalls]);

  return state;
};

export default useWatcher;
