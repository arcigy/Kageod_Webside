
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    console.log('Starting Bulletproof Seed via API...')

    const uploadMedia = async (fileName: string, alt: string) => {
      const sourcePath = path.resolve(process.cwd(), 'public/seed-assets', fileName)
      const targetDir = path.resolve(process.cwd(), 'public/media')
      const targetPath = path.resolve(targetDir, fileName)
      
      if (!fs.existsSync(sourcePath)) {
        console.error(`SOURCE FILE MISSING: ${sourcePath}`)
        return null
      }

      // Check if media already exists in database
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: fileName } }
      })

      // If it exists in DB, check if file exists on disk in public/media
      if (existing.docs.length > 0) {
        if (fs.existsSync(targetPath)) {
          console.log(`Media ${fileName} already exists in DB and on disk.`)
          return existing.docs[0].id
        } else {
          console.log(`Media ${fileName} exists in DB but file is missing from disk. Re-uploading...`)
          // Delete the "ghost" record to avoid conflicts
          await payload.delete({
            collection: 'media',
            id: existing.docs[0].id
          })
        }
      }

      console.log(`Uploading new media: ${fileName}`)
      const media = await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: fs.readFileSync(sourcePath),
          name: fileName,
          mimetype: 'image/png',
          size: fs.statSync(sourcePath).size
        } as any
      })
      return media.id
    }

    // Upload all assets
    const heroImageId = await uploadMedia('hero-sunset-nanabanana.png', 'KAGEOD Hero Sunset 4K')
    const servicesImageId = await uploadMedia('services-main.png', 'KAGEOD Služby')
    const contactImageId = await uploadMedia('contact-main.png', 'KAGEOD Kontakt')
    const referencesImageId = await uploadMedia('references-4k.png', 'KAGEOD Referencie 4K')

    if (!heroImageId) console.error("FAILED TO UPLOAD HERO IMAGE")

    // Helper to create/update page
    const upsertPage = async (slug: string, data: any) => {
        const existing = await payload.find({
            collection: 'pages',
            where: { slug: { equals: slug } }
        })

        if (existing.docs.length > 0) {
            await payload.update({
                collection: 'pages',
                id: existing.docs[0].id,
                data: { ...data, _status: 'published' }
            })
            console.log(`Updated page: ${slug}`)
        } else {
            await payload.create({
                collection: 'pages',
                data: { ...data, slug, _status: 'published' }
            })
            console.log(`Created page: ${slug}`)
        }
    }

    // 1. Home Page
    await upsertPage('home', {
        title: 'Domov',
        hero: {
            type: 'highImpact',
            media: heroImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Precízna geodézia pre Vaše projekty', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Garantujeme presnosť, odbornosť a rýchle vybavenie Vašich požiadaviek v oblasti katastra nehnuteľností a inžinierskej geodézie.', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            },
            links: [
                { link: { type: 'custom', url: '/sluzby', label: 'Naše služby', appearance: 'default' } },
                { link: { type: 'custom', url: '/kontakt', label: 'Získať ponuku', appearance: 'outline' } }
            ]
        },
        layout: [
            {
                blockType: 'content',
                columns: [
                    {
                        size: 'twoThirds',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h2',
                                        children: [{ text: 'Odborníci na meranie a kartografiu', type: 'text', version: 1 }],
                                        version: 1
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Geodetická kancelária KAGEOD, pod vedením Ing. Rastislava Kamenského, pôsobí na trhu ako stabilný partner pre súkromné osoby, developerov aj verejnú správu. Naším poslaním je vnášať milimetrovú presnosť do sveta nehnuteľností a stavebníctva.', type: 'text', version: 1 }],
                                        version: 1
                                    }
                                ],
                                version: 1
                            }
                        }
                    }
                ]
            }
        ]
    })

    // 2. Services Page
    await upsertPage('sluzby', {
        title: 'Služby',
        hero: {
            type: 'mediumImpact',
            media: servicesImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Komplexné geodetické služby', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            }
        }
    })

    // 3. Contact Page
    await upsertPage('kontakt', {
        title: 'Kontakt',
        hero: {
            type: 'mediumImpact',
            media: contactImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Pripravení na spoluprácu', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            }
        }
    })

    // 4. References Page
    await upsertPage('referencie', {
        title: 'Referencie',
        hero: {
            type: 'mediumImpact',
            media: referencesImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Naše referencie', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            }
        }
    })

    // 5. Global Header
    await payload.updateGlobal({
        slug: 'header',
        data: {
          navItems: [
            { link: { type: 'custom', url: '/', label: 'Domov' } },
            { link: { type: 'custom', url: '/sluzby', label: 'Služby' } },
            { link: { type: 'custom', url: '/referencie', label: 'Referencie' } },
            { link: { type: 'custom', url: '/kontakt', label: 'Kontakt' } },
          ],
        },
    })

    return NextResponse.json({ success: true, message: 'Bulletproof seed finished successfully' })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
