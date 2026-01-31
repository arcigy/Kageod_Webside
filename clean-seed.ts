// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const cleanSeed = async () => {
    const payload = await getPayload({ config })
    console.log('🧹 STARTING CLEAN SEED...')

    // 1. Delete Pages function
    const deletePage = async (slug) => {
        const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
        if (existing.docs.length > 0) {
            console.log(`Deleting existing ${slug}...`)
            await payload.delete({ collection: 'pages', id: existing.docs[0].id })
        }
    }

    await deletePage('home')
    await deletePage('sluzby')
    await deletePage('o-nas')
    await deletePage('kontakt')

    // 2. Create Pages with SAFE Hero (type: none)
    const createPage = async (data) => {
        console.log(`Creating ${data.slug}...`)
        const doc = await payload.create({ collection: 'pages', data })
        return doc.id
    }

    // --- content blocks ---
    const homeContent = [
        {
            blockType: 'content',
            columns: [
                {
                    size: 'full',
                    richText: {
                        root: {
                            type: 'root',
                            children: [
                                { type: 'heading', tag: 'h1', children: [{ text: 'Geodetické práce, Zvolen', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                { type: 'paragraph', children: [{ text: 'Spoľahlivé a profesionálne geodetické služby pre Zvolen a široké okolie.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
                            ],
                            direction: 'ltr', format: '', indent: 0, version: 1
                        }
                    }
                },
                {
                    size: 'full',
                    richText: {
                        root: {
                            type: 'root',
                            children: [
                                { type: 'heading', tag: 'h2', children: [{ text: 'O nás', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                { type: 'paragraph', children: [{ text: 'V spoločnosti Kageod poskytujeme svoje služby všetkým klientom zo širokého okolia Zvolena. Pokiaľ potrebujete niekoho, kto pre Vás geodetické služby vykoná spoľahlivo a profesionálne, skúste sa nám ozvať a informovať sa o podrobnostiach!', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                { type: 'heading', tag: 'h2', children: [{ text: 'Naše služby', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                {
                                    type: 'list',
                                    listType: 'bullet',
                                    children: [
                                        { type: 'listitem', children: [{ text: 'Vytyčovanie hraníc pozemkov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                        { type: 'listitem', children: [{ text: 'Zameriavanie stavieb', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                        { type: 'listitem', children: [{ text: 'Tvorba geometrických plánov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                        { type: 'listitem', children: [{ text: 'Inžinierska geodézia', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    ],
                                    version: 1,
                                    direction: 'ltr', format: '', indent: 0
                                }
                            ],
                            direction: 'ltr', format: '', indent: 0, version: 1
                        }
                    }
                }
            ]
        }
    ]

    const servicesContent = [
        {
            blockType: 'content',
            columns: [{
                size: 'full',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            { type: 'heading', tag: 'h1', children: [{ text: 'Naše služby', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                            { type: 'paragraph', children: [{ text: 'V geodetickej kancelárii Kageod vo Zvolene dokážeme svojim klientom ponúknuť kompletné geodetické služby, ktoré využijete pri stavbe nového domu i pri sporoch o hranice pozemkov.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
                        ],
                        direction: 'ltr', format: '', indent: 0, version: 1
                    }
                }
            }]
        }
    ]

    const aboutContent = [
        {
            blockType: 'content',
            columns: [{
                size: 'full',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            { type: 'heading', tag: 'h1', children: [{ text: 'O nás', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                            { type: 'paragraph', children: [{ text: 'Geodetickú kanceláriu Kageod sme vo Zvolene založili v roku 1990.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
                        ],
                        direction: 'ltr', format: '', indent: 0, version: 1
                    }
                }
            }]
        }
    ]

    const contactContent = [
        {
            blockType: 'content',
            columns: [{
                size: 'full',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            { type: 'heading', tag: 'h1', children: [{ text: 'Kontakt', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                            { type: 'paragraph', children: [{ text: 'KAGEOD s.r.o. - Geodetická kancelária Zvolen', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                            { type: 'paragraph', children: [{ text: 'Tel: +421 903 567 411', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                            { type: 'paragraph', children: [{ text: 'Email: kageod@kageod.sk', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
                        ],
                        direction: 'ltr', format: '', indent: 0, version: 1
                    }
                }
            }]
        }
    ]


    const homeId = await createPage({ title: 'Domov', slug: 'home', _status: 'published', hero: { type: 'none' }, layout: homeContent })
    const servicesId = await createPage({ title: 'Služby', slug: 'sluzby', _status: 'published', hero: { type: 'none' }, layout: servicesContent })
    const aboutId = await createPage({ title: 'O nás', slug: 'o-nas', _status: 'published', hero: { type: 'none' }, layout: aboutContent })
    const contactId = await createPage({ title: 'Kontakt', slug: 'kontakt', _status: 'published', hero: { type: 'none' }, layout: contactContent })

    // 3. Update Header
    console.log('🔗 Updating Header...')
    await payload.updateGlobal({
        slug: 'header',
        data: {
            navItems: [
                { link: { type: 'reference', reference: { relationTo: 'pages', value: homeId }, label: 'DOMOV' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: aboutId }, label: 'O NÁS' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: servicesId }, label: 'SLUŽBY' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: contactId }, label: 'KONTAKT' } },
            ]
        }
    })

    console.log('✅ CLEAN SEED DONE!')
    process.exit(0)
}

cleanSeed().catch(console.error)
