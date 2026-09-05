import { useEffect } from 'react';
import { onBackButtonClick, showBackButton, hideBackButton } from '@telegram-apps/sdk-react';

export function useModalLock(onClose?: () => void, isOpen: boolean = true) {
    useEffect(() => {
        if (!isOpen) return;

        const originalBodyOverflow = document.body.style.overflow;
        const originalDocOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const wrappers = document.querySelectorAll('.scroll-wrapper');
        const originalWrapperStyles: Array<{ el: HTMLElement; overflow: string; pointerEvents: string }> = [];

        wrappers.forEach((el) => {
            const htmlEl = el as HTMLElement;
            originalWrapperStyles.push({
                el: htmlEl,
                overflow: htmlEl.style.overflowY,
                pointerEvents: htmlEl.style.pointerEvents,
            });
            htmlEl.style.overflowY = 'hidden';
            htmlEl.style.pointerEvents = 'none';
        });

        let offBackButton: (() => void) | undefined;
        try {
            if (onClose) {
                showBackButton();
                offBackButton = onBackButtonClick(() => {
                    onClose();
                });
            }
        } catch (e) {
            console.error('Back button setup failed', e);
        }

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalDocOverflow;

            originalWrapperStyles.forEach(({ el, overflow, pointerEvents }) => {
                el.style.overflowY = overflow;
                el.style.pointerEvents = pointerEvents;
            });

            if (offBackButton) {
                try {
                    offBackButton();
                    hideBackButton();
                } catch { /* ignore */ }
            }
        };
    }, [isOpen, onClose]);
}
