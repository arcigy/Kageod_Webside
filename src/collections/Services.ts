import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'updatedAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'icon',
            type: 'select',
            options: [
                { label: 'Mapa', value: 'map' },
                { label: 'Budova', value: 'building' },
                { label: 'Pravítko', value: 'ruler' },
                { label: 'Radar', value: 'radar' },
            ],
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}
