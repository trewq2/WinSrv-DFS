# Tanári útmutató – DFS LAB

**Eszközök:** Windows Server 2012 (SRV-DC1) és Windows 7 (WIN7-01) VirtualBox alatt. A meglevő `gyakorlat.local` tartományra, működő DNS-szolgáltatásra és LAN1 belső hálózatra épül.

## Javasolt óraszervezés

- **1. óra:** elmélet, DNS/tartomány ellenőrzés, DFS Namespaces szerepkör.
- **2. óra:** tartományi `\\gyakorlat.local\mappak` névtér létrehozása.
- **3–4. óra:** `szoftver` és `kozos_munka` megosztások, mappacélok, jogosultságok.
- **5. óra:** AD-címtári közzététel, Windows 7 csatolások, S:/M: és felhasználói próba.
- **6. óra:** hibakeresés, képernyőképek ellenőrzése, 40 kérdéses záróteszt.

A 2. szerveres bővítés (+7 lépés) külön alkalomra vagy gyorsabban haladó tanulóknak ajánlott.

## Elvárt eredmény – alapútvonal

- DFS-névtér: `\\gyakorlat.local\mappak`.
- DFS-mappák: `szoftver`, `kozos_munka`.
- Az SRV-DC1-en SMB-megosztásként mindkettő elérhető; a tényleges adatok külön könyvtárban vannak.
- A normál felhasználó a **szoftver** mappát olvassa, de nem módosíthatja; a **kozos_munka** mappába próbaállományt készíthet.
- Windows 7: S: a szoftver, M: a kozos_munka DFS-mappára mutat.
- ADUC: `Megosztasok` OU és két közzétett Shared Folder objektum.

## Beadás

**18 kötelező kép** és **2 választható kép** szerepel a beépített leadási listán. A tanuló a saját Windows-ablakairól készítsen PNG-fájlt, és a lista szerinti beszédes néven mentse. A teszt PDF-eredménylapja tartalmazza a nevet, osztályt, elért pontot, százalékot, és mind a 40 kérdésre adott választ a javítással és magyarázattal együtt.

A weboldal **nem küld automatikusan fájlokat** a tanárnak. A beadás az Ön által használt felületen (például Classroom) történik.

## Kiemelt szakmai megjegyzések

- Az alapfeladat egy szerverrel szemlélteti a DFS Namespace működését; **két szerver között ténylegesen elosztott tárolás** csak a választható SRV-FS1 bővítésben valósul meg.
- A **DFS Replication** nem egyenlő a névtér elkészítésével. A szerepkör telepítése önmagában nem konfigurál replikációt.
- Klónozási hibajavításként a működő tartományvezérlőn **ne használjanak Sysprepet**. Második tagkiszolgálóhoz tiszta telepítés vagy előre általánosított, NEM-DC sablon szükséges.
- A laborgépek ne érjék el közvetlenül az iskola éles hálózatát. Régi operációs rendszerekre különösen indokolt az elkülönített VirtualBox belső hálózat.
- Nyilvános GitHub-közzététel előtt ellenőrizze a felhasznált illusztrációk újraközlési jogosultságát.

## Publikálás

Töltse fel a ZIP kicsomagolt tartalmát egy új GitHub Pages repositoryba vagy a régi repo `dfs/` alkönyvtárába; ne írja felül az előző tananyag `index.html`-jét, ha a két weblapot külön szeretné megtartani.
