// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const sequentialSeed = async () => {
    const payload = await getPayload({ config })
    console.log('🐢 STARTING SEQUENTIAL SEED (Slow & Robust)...')

    // Data definitions (same as before but we will use them carefully)
    const homeData = {
        title: 'Domov', slug: 'home', _status: 'published',
        hero: {
            type: 'lowImpact',
            richText: { root: { type: 'root', children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Geodetické práce, Zvolen', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } }
        },
        layout: [
            {
                blockType: 'content',
                columns: [{ size: 'full', richText: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: 'V spoločnosti Kageod poskytujeme geodetické služby.', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } } }]
            }
        ]
    }

    const servicesData = {
        title: 'Služby', slug: 'sluzby', _status: 'published',
        hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Služby', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
        layout: []
    }

    const aboutData = {
        title: 'O nás', slug: 'o-nas', _status: 'published',
        hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [{ type: 'heading', tag: 'h1', children: [{ text: 'O nás', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
        layout: []
    }

    const contactData = {
        title: 'Kontakt', slug: 'kontakt', _status: 'published',
        hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Kontakt', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
        layout: []
    }

    // Helper function
    const processPage = async (data) => {
        console.log(`\n⏳ Processing ${data.slug}...`)
        try {
            const existing = await payload.find({ collection: 'pages', where: { slug: { equals: data.slug } } })
            
            let id;
            if (existing.docs.length > 0) {
                id = existing.docs[0].id
                console.log(`   Found existing ID: ${id}. Updating...`)
                await payload.update({ collection: 'pages', id, data })
                console.log(`   ✅ Update Success: ${data.slug}`)
            } else {
                console.log(`   Not found. Creating...`)
                const doc = await payload.create({ collection: 'pages', data })
                id = doc.id
                console.log(`   ✅ Create Success: ${data.slug}`)
            }
            return id
        } catch (e) {
            console.error(`   ❌ ERROR on ${data.slug}:`, e.message)
            if (e.data) console.error('   Details:', JSON.stringify(e.data))
            return null // Return null on failure but continue script
        }
    }

    // 1. Process Pages Sequentially
    const homeId = await processPage(homeData); await sleep(1000);
    const servicesId = await processPage(servicesData); await sleep(1000);
    const aboutId = await processPage(aboutData); await sleep(1000);
    const contactId = await processPage(contactData); await sleep(1000);

    // 2. Update Header
    console.log('\n🔗 Updating Header...')
    try {
        await payload.updateGlobal({
            slug: 'header',
            data: {
                navItems: [
                    homeId ? { link: { type: 'reference', reference: { relationTo: 'pages', value: homeId }, label: 'DOMOV' } } : null,
                    servicesId ? { link: { type: 'reference', reference: { relationTo: 'pages', value: servicesId }, label: 'SLUŽBY' } } : null,
                    aboutId ? { link: { type: 'reference', reference: { relationTo: 'pages', value: aboutId }, label: 'O NÁS' } } : null,
                    contactId ? { link: { type: 'reference', reference: { relationTo: 'pages', value: contactId }, label: 'KONTAKT' } } : null,
                ].filter(Boolean) // Filter out nulls if some pages failed
            }
        })
        console.log('   ✅ Header Updated')
    } catch (e) {
        console.error('   ❌ Header Update Error:', e.message)
    }

    console.log('\n🏁 SEQUENTIAL SEED FINISHED.')
    process.exit(0)
}

sequentialSeed().catch(e => {
    console.error('FATAL:', e)
    process.exit(1)
})
