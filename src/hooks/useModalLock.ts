import { useEffect } from 'react';
import { onBackButtonClick, showBackButton, hideBackButton } from '@telegram-apps/sdk-react';

export function useModalLock(onClose: () => void) {
    useEffect(() => {
        // 1. Lock all background scroll containers (.scroll-wrapper, body, html)
        const scrollWrappers = document.querySelectorAll('.scroll-wrapper');
        scrollWrappers.forEach(el => {
            (el as HTMLElement).style.overflowY = 'hidden';
            (el as HTMLElement).style.pointerEvents = 'none';
        });

        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // 2. Setup Telegram native back button
        let off: (() => void) | undefined;
        try {
            showBackButton();
            off = onBackButtonClick(() => {
                onClose();
            });
        } catch (e) {
            console.error('Back button setup failed', e);
        }

        // 3. Cleanup on modal unmount
        return () => {
            scrollWrappers.forEach(el => {
                (el as HTMLElement).style.overflowY = 'auto';
                (el as HTMLElement).style.pointerEvents = 'auto';
            });
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
            if (off) off();
            try {
                hideBackButton();
            } catch { /* noop */ }
        };
    }, [onClose]);
}
