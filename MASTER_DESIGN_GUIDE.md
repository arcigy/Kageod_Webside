# Kageod Master Design Guide 🛰️✨

Toto je záväzný dokument pre vizuálnu identitu a štruktúru webu Kageod. Každý ďalší vývoj musí rešpektovať tieto pravidlá, aby sa zachovala "Elite" kvalita.

## 🎨 Farebná Paleta (Modern Dark Tech)
- **Background:** `oklch(10% 0.01 260deg)` - Hlboká tmavá modrá/čierna.
- **Primary Accent:** `oklch(75% 0.15 220deg)` - Electric Cyan (Svetlo modrá/tyrkysová).
- **Primary RGB:** `0, 212, 255` (pre tiene a glassmorphism).
- **Card BG:** `white/[0.03]` s `backdrop-blur-sm`.
- **Card Border:** `white/[0.08]` (pri hoveri `white/[0.15]`).

## ✍️ Typografia
- **Main Font:** 'Inter' (Google Fonts).
- **Headings:** Extra Bold (800) alebo Bold (700) so záporným letter-spacingom (`tracking-tight`).
- **Body:** font-light (300) alebo normal (400) s nižšou opacitou (`opacity-70`) pre moderný vzhľad.

## 🍱 Komponenty a Layout
- **Hero:** Musí obsahovať gradientové masky, technické indikátory (side lines, badges) a 4K 16:9 vizuály.
- **Bento Grid:** Obsahové bloky musia byť v zaoblených kartách (`rounded-3xl`) s hover efektom `translate-y-[-8px]`.
- **Interaktivita:** Každý button musí mať jemnú žiaru (glow) a plynulú tranzíciu.

## 📸 Media Standard
- Všetky obrázky musia byť v **4K rozlíšení**, pomer strán **16:9**.
- Témy: Geodézia, moderná architektúra, slovenská krajina (hory/ZV región).

## 🧠 Memory Rule
Pred každou editáciou CSS alebo React komponentov si AI agent MUSÍ načítať tento súbor, aby sa predišlo návratu k priemernému dizajnu.
