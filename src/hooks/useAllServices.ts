import { useQuery } from '@tanstack/react-query';
import { getServices } from '../api';
import type { Service } from '../types';

export function useAllServices(forceRefresh = false) {
    return useQuery<Service[]>({
        queryKey: ['services', 'all', forceRefresh],
        queryFn: async () => {
            const data = await getServices(false, forceRefresh);
            return data.map((s: any) => ({
                 id: s.service || s.id,
                 category: s.category,
                 name: s.name,
                 type: s.type as Service['type'],
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
        staleTime: 3000, // 3 seconds so new database settings trigger instant skeleton re-sync
    });
}
