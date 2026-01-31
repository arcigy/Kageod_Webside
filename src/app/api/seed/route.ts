
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

    // 1. HOME - Modern Professional Copy
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
                            children: [{ text: 'Vaša istota v meraní a katastri už od roku 1990', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Geodetická kancelária KAGEOD s.r.o. vo Zvolene. Spájame 35 rokov skúseností s najmodernejšou technológiou pre Vaše projekty.', type: 'text', version: 1 }],
                            version: 1
                        }
                    ],
                    version: 1
                }
            },
            links: [
                { link: { type: 'custom', url: '/sluzby', label: 'Naše Služby', appearance: 'default' } },
                { link: { type: 'custom', url: '/kontakt', label: 'Získať Ponuku', appearance: 'outline' } }
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
                                        children: [{ text: 'Precíznosť, ktorej môžete dôverovať', type: 'text', version: 1 }],
                                        version: 1
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'Hľadáte niekoho, kto pre Vás geodetické služby vykoná spoľahlivo a profesionálne? V KAGEOD s.r.o. sa geodetickým prácam venujeme s maximálnou precíznosťou. Poznáme všetky platné normy a odvádzame prácu, ktorá slúži ako nepriestrelný podklad pre kataster, stavebný úrad či banky.', type: 'text', version: 1 }],
                                        version: 1
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'V Kageod spájame hlboké odborné znalosti s moderným prístupom. Neustále sledujeme zmeny v legislatíve a investujeme do najnovších prístrojov značiek Leica a Trimble, aby sme Vám dodali výsledky v milimetrovej presnosti a v rekordnom čase.', type: 'text', version: 1 }],
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

    // 2. SERVICES - Refined with detailed official copy
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
                            children: [{ text: 'Kompletné Geodetické Služby', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Profesionálne riešenia pre Vašu stavbu, pozemok a kataster vo Zvolene a okolí.', type: 'text', version: 1 }],
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
                                    { type: 'paragraph', children: [{ text: 'V geodetickej kancelárii Kageod vo Zvolene dokážeme svojim klientom ponúknuť kompletné geodetické služby, ktoré využijete pri stavbe nového domu i pri sporoch o hranice pozemkov. Svoj servis ponúkame zákazníkom nielen priamo vo Zvolene, ale i v jeho širokom okolí. Veríme, že budete so službami našej geodetickej kancelárie spokojní!', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Vytýčenie hraníc a stavieb', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Pri stavbe plota, nejasnostiach ohľadom hraníc pozemkov, kúpe nehnuteľnosti alebo stavbe nového domu budete potrebovať vytýčiť zlomové body pozemku tak, ako je uvedené v katastri nehnuteľností. Polohové a výškové vytýčenie sa robí i pri plánovaných stavbách, aby bola dodržaná ich vzdialenosť od hraníc pozemku.', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Nepresné vytýčenie môže mať nepríjemné právne dôsledky. Dobre vytýčené hranice pozemku Vám dajú istotu, že so svojim pozemkom môžete voľne nakladať, bez toho, aby neskôr sused spochybnil Vaše vlastnícke práva.', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Zameranie stavby', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Bezprostredne po dokončení Vašej stavby nasleduje jej kolaudácia a zápis do katastra nehnuteľností. Podmienkou k obom je zameranie skutočného stavu Vašej stavby a jej zanesenie do geometrického plánu, ktorý následne použijete pri jednaní na stavebnom úrade.', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Zameranie hotovej stavby môže zahŕňať i zameranie inžinierskych sietí (plynovody, káble, vodovody a kanalizácie).', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Zmeny hraníc a scelovanie', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Pokiaľ sa rozhodnete rozdeliť svoje pozemky, aby ste ich časť darovali alebo predali, popr. ich chcete naopak sceliť, budete potrebovať geometrický plán od skúseného geodeta, do ktorého budú nové hranice pozemkov precízne zanesené. Práve na jeho základe je možné zaniesť zmeny do katastra.', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Vecné bremená', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Typickým vecným bremenom je právo chodiť alebo jazdiť po konkrétnom pozemku. Aby malo vecnú oporu, je potrebné ho podložiť nielen zmluvou, ale i geometrickým plánom, ktorý pre Vás spoľahlivo vypracujeme.', type: 'text', version: 1 }], version: 1 }
                                ],
                                version: 1
                            }
                        }
                    },
                    {
                        size: 'full',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Ďalšie geodetické služby', type: 'text', version: 1 }], version: 1 },
                                    { type: 'list', listType: 'bullet', children: [
                                        { type: 'listitem', children: [{ text: 'Odborné poradenstvo v oblasti geodézie a katastra', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Mapové podklady pre projekty stavieb', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Kontrolné merania počas výstavby', type: 'text', version: 1 }], version: 1 },
                                        { type: 'listitem', children: [{ text: 'Spracovanie podkladov pre znalecké posudky', type: 'text', version: 1 }], version: 1 }
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

    // 3. REFERENCES - Integrating History and Context
    await upsertPage('referencie', {
        title: 'Referencie a Skúsenosti',
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
                            children: [{ text: '35 Rokov Skúseností v Geodézii', type: 'text', version: 1 }],
                            version: 1
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Stovky spokojných klientov a tisícky úspešných meraní od nášho založenia v roku 1990.', type: 'text', version: 1 }],
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
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Naša História a Tradícia', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Geodetickú kanceláriu Kageod sme vo Zvolene založili už v roku 1990. Pod súčasným názvom sa poskytovaniu geodetických služieb venujeme už pekných pár rokov a za túto dobu sme stihli získať stovky spokojných klientov. Z veľkej časti ide o jednotlivcov, pravidelne ale spolupracujeme i s verejnými inštitúciami, firmami a drobnými podnikateľmi alebo so stavebnými spoločnosťami priamo vo Zvolene i v jeho širokom okolí.', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Teší nás, že na svoje služby dostávame pravidelne pozitívne ohlasy takpovediac od všetkých našich klientov. Napriek tomu sa neustále snažíme svoju prácu zlepšovať a aktívne sledujeme zmeny v legislatíve, ktoré sa nášho odboru týkajú, i novo dostupné nástroje a technológie.', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Preto, že pracujeme s klientmi, ktorí majú veľmi rôznorodé potreby, snažíme sa mať čomožno najširší záber a vedieť uspokojiť i tie najnáročnejšie požiadavky. Veríme, že so spoločnosťou Kageod budete spokojní aj Vy.', type: 'text', version: 1 }], version: 1 }
                                ],
                                version: 1
                            }
                        }
                    },
                    {
                        size: 'full',
                        richText: {
                            root: {
                                type: 'root',
                                children: [
                                    { type: 'heading', tag: 'h2', children: [{ text: 'Vybrané Referenčné Projekty', type: 'text', version: 1 }], version: 1 },
                                    {
                                        type: 'list',
                                        listType: 'bullet',
                                        children: [
                                            { type: 'listitem', children: [{ text: 'Komplexné zamerania pre rodinnú výstavbu v okrese Zvolen, Banská Bystrica a Detva.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Geometrické plány pre pozemkové úpravy a scelovanie pôdy pre súkromných vlastníkov.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Dlhodobá spolupráca s regionálnymi stavebnými firmami na inžinierskych stavbách.', type: 'text', version: 1 }], version: 1 },
                                            { type: 'listitem', children: [{ text: 'Vytýčenie hraníc pozemkov pre priemyselné a logistické celky v regióne.', type: 'text', version: 1 }], version: 1 }
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

    // 4. CONTACT
    await upsertPage('kontakt', {
        title: 'Kontaktujte KAGEOD',
        hero: {
            type: 'mediumImpact',
            media: contactImageId,
            richText: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'heading', tag: 'h1', children: [{ text: 'Sme tu pre Vás vo Zvolene', type: 'text', version: 1 }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Získajte nezáväznú cenovú ponuku pre Váša projekt ešte dnes.', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Kancelária', type: 'text', version: 1 }], version: 1 },
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Kontakt', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Telefón: +421 903 567 411\nEmail: kageod@kageod.sk', type: 'text', version: 1 }], version: 1 }
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
                                    { type: 'heading', tag: 'h3', children: [{ text: 'Otváracie Hodiny', type: 'text', version: 1 }], version: 1 },
                                    { type: 'paragraph', children: [{ text: 'Pondelok - Piatok: 08:00 - 15:30\n\nOdporúčame vopred dohodnúť termín telefonicky.', type: 'text', version: 1 }], version: 1 }
                                ],
                                version: 1
                            }
                        }
                    }
                ]
            }
        ]
    })

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

    return NextResponse.json({ success: true, message: 'Official Kageod Masterpiece seeded successfully' })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
