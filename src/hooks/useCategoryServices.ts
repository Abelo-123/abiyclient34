import { useQuery } from '@tanstack/react-query';
import { getServicesByCategory } from '../api';
import type { Service } from '../types';
import { useApp } from '../context/AppContext';
import { useMemo } from 'react';

export function useCategoryServices(category?: string, ids?: number[]) {
    const { services: appServices } = useApp();

    const derivedServices = useMemo<Service[]>(() => {
        if (!category && (!ids || ids.length === 0)) return [];
        if (category === 'Top Services' && ids && ids.length > 0) {
            const idSet = new Set(ids);
            return appServices.filter(s => idSet.has(s.id));
        }
        if (category) {
            return appServices.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }
        return [];
    }, [appServices, category, ids]);

    const query = useQuery<Service[]>({
        queryKey: ['services', 'category', category, ids?.join(',')],
        queryFn: async () => {
            const data = await getServicesByCategory(
                category,
                category === 'Top Services' ? ids : undefined
            );
            
            return data.map((s: any) => ({
                id: s.service || s.id,
                category: s.category,
                name: s.name,
                type: s.type,
                rate: parseFloat(s.rate),
                original_rate: parseFloat(s.original_rate ?? s.rate),
                min: s.min,
                max: s.max,
                averageTime: s.average_time || s.averageTime || '',
                refill: s.refill,
                cancel: s.cancel,
                custom_description: s.custom_description,
            }));
        },
        enabled: !!category || !!(ids && ids.length > 0),
        placeholderData: derivedServices,
        staleTime: 0,
        refetchOnMount: 'always',
    });

    const data = (query.data && query.data.length > 0) ? query.data : derivedServices;

    return {
        ...query,
        data,
        derivedServices,
    };
}
