---
description: how to generate professional images for Kageod
---
# Workflow: Generovanie obrázkov (Alpha Mode)

Tento workflow sa používa vždy, keď je potrebné vygenerovať nový vizuál pre web Kageod.

1.  **Príprava promptu:**
    *   Musí byť v angličtine.
    *   Musí obsahovať kľúčové slová: `4K resolution`, `cinematic lighting`, `ultra-detailed textures`.
    *   Musí špecifikovať pomer strán: `wide angle 16:9`.

2.  **Spustenie nástroja:**
    // turbo
    Spusti Python skript:
    ```powershell
    python scripts/generate_imagen.py "TVOJ PROMPT" "public/seed-assets/NAZOV_OBRAZKA.png" --ratio "16:9"
    ```

3.  **Nasadenie:**
    Po vygenerovaní obrázka ho nezabudni pridať do Gitu a spustiť `/api/seed` na Railway pre aktualizáciu obsahu.

**DÔLEŽITÉ:** Vždy používaj API kľúč z `.env` (GEMINI_API_KEY) a model `nano-banana-pro-preview`.
