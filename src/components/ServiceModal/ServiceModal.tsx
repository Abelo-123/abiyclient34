import React, { useState, useMemo, useDeferredValue, useEffect } from 'react';
// Removed unused imports
import { onBackButtonClick, showBackButton, hideBackButton } from '@telegram-apps/sdk-react';
import type { Service } from '../../types';
import { formatETB } from '../../constants';
import { useCategoryServices } from '../../hooks/useCategoryServices';

interface Props {
    category: string;
    recommendedIds: number[];
    onSelect: (service: Service) => void;
    onClose: () => void;
}

const BATCH_SIZE = 50;


export function ServiceModal({ category, recommendedIds, onSelect, onClose }: Props) {
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

    const { data: categoryServices = [], isLoading: loading, isError } = useCategoryServices(category, recommendedIds);

    // 2. Native Back Button Flow
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

    const filtered = useMemo(() => {
        if (!deferredSearch.trim()) return categoryServices;
        const q = deferredSearch.toLowerCase();
        return categoryServices.filter(s =>
            s.name.toLowerCase().includes(q) || s.id.toString().includes(q)
        );
    }, [categoryServices, deferredSearch]);

    const visibleServices = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const hasMore = visibleCount < filtered.length;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop - target.clientHeight < 200 && hasMore) {
            setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filtered.length));
        }
    };

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
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--tg-theme-text-color, #ffffff)' }}>Select Service</span>
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
                        placeholder="Search services..."
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

                <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 16px' }} onScroll={handleScroll}>
                    {loading ? (
                        <div style={{ padding: '16px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="skeleton-row" style={{ margin: '16px 0' }}>
                                    <div className="skeleton-bar" style={{ width: '70%' }}></div>
                                    <div className="skeleton-bar" style={{ width: '40%', opacity: 0.6 }}></div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                            Failed to load services
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                            No services found
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {visibleServices.map(svc => (
                                <div
                                    key={svc.id}
                                    onClick={() => onSelect(svc)}
                                    className="modal-item"
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
                                        gap: '12px'
                                    }}
                                >
                                    <div className="svc-id-pill" style={{ 
                                        fontSize: '11px', 
                                        padding: '4px 8px', 
                                        background: 'rgba(124, 92, 252, 0.15)', 
                                        color: 'var(--accent)', 
                                        borderRadius: '6px', 
                                        fontWeight: 'bold',
                                        flexShrink: 0
                                    }}>
                                        #{svc.id}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                        <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--tg-theme-text-color, #fff)', lineHeight: '1.3', wordBreak: 'break-word' }}>
                                            {svc.name}
                                        </span>
                                        <div className="svc-footer" style={{ fontSize: '11px', color: 'var(--tg-theme-hint-color)', marginTop: '2px' }}>
                                            <span className="svc-price" style={{ color: '#00d68f', fontWeight: 'bold' }}>
                                                {formatETB(svc.rate)} / 1000
                                            </span>
                                            <span className="svc-limits"> | Min: {svc.min} | Max: {svc.max.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {hasMore && (
                                <div
                                    style={{
                                        padding: '14px 16px',
                                        textAlign: 'center',
                                        color: 'var(--tg-theme-link-color, #6ab3f3)',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                    onClick={() => setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filtered.length))}
                                >
                                    Load more ({filtered.length - visibleCount} remaining)
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}