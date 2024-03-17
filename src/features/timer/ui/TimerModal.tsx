import { FC } from "react";

import { Modal } from "@/shared/ui/modal/ui/modal/Modal.tsx";

export type TimerModalProps = {
  onClose: () => void;
};

const TimerModal: FC<TimerModalProps> = ({ onClose }) => {
  return <Modal onClose={onClose}>re</Modal>;
};

export default TimerModal;
