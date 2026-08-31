import React, { useState, useMemo, useDeferredValue, useEffect } from 'react';
import { Input } from '@telegram-apps/telegram-ui';
import { onBackButtonClick, showBackButton, hideBackButton } from '@telegram-apps/sdk-react';
import type { Service } from '../../types';
import { formatETB } from '../../constants';
import { useCategoryServices } from '../../hooks/useCategoryServices';
import { useApp } from '../../context/AppContext';
import { TextSkeleton } from '../Skeleton/SkeletonLoader';

interface Props {
    category: string;
    recommendedIds: number[];
    onSelect: (service: Service) => void;
    onClose: () => void;
}

const BATCH_SIZE = 50;


export function ServiceModal({ category, recommendedIds, onSelect, onClose }: Props) {
    const { isSyncingServices } = useApp();
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

    const { data: categoryServices = [], isLoading: loading, isFetching, isError } = useCategoryServices(category, recommendedIds);
    const showRateSkeleton = isSyncingServices || isFetching;

    // 2. Native Back Button Flow & Body Scroll Lock
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
                    Select Service
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
            
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingTop: '0px', paddingBottom: '150px' }} onScroll={handleScroll}>
                <div style={{ padding: '8px 0 12px' }}>
                    <Input
                        inputMode="search"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Search services..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="modal-search-input"
                    />
                </div>
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
                                                {showRateSkeleton ? <TextSkeleton width={55} height={12} /> : `${formatETB(svc.rate)} / 1000`}
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
    );
}