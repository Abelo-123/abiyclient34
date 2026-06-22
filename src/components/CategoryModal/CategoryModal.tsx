import React, { useState, useMemo, useDeferredValue, useEffect } from 'react';
// Removed unused imports
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
        try {
            showBackButton();
            const off = onBackButtonClick(() => {
                onClose();
            });
            return () => {
                off();
                hideBackButton();
            };
        } catch (e) {
            console.error('Back button setup failed', e);
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
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--tg-theme-bg-color, #1a1a2e)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                height: '60vh',
                maxHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                animation: 'scaleIn 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            }} onClick={e => e.stopPropagation()}>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--tg-theme-text-color, #ffffff)' }}>Select Category</span>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: 'none',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >✕</button>
                </div>
                
                <div style={{ padding: '12px 16px 8px' }}>
                    <input
                        type="text"
                        inputMode="search"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: 'rgba(0,0,0,0.15)',
                            color: 'var(--tg-theme-text-color, #fff)',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 16px' }}>
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
                                        padding: '12px 16px',
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
                                        width: '32px', 
                                        height: '32px', 
                                        background: 'rgba(124,92,252,0.12)', 
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    }}>
                                        {PLATFORM_ICONS[platform] || '📂'}
                                    </div>
                                    <div style={{ 
                                        fontSize: '14px', 
                                        fontWeight: '500', 
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
        </div>
    );
}
