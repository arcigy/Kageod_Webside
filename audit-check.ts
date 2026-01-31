// @ts-nocheck
import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

const auditCheck = async () => {
    try {
        const payload = await getPayload({ config })
        console.log('🕵️‍♂️ STARTING DATABASE AUDIT...')

        // 1. Check Header
        console.log('\n--- HEADER GLOBAL ---')
        const header = await payload.findGlobal({ slug: 'header' })
        console.log('Nav Items:', JSON.stringify(header.navItems, null, 2))

        // 2. Check Pages
        console.log('\n--- PAGES COLLECTION ---')
        const pages = await payload.find({ collection: 'pages', limit: 10 })
        
        if (pages.docs.length === 0) {
            console.warn('⚠️ NO PAGES FOUND!')
        } else {
            pages.docs.forEach(p => {
                console.log(`\nPage ID: ${p.id}`)
                console.log(`Title: "${p.title}"`)
                console.log(`Slug: "${p.slug}"`)
                console.log(`Status: ${p._status}`)
                console.log(`Hero Type: ${p.hero?.type}`)
                // Check if layout has content
                const hasLayout = p.layout && p.layout.length > 0
                console.log(`Has Layout Content: ${hasLayout}`)
                if (hasLayout) {
                     console.log(`First Block Type: ${p.layout[0].blockType}`)
                }
            })
        }

        console.log('\n✅ AUDIT COMPLETE.')
    } catch (e) {
        console.error('❌ FATAL ERROR CONNECTING TO DB:', e)
    }
    process.exit(0)
}

auditCheck()
