# Dokončenie nasadenia na Railway

Tvoj projekt je už "pushnutý" na Railway, ale potrebuje dokončiť nastavenie (pridať databázu a premenné).

1.  Otvoriť: **[Railway Dashboard](https://railway.com/project/b0d5a1d8-85e7-4720-9c3c-1b27ecacd97a)** (Tvoj projekt)
    *   *Ak tento link nefunguje, nájdi projekt "Kageod-WebSite" v dashboarde.*

2.  **Pridať Databázu:**
    *   Klikni pravým tlačidlom na prázdne miesto v "Canvas".
    *   Vyber **"Database"** -> **"PostgreSQL"**.
    *   Počkaj, kým sa vytvorí.

3.  **Získať URL databázy:**
    *   Klikni na novú **PostgreSQL** kartu.
    *   V záložke **"Connect"** skopíruj hodnotu **`DATABASE_URL`**.

4.  **Nastaviť Premenné:**
    *   Klikni na kartu **"Kageod_Webside"** (tvoja aplikácia).
    *   Choď do záložky **"Variables"**.
    *   Klikni **"New Variable"** a pridaj:
        *   `DATABASE_URL` = *(vlož skopírovanú URL)*
        *   `PAYLOAD_SECRET` = `kageod-secret-key-2024`
        *   `NEXT_PUBLIC_SERVER_URL` = `https://kageodwebside-production.up.railway.app`

5.  **Hotovo:**
    *   Railway automaticky reštartuje aplikáciu a web nabehne.
