// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const createSimpleContent = async () => {
    const payload = await getPayload({ config })

    console.log('Creating Home page with content...')
    
    // Check existing
    const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } }
    })
    
    let homeId;

    const contentBlock = {
        blockType: 'content',
        columns: [
            {
                size: 'full',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        detail: 0,
                                        format: 0,
                                        mode: 'normal',
                                        style: '',
                                        text: 'Vitajte na stránke Geodetickej kancelárie Ing. Rastislav Kamenský.',
                                        type: 'text',
                                        version: 1
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

    if (existing.docs.length > 0) {
            console.log('Home page exists, updating...')
            homeId = existing.docs[0].id
            await payload.update({
                collection: 'pages',
                id: homeId,
                data: {
                    _status: 'published',
                    title: 'Domov',
                    hero: {
                        type: 'lowImpact',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h1',
                                        children: [
                                            {
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: 'Geodetická kancelária - Ing. Rastislav Kamenský',
                                                type: 'text',
                                                version: 1
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
                    },
                    layout: [contentBlock]
                }
            })
    } else {
            console.log('Creating new...')
            const doc = await payload.create({
                collection: 'pages',
                data: {
                    title: 'Domov',
                    slug: 'home',
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
                                        children: [
                                            {
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: 'Geodetická kancelária - Ing. Rastislav Kamenský',
                                                type: 'text',
                                                version: 1
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
                    },
                    layout: [contentBlock]
                }
            })
            homeId = doc.id
    }

    console.log('Updating Globals...')
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
                }
            ]
        }
    })
    
    console.log('Done!')
    process.exit(0)
}

createSimpleContent().catch(e => {
    console.error('ERROR FULL:', JSON.stringify(e, null, 2))
    process.exit(1)
})
