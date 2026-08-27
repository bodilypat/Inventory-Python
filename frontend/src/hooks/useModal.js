/* *************************** */
/* File: src/hooks/useModal.js */ 
/* *************************** */

import { useCallback, useState } from "react";

const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen((current) => !current);
    }, []);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };
};

export default useModal;

