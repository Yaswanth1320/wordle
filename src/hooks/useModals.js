import { useState, useCallback } from "react";
import { MODAL_TYPES, GAME_CONFIG } from "../constants/gameConstants";

/**
 * Custom hook for managing modal states
 */
export const useModals = () => {
  const [showInvalidWordModal, setShowInvalidWordModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showQuickInvalidModal, setShowQuickInvalidModal] = useState(false);

  /**
   * Show quick invalid word modal (auto-hides after 1 second)
   */
  const showQuickInvalidWordModal = useCallback(() => {
    setShowQuickInvalidModal(true);
    setTimeout(() => {
      setShowQuickInvalidModal(false);
    }, GAME_CONFIG.QUICK_MODAL_DURATION);
  }, []);

  /**
   * Show game over modal
   */
  const showGameOverModalHandler = useCallback(() => {
    setShowGameOverModal(true);
  }, []);

  /**
   * Hide game over modal
   */
  const hideGameOverModal = useCallback(() => {
    setShowGameOverModal(false);
  }, []);

  /**
   * Show invalid word modal
   */
  const showInvalidWordModalHandler = useCallback(() => {
    setShowInvalidWordModal(true);
  }, []);

  /**
   * Hide invalid word modal
   */
  const hideInvalidWordModal = useCallback(() => {
    setShowInvalidWordModal(false);
  }, []);

  /**
   * Hide all modals
   */
  const hideAllModals = useCallback(() => {
    setShowInvalidWordModal(false);
    setShowGameOverModal(false);
    setShowQuickInvalidModal(false);
  }, []);

  return {
    // Modal states
    showInvalidWordModal,
    showGameOverModal,
    showQuickInvalidModal,

    // Modal actions
    showQuickInvalidWordModal,
    showGameOverModalHandler,
    hideGameOverModal,
    showInvalidWordModalHandler,
    hideInvalidWordModal,
    hideAllModals,
  };
};
