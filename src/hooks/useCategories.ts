import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api';
import { useApp } from '../context/AppContext';
import { useMemo } from 'react';

export function useCategories(platform: string) {
    const { services } = useApp();

    const derivedFromServices = useMemo(() => {
        if (!platform) return [];
        if (platform === 'top') return ['Top Services'];
        
        const matching = services.filter(s => {
            const text = (s.category + ' ' + s.name).toLowerCase();
            if (platform === 'youtube') return text.includes('youtube') || text.includes('yt ');
            if (platform === 'tiktok') return text.includes('tiktok') || text.includes('tik tok');
            if (platform === 'telegram') return text.includes('telegram') || text.includes('tg ');
            if (platform === 'instagram') return text.includes('instagram') || text.includes('ig ');
            if (platform === 'twitter') return text.includes('twitter') || text.includes(' x ') || text.startsWith('x ') || text.includes('x/');
            if (platform === 'facebook') return text.includes('facebook') || text.includes('fb ');
            return true;
        });

        const categoriesSet = new Set<string>();
        matching.forEach(s => {
            if (s.category) categoriesSet.add(s.category);
        });

        return Array.from(categoriesSet);
    }, [services, platform]);

    const query = useQuery<string[]>({
        queryKey: ['categories', platform],
        queryFn: () => getCategories(platform),
        placeholderData: derivedFromServices,
        staleTime: 0,
        refetchOnMount: 'always',
    });

    const data = (query.data && query.data.length > 0) ? query.data : derivedFromServices;

    return {
        ...query,
        data,
        derivedFromServices,
    };
}
