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

    console.log('Checking for existing users...')
    const { totalDocs } = await payload.find({
        collection: 'users',
    })

    if (totalDocs === 0) {
        console.log('Creating admin user...')
        await payload.create({
            collection: 'users',
            data: {
                name: 'Admin',
                email: 'admin@kageod.sk',
                password: 'KageodPass123!',
            },
        })
        console.log('Admin user created: admin@kageod.sk / KageodPass123!')
    } else {
        console.log('Users already exist, skipping seed.')
    }

    process.exit(0)
}

seed()
