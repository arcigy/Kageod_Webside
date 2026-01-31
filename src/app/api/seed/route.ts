
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    console.log('Starting Masterpiece Content Seed via API...')

    const uploadMedia = async (fileName: string, alt: string) => {
      const sourcePath = path.resolve(process.cwd(), 'public/seed-assets', fileName)
      const targetDir = path.resolve(process.cwd(), 'public/media')
      const targetPath = path.resolve(targetDir, fileName)
      
      if (!fs.existsSync(sourcePath)) {
        console.error(`SOURCE FILE MISSING: ${sourcePath}`)
        return null
      }

      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: fileName } }
      })

      if (existing.docs.length > 0) {
        if (fs.existsSync(targetPath)) {
          return existing.docs[0].id
        } else {
          await payload.delete({ collection: 'media', id: existing.docs[0].id })
        }
      }

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

    const heroImageId = await uploadMedia('hero-sunset-nanabanana.png', 'KAGEOD Hero Sunset 4K')
    const servicesImageId = await uploadMedia('services-main.png', 'KAGEOD Geodetické Služby')
    const contactImageId = await uploadMedia('contact-main.png', 'KAGEOD Kontakt Kancelária')
    const referencesImageId = await uploadMedia('referencie-alfa.png', 'KAGEOD Referenčné Projekty 4K')

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
        } else {
            await payload.create({
                collection: 'pages',
                data: { ...data, slug, _status: 'published' }
            })
        }
    }

    // 1. HOME - Professional Copy
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
                            children: [{ text: 'Vaša istota v meraní a katastri nehnuteľností', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Geodetická kancelária KAGEOD s.r.o. poskytuje spoľahlivé služby vo Zvolene a v celom regióne už dlhé roky. Od vytýčenia pozemku po komplexné geometrické plány.', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            },
            links: [
                { link: { type: 'custom', url: '/sluzby', label: 'Naše Služby', appearance: 'default' } },
                { link: { type: 'custom', url: '/kontakt', label: 'Rýchly Kontakt', appearance: 'outline' } }
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
                                        children: [{ text: 'Prečo si vybrať KAGEOD?', type: 'text', version: 1 }],
                                        version: 1
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Hľadáte niekoho, kto pre Vás geodetické služby vykoná spoľahlivo a profesionálne? V KAGEOD s.r.o. sa geodetickým prácam venujeme s maximálnou precíznosťou. Poznáme všetky platné normy a odvádzame prácu, ktorá slúži ako nepriestrelný podklad pre kataster, stavebný úrad či banky.', type: 'text', version: 1 }],
                                        version: 1
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Sme vybavení modernou meracou technikou, ktorá nám umožňuje pracovať efektívne a s minimálnymi odchýlkami. Naši klienti oceňujú nielen technickú kvalitu, ale aj profesionálne poradenstvo pri riešení komplikovaných majetkovoprávnych vzťahov.', type: 'text', version: 1 }],
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

    // 2. SERVICES - Detailed from kageod.sk
    await upsertPage('sluzby', {
        title: 'Naše Služby',
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
                            children: [{ text: 'Komplexné Geodetické Služby', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Zabezpečujeme servis pre súkromné osoby, stavebné firmy aj verejný sektor.', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Kataster nehnuteľností', type: 'text', version: 1 }], version: 1 },
                                    { type: 'list', listType: 'bullet', children: [
                                        { type: 'listitem', children: [{ text: 'Geometrické plány na rozdelenie/scelenie pozemkov', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Zameranie stavieb pre kolaudáciu a zápis do KN', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Vytýčenie hraníc pozemkov a riešenie sporov', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Zápis vecného bremena (právo prechodu/prejazdu)', type: 'text', version: 1 }], version: 1 }
                                    ], version: 1 }
                                ],
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Inžinierska geodézia', type: 'text', version: 1 }], version: 1 },
                                    { type: 'list', listType: 'bullet', children: [
                                        { type: 'listitem', children: [{ text: 'Vytýčenie základov stavieb a osí objektov', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Polohopisné a výškopisné podklady pre projekty', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Zameranie inžinierskych sietí pre kolaudáciu', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Kontrolné merania a sledovanie posunov stavby', type: 'text', version: 1 }], version: 1 }
                                    ], version: 1 }
                                ],
                                version: 1
                            }
                        }
                    }
                ]
            }
        ]
    })

    // 3. REFERENCES - Professional Example Projects
    await upsertPage('referencie', {
        title: 'Realizované Projekty',
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
                            children: [{ text: 'Naše Referencie', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Stovky úspešných meraní pre rodinné domy, bytové komplexy a priemyselné stavby.', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Vybrané kategórie prác', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Dlhodobo spolupracujeme s významnými partnermi v regióne stredného Slovenska. Naša práca je overená rokmi praxe v náročných terénoch aj komplikovaných katastrálnych územiach.', type: 'text', version: 1 }], version: 1 },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            { type: 'listitem', children: [{ text: 'Zamerania stoviek rodinných domov v okrese Zvolen, Banská Bystrica a Detva.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Geometrické plány pre rozsiahle pozemkové úpravy a scelovanie pôdy.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Komplexná podpora pre výstavbu infraštruktúry a inžinierskych sietí.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Vytýčenie hraníc pozemkov pre priemyselné parky a logistické centrá.', type: 'text', version: 1 }], version: 1 }
                                        ],
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

    // 4. CONTACT - Correct Address
    await upsertPage('kontakt', {
        title: 'Kontaktujte Nás',
        hero: {
            type: 'mediumImpact',
            media: contactImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'heading', tag: 'h1', children: [{ text: 'Získajte Cenovú Ponuku', type: 'text', version: 1 }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Sme Vám k dispozícii v našej kancelárii vo Zvolene.', type: 'text', version: 1 }], version: 1 }
                    ],
                    version: 1
                }
            }
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Adresa Kancelárie', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'KAGEOD s.r.o.\nNeresnická cesta 3\n(budova STRABAG)\n960 51 Zvolen', type: 'text', version: 1 }], version: 1 }
                                ],
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Telefón / Email', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: '+421 903 567 411\nkageod@kageod.sk', type: 'text', version: 1 }], version: 1 }
                                ],
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Úradné Hodiny', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Po - Pi: 08:00 - 15:30\n\nVzhľadom na terénne práce odporúčame termín vopred dohodnúť.', type: 'text', version: 1 }], version: 1 }
                                ],
                                version: 1
                            }
                        }
                    }
                ]
            }
        ]
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

    return NextResponse.json({ success: true, message: 'Official Kageod content seeded successfully' })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
