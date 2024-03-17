import cn from "classnames";
import React, { FC } from "react";
import ReactDOM from "react-dom";

import { ModalOverlay } from "@/shared/ui/modal/ui/modal-overlay/ModalOverlay.tsx";

import style from "./Modal.module.css";

const reactModals = document.getElementById("react-modals") as HTMLElement;

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, title, onClose }) => {
  return ReactDOM.createPortal(
    <div className={cn(style.portal, style.opened)}>
      <ModalOverlay onClose={onClose} />
      <div className={cn(style.modal)}>
        <div className={cn(style.header)}>
          <h2 className={cn(style.title)}>{title || ""}</h2>
          <button
            className={cn(style.close)}
            onClick={() => {
              onClose();
            }}
          >
            cross
          </button>
        </div>

        {children}
      </div>
    </div>,
    reactModals,
  );
};
