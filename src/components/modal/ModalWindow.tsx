import { useEffect, useRef } from 'react';
import { Button } from '../button/Button';
import styles from './modalWindow.module.scss';

type ModalWindowProps = {
  message: string | JSX.Element;
  onClose: () => void;
};

export const ModalWindow = ({ message, onClose }: ModalWindowProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleBackDropClose = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (!dialogRef.current) {
      return;
    }
    const modalRect = dialogRef.current.getBoundingClientRect();

    if (
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom
    ) {
      dialogRef.current.close();
      timerIdRef.current = setTimeout(() => {
        onClose();
      }, 400);
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [timerIdRef]);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    timerIdRef.current = setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <dialog className={styles.modalError} ref={dialogRef} onClick={handleBackDropClose}>
      <div className={styles.p}>{message}</div>
      <Button style={styles.modalErrorBtn} title="Close" type="button" onClick={handleClose} />
    </dialog>
  );
};
