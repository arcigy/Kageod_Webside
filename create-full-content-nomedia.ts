// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const createFullContentNoMedia = async () => {
    const payload = await getPayload({ config })

    console.log('Setting up content (Text Only)...')
    
    // 1. Get or Create Home Page
    const existingHome = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } }
    })
    
    let homeId;
    const homeData = {
        title: 'Domov',
        slug: 'home',
        _status: 'published',
        hero: {
            type: 'lowImpact', // Low Impact doesn't require media
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Geodetická kancelária', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Ing. Rastislav Kamenský - Profesionálne geodetické služby vo Zvolene a okolí.', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                }
            }
        },
        layout: [
            {
                blockType: 'content',
                columns: [
                    {
                        size: 'full',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h2',
                                        children: [{ text: 'Naše služby', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Vytyčovanie stavieb', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            },
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Geometrické plány', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            },
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Polohopisné a výškopisné plány', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            }
                                        ],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    }
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                version: 1
                            }
                        }
                    }
                ]
            }
        ]
    }

    if (existingHome.docs.length > 0) {
        console.log('Updating Home...')
        homeId = existingHome.docs[0].id
        await payload.update({
            collection: 'pages',
            id: homeId,
            data: homeData
        })
    } else {
        console.log('Creating Home...')
        const doc = await payload.create({
            collection: 'pages',
            data: homeData
        })
        homeId = doc.id
    }

    // 2. Create Services Page
    console.log('Creating Services Page...')
    const existingServices = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'sluzby' } }
    })
    
    let servicesId;
    const servicesData = {
        title: 'Služby',
        slug: 'sluzby',
        _status: 'published',
        hero: {
            type: 'lowImpact',
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Ponuka služieb', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                }
            }
        },
        layout: []
    }

    if (existingServices.docs.length > 0) {
        servicesId = existingServices.docs[0].id
        await payload.update({
            collection: 'pages',
            id: servicesId,
            data: servicesData
        })
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: servicesData
        })
        servicesId = doc.id
    }

    // 3. Create Contact Page
    console.log('Creating Contact Page...')
    const existingContact = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'kontakt' } }
    })
    
    let contactId;
    const contactData = {
        title: 'Kontakt',
        slug: 'kontakt',
        _status: 'published',
        hero: {
            type: 'lowImpact',
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Kontaktujte nás', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                }
            }
        },
        layout: []
    }

    if (existingContact.docs.length > 0) {
        contactId = existingContact.docs[0].id
        await payload.update({
            collection: 'pages',
            id: contactId,
            data: contactData
        })
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: contactData
        })
        contactId = doc.id
    }

    // 4. Update Header with Links
    console.log('Updating Header Menu...')
    await payload.updateGlobal({
        slug: 'header',
        data: {
            navItems: [
                {
                    link: {
                        type: 'reference',
                        reference: { relationTo: 'pages', value: homeId },
                        label: 'Domov',
                    }
                },
                {
                    link: {
                        type: 'reference',
                        reference: { relationTo: 'pages', value: servicesId },
                        label: 'Služby',
                    }
                },
                {
                    link: {
                        type: 'reference',
                        reference: { relationTo: 'pages', value: contactId },
                        label: 'Kontakt',
                    }
                }
            ]
        }
    })
    
    console.log('✅ Content & Menu Created Successfully!')
    process.exit(0)
}

createFullContentNoMedia().catch(e => {
    console.error('ERROR:', e)
    process.exit(1)
})
