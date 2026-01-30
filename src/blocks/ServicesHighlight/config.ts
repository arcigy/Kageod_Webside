import { Block } from 'payload'

export const ServicesHighlight: Block = {
    slug: 'servicesHighlight',
    interfaceName: 'ServicesHighlightBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Naše Služby',
        },
        {
            name: 'selectedServices',
            type: 'relationship',
            relationTo: 'services',
            hasMany: true,
            required: true,
        },
    ],
}
