import { useState } from "react";

export const useModalState = () => {
  const [modalState, setModalState] = useState({ show: false, action: "" });

  const showModal = (action) => setModalState({ show: true, action });
  const hideModal = () => setModalState({ show: false, action: "" });

  return { modalState, showModal, hideModal };
};
