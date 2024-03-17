import cn from "classnames";
import { FC } from "react";

import style from "./style.module.scss";

type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      tabIndex={0}
      role={"button"}
      className={cn(style.overlay)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
      onClick={() => {
        onClose();
      }}
    ></div>
  );
};
