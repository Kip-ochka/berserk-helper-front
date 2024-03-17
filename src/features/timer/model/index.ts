import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react/compat";

const $isTimerOpen = createStore(false);
const timerOpenButtonClicked = createEvent();
$isTimerOpen.on(timerOpenButtonClicked, (isOpen) => !isOpen);

export const useTimer = () => {
  const { isOpen, setIsOpen } = useUnit({
    isOpen: $isTimerOpen,
    setIsOpen: timerOpenButtonClicked,
  });
  return { isOpen, setIsOpen };
};
