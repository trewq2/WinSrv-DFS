# DFS LAB – Windows Server 2012 + Windows 7

Önállóan futó, statikus GitHub Pages tanulói weboldal. Az előző Active Directory / DNS / NAT / DHCP labor folytatása: DFS Namespaces, megosztott mappák, Active Directoryban közzétett hivatkozások, hálózati meghajtók és hozzáférés-szabályozás.

## Hogyan indítható?

1. A `index.html`, `styles.css`, `data.js`, `guides.js`, `app.js` és az `assets` könyvtár együtt kerüljön fel a GitHub-repositoryba.
2. Nyisd meg a repository Settings → Pages lapját. A Build and deployment alatt válaszd a **Deploy from a branch**, `main`, `/(root)` kombinációt, majd mentsd.
3. A GitHub Pages elkészülte után a megjelenő URL-en elérhető az oldal.
4. Ha a korábbi labor weboldalát nem akarod felülírni, **külön repositoryt** hozz létre, vagy az egész DFS csomagot egy `dfs/` almappába helyezd a régi repositoryban. Utóbbi esetben a DFS-oldal a korábbi webhely `dfs/` alútvonalán nyílik meg.

**Nincs szerveroldali kód, nincs adatbázis, nincs telepítendő JavaScript-csomag.** A tanulói pipák és a folyamatban levő teszt az adott böngésző `localStorage` tárhelyén maradnak.

## Alap és bővítés

**Alap – egy szerver + egy kliens:**
- SRV-DC1: Windows Server 2012; meglévő AD DS / DNS / DHCP / DFS a `gyakorlat.local` tartományban.
- WIN7-01: Windows 7 Professional / Enterprise / Ultimate; LAN1 belső hálózat, tartománytag.
- DFS névtér: `\\gyakorlat.local\mappak`.
- Két logikai mappa: `szoftver` és `kozos_munka`.
- Két SMB-cél a meglévő szerveren: `\\SRV-DC1\szoftver` és `\\SRV-DC1\kozos_munka`.
- S: és M: hálózati meghajtó Windows 7-en.

**Bővített – második, külön Server 2012 virtuális gép:**
- SRV-FS1: tagkiszolgáló, LAN1 (javasolt, kizárt /25-ös tartománybeli szabad cím 192.168.15.250).
- A `kozos_munka` megosztás tárolható ezen a gépen.
- A DFS Namespaces önmagában nem replikál: a DFS Replication külön konfigurációt és hibatesztet igényel.

Az előző labort befejezve a LAN1 szervercíme 192.168.15.254/25, a kliens DHCP-vel kap címet. Ha a csoport más működő IP-tervvel dolgozik, használják a meglévő konzisztens címzést.

## Tanulói tartalom

- 8 tanulási egység: 49 alaplépés + 7 választható bővítőlépés.
- 71 enyhén kontrasztjavított és élesített mintaképernyő, a hozzájuk tartozó feladat mellett.
- Részletes elmélet, konkrét kattintási útvonalak, beállítási értékek és ellenőrző parancsok.
- 18 kötelező + 2 választható saját PNG bizonyíték külön ellenőrzőlistával.
- 40 kérdéses, 40 pontos interaktív teszt; kérdéssorrend és az A–D válaszok sorrendje is keveredik.
- Az eredményekhez kérdésenkénti indoklás és nyomtatható, névvel ellátott PDF-eredménylap.

## PDF mentése

A teszt végén: **Eredmény mentése PDF-be** → nyomtatási ablak → **Mentés PDF-ként**. Az oldalon nincs közvetlen feltöltés: a tanulók a PDF-et és a saját képernyőképeket külön küldik be az osztály feladatkezelő felületén.

Az időkeret tájékoztató jellegű (50 perc); nem zárja le önműködően a tesztet. A százalék és pontszám automatán számolódik, de a böngészős teszt nem hitelesített, felügyelet nélküli vizsgarendszer.

## Technikai részletek

- A weboldal egyetlen HTML-belépési pontot használ (`index.html`), a kérdések és a tananyag szövege a `data.js` és `guides.js` fájlokban van.
- A képek WebP formátumúak, külön `assets/` könyvtárban.
- Az alkalmazás internetszolgáltatás nélkül is megjeleníthető a fájlok közvetlen megnyitásával; a `localStorage` viselkedése `file://` környezetben böngészőfüggő, GitHub Pages alól stabilabb.
- Az eredménylap létrehozása a böngésző saját nyomtatási/PDF funkciójára épül.
- A Windows Server 2012 és Windows 7 támogatása megszűnt: **csak elkülönített teszt-VM-ben** használd. Soha ne futtass Sysprepet a már működő tartományvezérlőn.
- A mintaképernyők régebbi gépneveket és beállításokat mutathatnak; a **szöveges feladatban szereplő neveket és értékeket** kell követni.
- Nyilvános terjesztés előtt győződj meg róla, hogy a mellékelt oktatási anyag képernyőképeinek újraközlésére jogosult vagy.
