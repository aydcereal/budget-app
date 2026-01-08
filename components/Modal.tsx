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

    return(
        <div 
         className="fixed inset-0 z-50 flex items-center justify-center"
         aria-modal="true"
         role="dialog">

            <div
             className="absolute inset-0 bg-black/50"
             onClick={onClose}/>

             <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="text-xl text-secondary-text font-semibold">{title ?? "Modal  "}</h2>
                    <button 
                      onClick={onClose}
                      className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      aria-label="Close"
                      type="button">
                            x
                    </button>
                </div>
                {children}
             </div>


             
         </div>
    )

    
}