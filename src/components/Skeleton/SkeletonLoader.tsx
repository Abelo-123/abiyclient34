import React from 'react';
import './SkeletonLoader.css';

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
}

export function BadgeSkeleton({ className = '', style, width, height }: SkeletonProps) {
    return (
        <span
            className={`skeleton-shimmer badge-skeleton ${className}`}
            style={{ width, height, ...style }}
        />
    );
}

export function TextSkeleton({ className = '', style, width, height }: SkeletonProps) {
    return (
        <span
            className={`skeleton-shimmer text-skeleton ${className}`}
            style={{ width, height, ...style }}
        />
    );
}

export function CardSkeleton({ className = '', style, width, height }: SkeletonProps) {
    return (
        <div
            className={`skeleton-shimmer skeleton-modal-card ${className}`}
            style={{ width, height, ...style }}
        />
    );
}
