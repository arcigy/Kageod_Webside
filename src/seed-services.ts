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

    console.log('Seeding Services...')
    const services = [
        {
            title: 'Geometrické plány',
            description: 'Príprava plánov na rozdelenie pozemkov, zameranie stavieb k doplateniu prepisu alebo k hypotéke.',
            icon: 'map' as const,
        },
        {
            title: 'Vytyčovanie hraníc',
            description: 'Presné vytýčenie hraníc pozemkov v teréne na základe údajov z katastra nehnuteľností.',
            icon: 'radar' as const,
        },
        {
            title: 'Inžinierska geodézia',
            description: 'Kompletný servis pre stavebníctvo, od predprojektového zamerania až po porealizačné merania.',
            icon: 'building' as const,
        }
    ]

    for (const service of services) {
        const existing = await payload.find({
            collection: 'services',
            where: { title: { equals: service.title } }
        })

        if (existing.totalDocs === 0) {
            await payload.create({
                collection: 'services',
                data: service,
            })
            console.log(`Service created: ${service.title}`)
        }
    }

    process.exit(0)
}

seed()
