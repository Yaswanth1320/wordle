import { useCallback, useState } from "react";
import { GAME_CONFIG } from "../constants/gameConstants";

export const useModals = () => {
  const [showInvalidWordModal, setShowInvalidWordModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showQuickInvalidModal, setShowQuickInvalidModal] = useState(false);

  const showQuickInvalidWordModal = useCallback(() => {
    setShowQuickInvalidModal(true);
    setTimeout(() => {
      setShowQuickInvalidModal(false);
    }, GAME_CONFIG.QUICK_MODAL_DURATION);
  }, []);

  const showGameOverModalHandler = useCallback(() => {
    setShowGameOverModal(true);
  }, []);

  const hideGameOverModal = useCallback(() => {
    setShowGameOverModal(false);
  }, []);

  const showInvalidWordModalHandler = useCallback(() => {
    setShowInvalidWordModal(true);
  }, []);

  const hideInvalidWordModal = useCallback(() => {
    setShowInvalidWordModal(false);
  }, []);

  const hideAllModals = useCallback(() => {
    setShowInvalidWordModal(false);
    setShowGameOverModal(false);
    setShowQuickInvalidModal(false);
  }, []);

  return {
    showInvalidWordModal,
    showGameOverModal,
    showQuickInvalidModal,
    showQuickInvalidWordModal,
    showGameOverModalHandler,
    hideGameOverModal,
    showInvalidWordModalHandler,
    hideInvalidWordModal,
    hideAllModals,
  };
};
