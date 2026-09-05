import { useEffect } from 'react';

export function useModalLock(isOpen: boolean = true) {
    useEffect(() => {
        if (!isOpen) return;
        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const wrappers = document.querySelectorAll('.scroll-wrapper');
        wrappers.forEach((el) => {
            (el as HTMLElement).style.overflow = 'hidden';
        });

        return () => {
            document.body.style.overflow = originalStyle;
            wrappers.forEach((el) => {
                (el as HTMLElement).style.overflow = '';
            });
        };
    }, [isOpen]);
}
