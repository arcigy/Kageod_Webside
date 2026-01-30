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

    console.log('Seeding Media...')

    // Check if media already exists
    const existingMedia = await payload.find({ collection: 'media' })
    if (existingMedia.totalDocs > 0) {
        console.log('Media already exists, skipping media seed.')
    } else {
        const logo = await payload.create({
            collection: 'media',
            data: { alt: 'Kageod Logo' },
            filePath: path.resolve(dirname, '../public/media/logo.png'),
        })
        const hero = await payload.create({
            collection: 'media',
            data: { alt: 'Kageod Hero' },
            filePath: path.resolve(dirname, '../public/media/hero.png'),
        })
        const services = await payload.create({
            collection: 'media',
            data: { alt: 'Kageod Services' },
            filePath: path.resolve(dirname, '../public/media/services.png'),
        })

        console.log('Media seeded.')
    }

    console.log('Seeding Pages...')
    const existingPages = await payload.find({ collection: 'pages' })
    if (existingPages.totalDocs > 0) {
        console.log('Pages already exist, skipping page seed.')
    } else {
        // Find media items for IDs
        const media = await payload.find({ collection: 'media' })
        const heroImage = media.docs.find(m => m.alt === 'Kageod Hero')

        await payload.create({
            collection: 'pages',
            data: {
                title: 'Home',
                slug: 'home',
                _status: 'published',
                hero: {
                    type: 'highImpact',
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
                                    children: [{ text: 'Precízna geodézia pre vaše projekty' }],
                                    tag: 'h1',
                                    version: 1,
                                },
                                {
                                    type: 'paragraph',
                                    children: [{ text: 'Sme vaším spoľahlivým partnerom v oblasti inžinierskej geodézie, katastra a vytyčovania stavieb.' }],
                                    version: 1,
                                },
                            ],
                        },
                    },
                    media: heroImage?.id,
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
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
                                        version: 1,
                                        children: [
                                            {
                                                type: 'heading',
                                                children: [{ text: 'Naše Služby' }],
                                                tag: 'h2',
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
                    },
                    {
                        link: {
                            type: 'custom',
                            url: '/sluzby',
                            label: 'Služby',
                        }
                    },
                    {
                        link: {
                            type: 'custom',
                            url: '/kontakt',
                            label: 'Kontakt',
                        }
                    }
                ]
            }
        })
        console.log('Header seeded.')
    } catch (e: any) {
        console.log('Header seed failed:', e.message)
    }

    process.exit(0)
}

seed()
