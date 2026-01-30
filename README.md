# Kageod Website (Payload CMS 3.0)

Toto je zdrojový kód webovej stránky **Kageod**, postavený na **Payload CMS 3.0** (Next.js App Router) s integrovaným admin panelom a PostgreSQL databázou.

## Funkcionalita

*   **Moderný dizajn:** Prispôsobený pre geodetickú kanceláriu (tmavomodrá/strieborná téma).
*   **Admin Panel:** Plná správa obsahu na `/admin`.
*   **Služby:** Vlastná kolekcia pre správu služieb (Geometrické plány, Vytyčovanie, atď.) s ikonami.
*   **Formuláre:** Možnosť vytvárať kontaktné formuláre priamo v admine.
*   **Databáza:** Podpora pre PostgreSQL (Railway) v produkcii a SQLite lokálne.

## Ako nasadiť na Railway

Projekt je optimalizovaný pre [Railway](https://railway.app).

1.  **Vytvor projekt:** V Railway Dashboard klikni na "New Project" -> "Deploy from GitHub repo" -> vyber tento repozitár.
2.  **Pridaj Databázu:** V projekte pridaj službu "PostgreSQL".
3.  **Premenné prostredia (Variables):**
    V nastaveniach webovej služby (nie databázy) pridaj tieto premenné:
    
    *   `DATABASE_URL`: *(Skopíruj z PostgreSQL služby - záložka Connect)*
    *   `PAYLOAD_SECRET`: *(Vygeneruj si náhodný dlhý reťazec, napr. `mojeTajneHeslo123456`)*
    *   `NEXT_PUBLIC_SERVER_URL`: `https://<tvoja-domena>.up.railway.app` *(Doménu nájdeš v Settings po prvom deployi)*

4.  **Hotovo:** Railway automaticky spustí build a web bude dostupný.

## Lokálny vývoj

1.  Naklonuj repozitár:
    ```bash
    git clone https://github.com/arcigy/Kageod_Webside.git
    cd Kageod_Webside
    ```

2.  Nainštaluj závislosti:
    ```bash
    npm install
    ```

3.  Vytvor `.env` súbor (podľa `.env.example`). Pre lokálny vývoj stačí:
    ```env
    PAYLOAD_SECRET=moje-super-tajne-heslo
    DATABASE_URL=file:./payload.db
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    ```

4.  Spusti vývojový server:
    ```bash
    npm run dev
    ```

5.  Otvor `http://localhost:3000`. Admin je na `http://localhost:3000/admin`.
