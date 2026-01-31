
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    console.log('Starting enhanced seed via API...')

    const uploadMedia = async (fileName: string, alt: string) => {
      const filePath = path.resolve(process.cwd(), 'public/seed-assets', fileName)
      
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`)
        return null
      }

      const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: alt } }
      })

      if (existing.docs.length > 0) {
        return existing.docs[0].id
      }

      const media = await payload.create({
        collection: 'media',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { alt },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        file: {
          data: fs.readFileSync(filePath),
          name: fileName,
          mimetype: 'image/png',
          size: fs.statSync(filePath).size
        } as any
      })
      return media.id
    }

    const heroImageId = await uploadMedia('hero-sunset-nanabanana.png', 'Geodetický prístroj pri západe slnka - 4K')
    const servicesImageId = await uploadMedia('services-main.png', 'Geodetické plány a merania')
    const contactImageId = await uploadMedia('contact-main.png', 'Geodetická kancelária KAGEOD')
    const referencesImageId = await uploadMedia('references-4k.png', 'Realizované projekty a dokumentácia - 4K')

    // 1. Home Page - ENHANCED
    const existingHome = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } }
    })
    
    const homeData = {
        title: 'Domov',
        slug: 'home',
        _status: 'published' as const,
        hero: {
            type: 'highImpact',
            media: heroImageId || undefined,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Precízna geodézia pre Vaše projekty', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Garantujeme presnosť, odbornosť a rýchle vybavenie Vašich požiadaviek v oblasti katastra nehnuteľností a inžinierskej geodézie.', type: 'text', version: 1 }],
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
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Geodetická kancelária KAGEOD, pod vedením Ing. Rastislava Kamenského, pôsobí na trhu ako stabilný partner pre súkromné osoby, developerov aj verejnú správu. Naším poslaním je vnášať milimetrovú presnosť do sveta nehnuteľností a stavebníctva.', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Využívame najmodernejšiu meraciu techniku značiek Leica a Trimble, vďaka čomu skracujeme čas vypracovania dokumentácie na minimum pri zachovaní najvyššej možnej kvality výstupov.', type: 'text', version: 1 }],
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
                        size: 'oneThird',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h3',
                                        children: [{ text: 'Prečo my?', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            { type: 'listitem', children: [{ text: 'Viac ako 15 rokov praxe', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Autorizované overenie výsledkov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Moderné prístroje a softvér', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Individuálny prístup', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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

    if (existingHome.docs.length > 0) {
        await payload.update({
            collection: 'pages',
            id: existingHome.docs[0].id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: homeData as any
        })
    } else {
        await payload.create({
            collection: 'pages',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: homeData as any
        })
    }

    // 2. Services Page - ENHANCED
    const existingServices = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'sluzby' } }
    })
    
    const servicesData = {
        title: 'Služby',
        slug: 'sluzby',
        _status: 'published' as const,
        hero: {
            type: 'mediumImpact',
            media: servicesImageId || undefined,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'heading',
                            tag: 'h1',
                            children: [{ text: 'Komplexné geodetické služby', type: 'text', version: 1 }],
                            version: 1,
                            direction: 'ltr',
                            format: '',
                            indent: 0
                        },
                         {
                            type: 'paragraph',
                            children: [{ text: 'Sme tu pre Vás, či už potrebujete prepísať pozemok, skolaudovať dom alebo naprojektovať diaľnicu.', type: 'text', version: 1 }],
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
                                        tag: 'h2',
                                        children: [{ text: 'Kataster nehnuteľností', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Zabezpečujeme všetky potrebné podklady pre zápis do katastra nehnuteľností:', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            { type: 'listitem', children: [{ text: 'Geometrické plány na oddelenie pozemkov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Zameranie ku kolaudácii rodinných domov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Vytyčovanie hraníc pozemkov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Zameranie vecného bremena', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
                    },
                    {
                        size: 'half',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'heading',
                                        tag: 'h2',
                                        children: [{ text: 'Inžinierska geodézia', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Podpora pre Vašu stavbu od výkopových prác až po finálne merania:', type: 'text', version: 1 }],
                                        version: 1,
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0
                                    },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            { type: 'listitem', children: [{ text: 'Polohopisné a výškopisné merania pre projektovú dokumentáciu', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Vytyčovanie stavieb a inžinierskych sietí', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Zameranie skutočného vyhotovenia stavby', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 },
                                            { type: 'listitem', children: [{ text: 'Kontrolné merania a sledovanie posunov', type: 'text', version: 1 }], version: 1, direction: 'ltr', format: '', indent: 0 }
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
        await payload.update({
            collection: 'pages',
            id: existingServices.docs[0].id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: servicesData as any
        })
    } else {
        await payload.create({
            collection: 'pages',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: servicesData as any
        })
    }

    // 3. Contact Page - ENHANCED
    const existingContact = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'kontakt' } },
    })

    const contactData = {
      title: 'Kontakt',
      slug: 'kontakt',
      _status: 'published' as const,
      hero: {
        type: 'mediumImpact',
        media: contactImageId || undefined,
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ text: 'Pripravení na spoluprácu', type: 'text', version: 1 }],
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Neváhajte nás kontaktovať pre nezáväznú cenovú ponuku alebo odbornú konzultáciu.',
                    type: 'text',
                    version: 1,
                  },
                ],
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ text: 'Fakturačné údaje', type: 'text', version: 1 }],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Ing. Rastislav Kamenský - KAGEOD\nZvolenská cesta 123\n960 01 Zvolen\n\nIČO: 12345678\nDIČ: 10203040',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ text: 'Spojenie', type: 'text', version: 1 }],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Telefón: +421 905 123 456\nEmail: info@kageod.sk\n\nKancelária:\nZvolenská biznis zóna, 2. poschodie',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ text: 'Úradné hodiny', type: 'text', version: 1 }],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Po - Pi: 08:00 - 16:30\nSo - Ne: Podľa dohody\n\nOdporúčame vopred dohodnúť termín telefonicky.',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    }

    if (existingContact.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingContact.docs[0].id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: contactData as any,
      })
    } else {
      await payload.create({
        collection: 'pages',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: contactData as any,
      })
    }

    // 4. References Page
    const existingReferences = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'referencie' } },
    })

    const referencesData = {
      title: 'Referencie',
      slug: 'referencie',
      _status: 'published' as const,
      hero: {
        type: 'mediumImpact',
        media: referencesImageId || undefined,
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ text: 'Naše referencie', type: 'text', version: 1 }],
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Prezrite si výber našich úspešne realizovaných projektov pre súkromných klientov aj firmy.',
                    type: 'text',
                    version: 1,
                  },
                ],
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
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
                      children: [{ text: 'Prehľad vybraných prác', type: 'text', version: 1 }],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Zakladáme si na dlhodobej spolupráci a spokojnosti našich partnerov. Každý projekt je pre nás príležitosťou potvrdiť našu povesť precíznej geodetickej kancelárie.',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      version: 1,
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    }

    if (existingReferences.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingReferences.docs[0].id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: referencesData as any,
      })
    } else {
      await payload.create({
        collection: 'pages',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: referencesData as any,
      })
    }

    // 5. Global Header Seeding
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

    return NextResponse.json({ success: true, message: 'Enhanced content and header seeded successfully' })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
