// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const createFullContent = async () => {
    const payload = await getPayload({ config })

    console.log('Setting up full content...')
    
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
            type: 'mediumImpact', // Changed to Medium for better visibility
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
                            children: [{ text: 'Ing. Rastislav Kamenský - Zvolen a okolie', type: 'text', version: 1 }],
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
                                        type: 'paragraph',
                                        children: [{ text: 'Poskytujeme komplexné geodetické služby pre občanov aj firmy.', type: 'text', version: 1 }],
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

    // 2. Create Services Page (Placeholder)
    console.log('Creating Services Page...')
    const existingServices = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'sluzby' } }
    })
    let servicesId;
    if (existingServices.docs.length > 0) {
        servicesId = existingServices.docs[0].id
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: {
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
                                    children: [{ text: 'Naše Služby', type: 'text', version: 1 }],
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
        })
        servicesId = doc.id
    }

    // 3. Create Contact Page (Placeholder)
    console.log('Creating Contact Page...')
    const existingContact = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'kontakt' } }
    })
    let contactId;
    if (existingContact.docs.length > 0) {
        contactId = existingContact.docs[0].id
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: {
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
    
    console.log('✅ Content Created Successfully!')
    process.exit(0)
}

createFullContent().catch(e => {
    console.error('ERROR:', e)
    process.exit(1)
})
