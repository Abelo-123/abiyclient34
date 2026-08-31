import React from 'react';
import './SkeletonLoader.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export const BadgeSkeleton: React.FC<SkeletonProps> = ({ width, height, className = '', style }) => (
    <span
        className={`skeleton-shimmer skeleton-badge ${className}`}
        style={{ width, height, ...style }}
    />
);

export const CardSkeleton: React.FC<SkeletonProps> = ({ width, height, className = '', style }) => (
    <div
        className={`skeleton-shimmer skeleton-card ${className}`}
        style={{ width, height, ...style }}
    />
);

export const RowSkeleton: React.FC<SkeletonProps> = ({ width, height, className = '', style }) => (
    <div
        className={`skeleton-shimmer skeleton-row ${className}`}
        style={{ width, height, ...style }}
    />
);

export const TableRowSkeleton: React.FC<SkeletonProps> = ({ width, height, className = '', style }) => (
    <div
        className={`skeleton-shimmer skeleton-table-row ${className}`}
        style={{ width, height, ...style }}
    />
);

export const TextSkeleton: React.FC<SkeletonProps> = ({ width, height, className = '', style }) => (
    <span
        className={`skeleton-shimmer skeleton-text ${className}`}
        style={{ width, height, ...style }}
    />
);
