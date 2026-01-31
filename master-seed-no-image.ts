// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const masterSeedNoImage = async () => {
    const payload = await getPayload({ config })

    console.log('🚀 Starting TEXT Updates...')

    // --- HOME PAGE DATA ---
    const homeData = {
        title: 'Domov',
        slug: 'home',
        _status: 'published',
        hero: {
            type: 'lowImpact', // Medium Impact - text only for now
            richText: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'heading', tag: 'h1', children: [{ text: 'Geodetické práce, Zvolen', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                        { type: 'paragraph', children: [{ text: 'Spoľahlivé a profesionálne geodetické služby pre Zvolen a široké okolie.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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

    // --- SERVICES PAGE DATA ---
    const servicesData = {
        title: 'Naše služby',
        slug: 'sluzby',
        _status: 'published',
        hero: {
            type: 'lowImpact',
            richText: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'heading', tag: 'h1', children: [{ text: 'Kompletné geodetické služby', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
                                    { type: 'paragraph', children: [{ text: 'V geodetickej kancelárii Kageod vo Zvolene dokážeme svojim klientom ponúknuť kompletné geodetické služby, ktoré využijete pri stavbe nového domu i pri sporoch o hranice pozemkov. Svoj servis ponúkame zákazníkom nielen priamo vo Zvolene, ale i v jeho širokom okolí.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
    
    // --- ABOUT PAGE DATA ---
    const aboutData = {
        title: 'O firme',
        slug: 'o-nas',
        _status: 'published',
        hero: {
            type: 'lowImpact',
            richText: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'heading', tag: 'h1', children: [{ text: 'História a skúsenosti', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
                                    { type: 'paragraph', children: [{ text: 'Geodetickú kanceláriu Kageod sme vo Zvolene založili v roku 1990. Pod súčasným názvom sa tak poskytovaniu geodetických služieb venujeme už pekných pár rokov a za túto dobu sme stihli získať stovky spokojných klientov.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'paragraph', children: [{ text: 'Ing. Ján Kamenský a Ing. Rastislav Kamenský - Geodeti s dlhoročnou praxou.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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

    // --- CONTACT PAGE DATA ---
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
                        { type: 'heading', tag: 'h1', children: [{ text: 'Kontaktujte nás', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'KAGEOD s.r.o.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'paragraph', children: [{ text: 'Geodetická kancelária Zvolen', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'heading', tag: 'h4', children: [{ text: 'Telefón:', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'list', listType: 'bullet', children: [{ type: 'listitem', children: [{ text: '+421 45 547 97 83', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }, { type: 'listitem', children: [{ text: '+421 903 567 411', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'heading', tag: 'h4', children: [{ text: 'Email:', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                    { type: 'paragraph', children: [{ text: 'kageod@kageod.sk', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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


    // 3. Upsert Pages
    const upsertPage = async (data) => {
        console.log(`Doing page: ${data.slug}...`)
        const existing = await payload.find({ collection: 'pages', where: { slug: { equals: data.slug } } })
        let id;
        if (existing.docs.length > 0) {
            id = existing.docs[0].id
            await payload.update({ collection: 'pages', id, data })
            console.log(`✅ Updated ${data.slug}`)
        } else {
            const doc = await payload.create({ collection: 'pages', data })
            id = doc.id
            console.log(`✅ Created ${data.slug}`)
        }
        return id
    }

    const homeId = await upsertPage(homeData)
    const servicesId = await upsertPage(servicesData)
    const aboutId = await upsertPage(aboutData)
    const contactId = await upsertPage(contactData)

    // 4. Update Header
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

    // 5. Update Footer
    console.log('🦶 Updating Footer...')
    await payload.updateGlobal({
        slug: 'footer',
        data: {
            navItems: [
                { link: { type: 'reference', reference: { relationTo: 'pages', value: servicesId }, label: 'Geodézia Zvolen' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: contactId }, label: 'Kontakt' } },
            ]
        }
    })

    console.log('🎉 UPDATES COMPLETE!')
    process.exit(0)
}

masterSeedNoImage().catch(e => {
    console.error('ERROR:', e)
    process.exit(1)
})
