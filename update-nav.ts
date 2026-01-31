// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const updateNav = async () => {
    const payload = await getPayload({ config })
    console.log('🔗 UPDATING NAVIGATION...')

    // 1. Get IDs of the new pages
    const getPageId = async (slug) => {
        const res = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
        return res.docs[0]?.id
    }

    const homeId = await getPageId('home')
    const servicesId = await getPageId('sluzby')
    const aboutId = await getPageId('o-nas')
    const contactId = await getPageId('kontakt')

    console.log(`IDs Found: Home=${homeId}, Services=${servicesId}, About=${aboutId}, Contact=${contactId}`)

    if (!homeId) {
        console.error('CRITICAL: Home page missing!')
        process.exit(1)
    }

    // 2. Update Header
    console.log('Updating Header...')
    await payload.updateGlobal({
        slug: 'header',
        data: {
            navItems: [
                { link: { type: 'reference', reference: { relationTo: 'pages', value: homeId }, label: 'DOMOV' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: aboutId }, label: 'O NÁS' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: servicesId }, label: 'SLUŽBY' } },
                { link: { type: 'reference', reference: { relationTo: 'pages', value: contactId }, label: 'KONTAKT' } },
            ]
        },
        context: { disableRevalidate: true } // FORCE DISABLE REVALIDATION
    })

    // 3. Update Footer
    console.log('Updating Footer...')
    await payload.updateGlobal({
        slug: 'footer',
        data: {
            navItems: [
                 { link: { type: 'reference', reference: { relationTo: 'pages', value: servicesId }, label: 'Geodézia Zvolen' } },
                 { link: { type: 'reference', reference: { relationTo: 'pages', value: contactId }, label: 'Kontakt' } },
            ]
        },
        context: { disableRevalidate: true } // FORCE DISABLE REVALIDATION
    })

    console.log('✅ NAVIGATION FIXED.')
    process.exit(0)
}

updateNav().catch(console.error)
