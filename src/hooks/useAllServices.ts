import { useQuery } from '@tanstack/react-query';
import { getServices } from '../api';
import type { Service } from '../types';
import { useApp } from '../context/AppContext';

export function useAllServices() {
    const { services: appServices } = useApp();

    const query = useQuery<Service[]>({
        queryKey: ['services', 'all'],
        queryFn: async () => {
            const data = await getServices(true);
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
        placeholderData: appServices,
        staleTime: 0,
        refetchOnMount: 'always',
    });

    const data = (query.data && query.data.length > 0) ? query.data : appServices;

    return {
        ...query,
        data,
    };
}
