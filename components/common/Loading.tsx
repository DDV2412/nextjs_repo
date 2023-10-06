import { motion } from "framer-motion";
import React from "react";
import lootie from "@/assets/lottie//loading.json";
import Lottie from "lottie-react";

export const Loading = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 bg-slate-900/30 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="w-40 h-40"
      >
        <Lottie animationData={lootie} />
      </motion.div>
    </div>
  );
};
