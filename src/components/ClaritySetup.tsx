"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const ClaritySetup = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLARITY_ID) {
      Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID);
    }
  }, []);

  return null;
};

export default ClaritySetup;
