import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const createHomepage = async () => {
    const payload = await getPayload({ config })

    console.log('Checking for existing home page...')
    const existingPages = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } }
    })

    if (existingPages.docs.length > 0) {
        console.log('Deleting existing home page...')
        await payload.delete({
            collection: 'pages',
            id: existingPages.docs[0].id
        })
    }

    console.log('Creating new home page...')
    const homePage = await payload.create({
        collection: 'pages',
        data: {
            title: 'Domov',
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
                                            children: [{ text: 'Geodetická kancelária - Ing. Rastislav Kamenský', type: 'text' }],
                                            tag: 'h1',
                                            version: 1,
                                        },
                                        {
                                            type: 'paragraph',
                                            children: [{ text: 'Profesionálne geodetické služby vo Zvolene a v celom Banskobystrickom kraji.', type: 'text' }],
                                            version: 1,
                                        },
                                        {
                                            type: 'heading',
                                            children: [{ text: 'Naše služby', type: 'text' }],
                                            tag: 'h2',
                                            version: 1,
                                        },
                                        {
                                            type: 'paragraph',
                                            children: [{ text: 'Poskytujeme komplexné geodetické služby vrátane:', type: 'text' }],
                                            version: 1,
                                        },
                                        {
                                            type: 'list',
                                            listType: 'bullet',
                                            children: [
                                                {
                                                    type: 'listitem',
                                                    children: [{ text: 'Vytyčovanie stavieb', type: 'text' }],
                                                    version: 1,
                                                },
                                                {
                                                    type: 'listitem',
                                                    children: [{ text: 'Zameranie skutočného vyhotovenia stavby', type: 'text' }],
                                                    version: 1,
                                                },
                                                {
                                                    type: 'listitem',
                                                    children: [{ text: 'Geometrické plány', type: 'text' }],
                                                    version: 1,
                                                },
                                                {
                                                    type: 'listitem',
                                                    children: [{ text: 'Inžinierska geodézia', type: 'text' }],
                                                    version: 1,
                                                },
                                            ],
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

    console.log('✅ Home page created successfully!')
    console.log('Page ID:', homePage.id)

    console.log('\nUpdating header...')
    await payload.updateGlobal({
        slug: 'header',
        data: {
            navItems: [
                {
                    link: {
                        type: 'reference',
                        reference: { relationTo: 'pages', value: homePage.id },
                        label: 'Domov',
                    }
                }
            ]
        }
    })
    console.log('✅ Header updated!')

    console.log('\nUpdating footer...')
    await payload.updateGlobal({
        slug: 'footer',
        data: {
            navItems: []
        }
    })
    console.log('✅ Footer updated!')

    console.log('\n🎉 All done! Visit https://kageodwebside-production.up.railway.app')
    process.exit(0)
}

createHomepage().catch(console.error)
