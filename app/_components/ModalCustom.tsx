import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ModalCustomProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const ModalCustom: React.FC<ModalCustomProps> = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-background rounded-lg shadow-lg relative min-w-[90%] sm:min-w-[300px] max-w-full mx-4">
        <div className="flex flex-row justify-between items-center w-full bg-border p-4 rounded-tl-lg rounded-tr-lg">
        <p className="text-lg font-bold">{title}</p>
        <button
          className=" text-gray-500 hover:text-blue-500/80 cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>
        </div>
        <div className="p-6">
        {children}
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;
