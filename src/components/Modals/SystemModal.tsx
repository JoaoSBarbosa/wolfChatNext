"use client";

import {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface ISystemModal {
    open: boolean;
    onClose: () => void;
    children: ReactNode;

}

export const SystemModal = ({children, onClose, open}: ISystemModal) => {

    return (
        <AnimatePresence>
            {open && (
                <div className={"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"}>
                    <motion.div
                        initial={{ opacity: 0, y:-50}}
                        animate={{ opacity: 1, y: 0}}
                        exit={{ opacity: 0, y: -50}}
                        transition={{ duration: 0.2}}
                        className={"bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"}
                        >
                        <button onClick={onClose} className={"absolute top-2 right-2 text-gray-600 hover:text-gray-900"}>X</button>
                        { children }
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )
}