import React, { useState, useMemo, useDeferredValue, useEffect } from 'react';
import { Input } from '@telegram-apps/telegram-ui';
import { onBackButtonClick, showBackButton, hideBackButton } from '@telegram-apps/sdk-react';
import type { SocialPlatform } from '../../types';
import { useCategories } from '../../hooks/useCategories';
import { PLATFORM_ICONS } from '../../components/PlatformGrid/PlatformGrid';

interface Props {
    platform: SocialPlatform;
    onSelect: (category: string) => void;
    onClose: () => void;
}

export function CategoryModal({ platform, onSelect, onClose }: Props) {
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);
    const { data: rawCategories = [], isLoading: loading } = useCategories(platform);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        try {
            showBackButton();
            const off = onBackButtonClick(() => {
                onClose();
            });
            return () => {
                document.body.style.overflow = prev;
                off();
                hideBackButton();
            };
        } catch (e) {
            console.error('Back button setup failed', e);
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [onClose]);

    const categories = useMemo(() => {
        if (platform === 'top') return ['Top Services'];
        return rawCategories;
    }, [rawCategories, platform]);

    const filtered = useMemo(() => {
        if (!deferredSearch.trim()) return categories;
        const q = deferredSearch.toLowerCase();
        return categories.filter(c => c.toLowerCase().includes(q));
    }, [categories, deferredSearch]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: 'var(--tg-theme-bg-color, #1a1a2e)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease-out'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderBottom: '1px solid var(--tg-theme-hint-color, rgba(255,255,255,0.1))'
            }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--tg-theme-text-color, #ffffff)' }}>
                    Select Category
                </h2>
                <button 
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--tg-theme-text-color, #fff)',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingTop: '0px', paddingBottom: '150px' }}>
                <div style={{ padding: '8px 0 12px' }}>
                    <Input
                        inputMode="search"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="modal-search-input"
                    />
                </div>

                {loading ? (
                    <div style={{ padding: '16px' }}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="skeleton-row" style={{ margin: '16px 0' }}>
                                <div className="skeleton-bar" style={{ width: '65%' }}></div>
                                <div className="skeleton-bar" style={{ width: '25%', opacity: 0.6 }}></div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        No categories found
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {filtered.map(cat => (
                            <div
                                key={cat}
                                className="modal-item"
                                onClick={() => onSelect(cat)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    textAlign: 'left',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s ease',
                                    width: '100%',
                                }}
                            >
                                <div style={{ 
                                    marginRight: '12px', 
                                    fontSize: '18px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    width: '36px', 
                                    height: '36px', 
                                    background: 'rgba(124,92,252,0.15)', 
                                    borderRadius: '50%',
                                    flexShrink: 0
                                }}>
                                    {PLATFORM_ICONS[platform] || '📂'}
                                </div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    fontWeight: '600', 
                                    color: 'var(--tg-theme-text-color, #fff)',
                                    textAlign: 'left',
                                    flex: 1,
                                    wordBreak: 'break-word'
                                }}>{cat}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
