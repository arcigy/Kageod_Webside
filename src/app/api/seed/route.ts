
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    console.log('Starting seed via API...')

    const uploadMedia = async (fileName: string, alt: string) => {
      // In Docker/Next.js standalone, process.cwd() is /app
      // Public folder is copied to /app/public
      const filePath = path.resolve(process.cwd(), 'public/media', fileName)
      
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`)
        return null
      }

      // Check if exists by alt to avoid duplicates
      const existing = await payload.find({
        collection: 'media',
        where: {
          alt: { equals: alt }
        }
      })

      if (existing.docs.length > 0) {
        return existing.docs[0].id
      }

      const media = await payload.create({
        collection: 'media',
        data: {
          alt,
        },
        file: {
          path: filePath,
          name: fileName,
          mimetype: 'image/png',
          size: fs.statSync(filePath).size
        }
      })
      return media.id
    }

    const heroImageId = await uploadMedia('hero-main.png', 'Geodet pri práci')
    const servicesImageId = await uploadMedia('services-main.png', 'Geodetické plány')
    const contactImageId = await uploadMedia('contact-main.png', 'Kancelária geodeta')

    // 1. Home Page
    const existingHome = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } }
    })
    
    let homeId;
    const homeData = {
        title: 'Domov',
        slug: 'home',
        _status: 'published' as const,
        hero: {
            type: heroImageId ? 'highImpact' : 'lowImpact',
            media: heroImageId || undefined,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Geodetická kancelária', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Ing. Rastislav Kamenský - Profesionálne geodetické služby vo Zvolene a okolí. Presnosť, spoľahlivosť a odborný prístup.', type: 'text', version: 1 }],
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
            },
            links: [
                {
                    link: {
                        type: 'custom',
                        url: '/sluzby',
                        label: 'Naše služby',
                        appearance: 'default'
                    }
                },
                {
                    link: {
                        type: 'custom',
                        url: '/kontakt',
                        label: 'Kontaktujte nás',
                        appearance: 'outline'
                    }
                }
            ]
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
                                    {
                                        type: 'heading',
                                        tag: 'h2',
                                        children: [{ text: 'O nás', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Poskytujeme komplexné geodetické a kartografické služby pre občanov, stavebné firmy, projektantov a samosprávy. S dlhoročnými skúsenosťami garantujeme vysokú kvalitu a presnosť našich výstupov.', type: 'text', version: 1 }],
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

    if (existingHome.docs.length > 0) {
        homeId = existingHome.docs[0].id
        await payload.update({
            collection: 'pages',
            id: homeId,
            data: homeData
        })
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: homeData
        })
        homeId = doc.id
    }

    // 2. Services Page
    const existingServices = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'sluzby' } }
    })
    
    let servicesId;
    const servicesData = {
        title: 'Služby',
        slug: 'sluzby',
        _status: 'published' as const,
        hero: {
            type: servicesImageId ? 'mediumImpact' : 'lowImpact',
            media: servicesImageId || undefined,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Ponuka služieb', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        },
                         {
                            type: 'paragraph',
                            children: [{ text: 'Vykonávame široké spektrum geodetických prác.', type: 'text', version: 1 }],
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
                                    {
                                        type: 'heading',
                                        tag: 'h3',
                                        children: [{ text: 'Inžinierska geodézia', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Vytyčovanie stavieb', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            },
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Kontrolné merania', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            }
                                        ],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'heading',
                                        tag: 'h3',
                                        children: [{ text: 'Kataster nehnuteľností', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Geometrické plány', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            },
                                            {
                                                type: 'listitem',
                                                children: [{ text: 'Vytyčovanie hraníc pozemkov', type: 'text', version: 1 }],
                                                version: 1,
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0
                                            }
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

    if (existingServices.docs.length > 0) {
        servicesId = existingServices.docs[0].id
        await payload.update({
            collection: 'pages',
            id: servicesId,
            data: servicesData
        })
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: servicesData
        })
        servicesId = doc.id
    }

    // 3. Contact Page
    const existingContact = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'kontakt' } }
    })
    
    let contactId;
    const contactData = {
        title: 'Kontakt',
        slug: 'kontakt',
        _status: 'published' as const,
        hero: {
            type: contactImageId ? 'mediumImpact' : 'lowImpact',
            media: contactImageId || undefined,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Kontaktujte nás', type: 'text', version: 1 }],
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
        },
        layout: [
             {
                blockType: 'content',
                columns: [
                    {
                        size: 'half',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h3',
                                        children: [{ text: 'Adresa', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Ing. Rastislav Kamenský - KAGEOD', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Zvolen', type: 'text', version: 1 }],
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
                    },
                    {
                        size: 'half',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h3',
                                        children: [{ text: 'Telefón a Email', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: '+421 905 123 456', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'info@kageod.sk', type: 'text', version: 1 }],
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

    if (existingContact.docs.length > 0) {
        contactId = existingContact.docs[0].id
        await payload.update({
            collection: 'pages',
            id: contactId,
            data: contactData
        })
    } else {
        const doc = await payload.create({
            collection: 'pages',
            data: contactData
        })
        contactId = doc.id
    }

    // 4. Header
    try {
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
                          type: 'reference',
                          reference: { relationTo: 'pages', value: servicesId },
                          label: 'Služby',
                      }
                  },
                  {
                      link: {
                          type: 'reference',
                          reference: { relationTo: 'pages', value: contactId },
                          label: 'Kontakt',
                      }
                  }
              ]
          }
      })
    } catch (e) {
      console.warn("Header warning:", e)
    }

    return NextResponse.json({ success: true, message: 'Seeded successfully' })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
