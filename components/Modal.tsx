"use client";

import { useEffect } from "react";

type ModalProps ={
    open: boolean;
    title?: string;
    onClose: ()=> void;
    children: React.ReactNode;
}

export default function Modal({open, title, onClose, children}: ModalProps) {
    useEffect   (()=>{

        if(!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown",onKeyDown);
    
    }, [open, onClose]);

    if(!open) return null;

    
}