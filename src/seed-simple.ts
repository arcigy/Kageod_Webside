import { getPayload } from 'payload'
import config from './payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

const seed = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding Pages...')
    const existingPages = await payload.find({ collection: 'pages' })
    if (existingPages.totalDocs > 0) {
        console.log('Pages already exist, skipping page seed.')
    } else {
        await payload.create({
            collection: 'pages',
            data: {
                title: 'Home',
                slug: 'home',
                _status: 'published',
                layout: [
                    {
                        blockType: 'content',
                        columns: [
                            {
                                size: 'full',
                                richText: {
                                    root: {
                                        type: 'root',
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
                                        version: 1,
                                        children: [
                                            {
                                                type: 'heading',
                                                children: [{ text: 'Geodetická kancelária - Ing. Rastislav Kamenský' }],
                                                tag: 'h1',
                                                version: 1,
                                            },
                                            {
                                                type: 'paragraph',
                                                children: [{ text: 'Profesionálne geodetické služby vo Zvolene a v celom Banskobystrickom kraji.' }],
                                                version: 1,
                                            },
                                        ],
                                    },
                                },
                            }
                        ]
                    }
                ]
            }
        })
        console.log('Home page created.')
    }

    console.log('Seeding Header...')
    try {
        const homePage = await payload.find({
            collection: 'pages',
            where: { slug: { equals: 'home' } }
        })
        const homeId = homePage.docs[0]?.id

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
        console.log('Header seeded.')
    } catch (e: any) {
        console.log('Header seed failed:', e.message)
    }

    console.log('Seeding Footer...')
    try {
        await payload.updateGlobal({
            slug: 'footer',
            data: {
                navItems: []
            }
        })
        console.log('Footer seeded.')
    } catch (e: any) {
        console.log('Footer seed failed:', e.message)
    }

    process.exit(0)
}

seed()
