/* DFS gyakorlóoldal – Windows Server 2012 és Windows 7; helyben futó feladatadatok */
window.LAB_DATA = {
  "modules": [
    {
      "id": "prep",
      "icon": "🧭",
      "title": "01 · Előkészítés és DFS-alapok",
      "minutes": 35,
      "intro": "Az előző AD DS–DNS–DHCP labor működő állapotából indulunk. Ellenőrzöd a VirtualBox hálózatot, a tartományt, a névfeloldást és a jogosultságokat. A labor alapútvonala egy szerverrel és egy Windows 7 klienssel is elvégezhető.",
      "goals": [
        "DFS Namespace és DFS Replication megkülönböztetése",
        "Meglévő tartomány és névfeloldás ellenőrzése",
        "Visszaállítható, biztonságos VM-környezet kialakítása"
      ],
      "theory": [
        [
          "DFS névtér",
          "A DFS Namespaces egyetlen, logikai UNC-útvonal alá szervezi a különböző megosztott mappákra mutató hivatkozásokat. Ilyen lesz a \\\\gyakorlat.local\\mappak."
        ],
        [
          "DFS mappacél (folder target)",
          "A DFS-névtérben látható mappa egy tényleges, SMB-megosztásra irányít: például \\\\SRV-DC1\\szoftver. A névtér nem másolja át a fájlokat."
        ],
        [
          "DFS Replication",
          "Az adatok több szerver közötti szinkronizálása önálló funkció. A jelen alapfeladat névteret és két megosztást készít, automatikus replikáció nélkül."
        ],
        [
          "Előkészített tartomány",
          "Az előző laborból meglévő gyakorlat.local tartomány, működő DNS és LAN1 szükséges. Az alapútvonalhoz nem kell új tartományt telepíteni."
        ]
      ],
      "steps": [
        [
          "A korábbi hálózati labor ellenőrzése",
          "Indítsd el a már működő SRV-DC1 és WIN7-01 virtuális gépeket. A DFS az előző feladatban elkészített tartományra épül.",
          "ipconfig /all",
          "Az itt megadott IP-k az előző laborhoz illeszkedő minták, nem egy újabb kötelező átcímzési feladat."
        ],
        [
          "Pillanatkép készítése",
          "A jogosultságok és szolgáltatások módosítása előtt legyen visszaállítási pont.",
          "",
          "A pillanatkép nem helyettesíti a valódi adatmentést, de oktatási laborban gyors visszaállítást biztosít."
        ],
        [
          "A tartomány és a számítógép nevének ellenőrzése",
          "A szerver neve SRV-DC1, a Windows 7 gép neve WIN7-01, a tartomány gyakorlat.local.",
          "hostname\nwhoami\nwhoami /fqdn",
          "A mintaképek az eredeti többgépes laborból származnak; a képeken látható gépnevek nem a mostani előírt értékek."
        ],
        [
          "IP- és DNS-kapcsolat próbája",
          "A kliensnek a tartományvezérlő DNS-kiszolgálóját kell használnia.",
          "ipconfig /all\nping 192.168.15.254\nnslookup gyakorlat.local\nnslookup SRV-DC1.gyakorlat.local",
          "Sikertelen ping esetén vizsgáld meg a tűzfalszabályt is; nem szükséges a teljes tűzfalat kikapcsolni."
        ],
        [
          "Fiókok és tesztadatok előkészítése",
          "A gyakorlathoz tartományi adminisztrátor és egy egyszerű jogosultságú tesztfiók kell.",
          "whoami /groups",
          "A jelszót semmilyen beadandó képernyőképen ne jelenítsd meg."
        ],
        [
          "A névtér terve és a végleges UNC-utak",
          "Előbb rajzold le, mi lesz az egyetlen kiszolgálóval megvalósított mappastruktúra.",
          "",
          "Az azonos névtér nem bizonyít replikációt. Az adattárolás és a jogosultság külön ellenőrzendő."
        ]
      ],
      "shots": [
        [
          "s57_01",
          "A tartomány és a számítógép nevének ellenőrzése"
        ],
        [
          "s57_02",
          "A tartomány és a számítógép nevének ellenőrzése"
        ],
        [
          "s62_03",
          "A tartomány és a számítógép nevének ellenőrzése"
        ],
        [
          "s60_02",
          "IP- és DNS-kapcsolat próbája"
        ],
        [
          "s62_03",
          "IP- és DNS-kapcsolat próbája"
        ]
      ]
    },
    {
      "id": "roles",
      "icon": "🧰",
      "title": "02 · DFS-szerepkör telepítése",
      "minutes": 40,
      "intro": "Felszereled a Windows Server 2012 fájlkiszolgálói DFS-összetevőit. A képeken a tényleges varázslóablakok látszanak, mellettük az elvégzendő kattintások.",
      "goals": [
        "DFS Namespaces szolgáltatás szerepe",
        "DFS Replication és DFS Namespaces különbsége",
        "Telepített szerepkör ellenőrzése"
      ],
      "theory": [
        [
          "File and Storage Services",
          "A DFS Namespaces és a DFS Replication a Windows Server 2012 File and Storage Services → File and iSCSI Services alá tartozik."
        ],
        [
          "DFS Namespaces szerepkör",
          "Létrehozhatunk tartományi névteret és ahhoz mappacélokat rendelhetünk."
        ],
        [
          "DFS Replication szerepkör",
          "Külön szolgáltatás a több szerver közötti fájlreplikációra. Ebben a laborban a forrás lépéseit követve telepíthető, de önmagában még nem konfigurál replikációs csoportot."
        ]
      ],
      "steps": [
        [
          "Server Manager és szerepkörvarázsló",
          "Nyisd meg a szerepkörök telepítését az SRV-DC1-en.",
          null,
          null
        ],
        [
          "Telepítési típus és célgép",
          "A helyi Windows Server gépre telepítjük a DFS szerepkört.",
          null,
          null
        ],
        [
          "DFS Namespaces szerepkör kiválasztása",
          "A File and iSCSI Services alatti DFS Namespaces jelölőnégyzetet kell bekapcsolni.",
          null,
          null
        ],
        [
          "DFS Replication szerepkör – miért szerepel itt?",
          "A PDF-ben a DFS Replication is telepítve van, de ettől még nem indul el automatikus másolás.",
          "",
          "A két megosztás egyszerű felvétele nem jelent DFSR-replikációt."
        ],
        [
          "Telepítés megerősítése",
          "A kiválasztott szerepkörök listájának jóváhagyása.",
          null,
          null
        ],
        [
          "Telepítés utáni ellenőrzés",
          "A varázsló visszajelez a telepítés sikerességéről.",
          null,
          null
        ],
        [
          "DFS Management megnyitása",
          "A DFS varázslói a DFS Management (dfsmgmt.msc) konzolból érhetők el.",
          "dfsmgmt.msc",
          null
        ]
      ],
      "shots": [
        [
          "s63_01",
          "Server Manager és szerepkörvarázsló"
        ],
        [
          "s63_02",
          "Server Manager és szerepkörvarázsló"
        ],
        [
          "s63_02",
          "Telepítési típus és célgép"
        ],
        [
          "s63_02",
          "DFS Namespaces szerepkör kiválasztása"
        ],
        [
          "s64_01",
          "DFS Namespaces szerepkör kiválasztása"
        ],
        [
          "s64_02",
          "DFS Replication szerepkör – miért szerepel itt?"
        ],
        [
          "s65_01",
          "Telepítés megerősítése"
        ],
        [
          "s65_02",
          "Telepítés megerősítése"
        ],
        [
          "s66_01",
          "Telepítés utáni ellenőrzés"
        ],
        [
          "s66_02",
          "DFS Management megnyitása"
        ],
        [
          "s67_01",
          "DFS Management megnyitása"
        ]
      ]
    },
    {
      "id": "namespace",
      "icon": "🗂️",
      "title": "03 · Tartományi DFS-névtér",
      "minutes": 50,
      "intro": "Elkészíted a gyakorlat.local tartományban elérhető mappak névteret. A cél, hogy a kliens állandó, egyszerű címet használhasson.",
      "goals": [
        "Namespace server és namespace root fogalma",
        "Domain-based namespace létrehozása",
        "A névtér UNC-címének ellenőrzése"
      ],
      "theory": [
        [
          "Tartományi névtér",
          "A \\\\gyakorlat.local\\mappak útvonal a tartomány névfeloldását használja; később további kiszolgálóval bővíthető."
        ],
        [
          "Namespace server",
          "Az a kiszolgáló, amely a DFS-névtér metaadatait kiszolgálja. Egy szerver esetén a laborkiszolgáló SRV-DC1."
        ],
        [
          "Namespace root megosztás",
          "A varázsló létrehoz egy gyökérmegosztást. Ettől külön mappákban tároljuk a tényleges szoftver és közös munka adatokat."
        ],
        [
          "Domain-based vs standalone",
          "A tartományi névtérhez Active Directory és működő DNS kell. Standalone névtér tartomány nélkül is lehetne, de nem ez a feladat."
        ]
      ],
      "steps": [
        [
          "Új DFS-névtér indítása",
          "A DFS Management konzolban új névtér varázslóját indítod el.",
          null,
          null
        ],
        [
          "Névtérkiszolgáló kiválasztása",
          "Az SRV-DC1 gépet használjuk a DFS-névtér gazdájának.",
          "ping SRV-DC1",
          "A mintaképeken korábbi gépnév látható: a saját laborodban SRV-DC1-et használj."
        ],
        [
          "A névtér neve: mappak",
          "Most még nem a szoftver vagy kozos_munka mappát hozod létre, hanem a közös gyökérnevet.",
          null,
          null
        ],
        [
          "Gyökérkönyvtár helye és alapjogosultság",
          "A namespace root ne ugyanaz a könyvtár legyen, mint a benne hivatkozott adatmappák.",
          "",
          "A névtérgyökér jogosultsága nem helyettesíti a tényleges SMB-megosztások és NTFS-mappák jogosultságait."
        ],
        [
          "Tartományi névtér kiválasztása",
          "A Namespace Type lapon Domain-based namespace típust kell választani.",
          null,
          null
        ],
        [
          "Összegzés és létrehozás",
          "Az ellenőrző képernyőn minden adatot nézz át.",
          null,
          null
        ],
        [
          "A névtér gyökérének megtekintése",
          "Még nincsenek alatta célmappák, de a gyökérnek már léteznie kell.",
          "dir \\gyakorlat.local\\mappak",
          null
        ],
        [
          "Mentés és képernyőképes bizonyíték",
          "A DFS névtér megjelenése az első lényeges adminisztrátori ellenőrzési pont.",
          null,
          null
        ]
      ],
      "shots": [
        [
          "s67_01",
          "Új DFS-névtér indítása"
        ],
        [
          "s67_02",
          "Új DFS-névtér indítása"
        ],
        [
          "s68_01",
          "Névtérkiszolgáló kiválasztása"
        ],
        [
          "s68_02",
          "Névtérkiszolgáló kiválasztása"
        ],
        [
          "s69_01",
          "Névtérkiszolgáló kiválasztása"
        ],
        [
          "s69_02",
          "A névtér neve: mappak"
        ],
        [
          "s69_03",
          "Gyökérkönyvtár helye és alapjogosultság"
        ],
        [
          "s69_04",
          "Tartományi névtér kiválasztása"
        ],
        [
          "s69_05",
          "Összegzés és létrehozás"
        ],
        [
          "s70_01",
          "Összegzés és létrehozás"
        ],
        [
          "s70_02",
          "A névtér gyökérének megtekintése"
        ],
        [
          "s70_02",
          "Mentés és képernyőképes bizonyíték"
        ]
      ]
    },
    {
      "id": "shares",
      "icon": "📁",
      "title": "04 · Megosztások és mappacélok",
      "minutes": 70,
      "intro": "Két valódi SMB-megosztást hozol létre, majd a DFS névtérbe külön mappacélként illeszted őket: szoftver és kozos_munka.",
      "goals": [
        "SMB megosztás és DFS mappacél elkülönítése",
        "Két mappacél készítése és ellenőrzése",
        "Megosztási és NTFS jogosultságok szerepe"
      ],
      "theory": [
        [
          "SMB megosztás",
          "A fizikai fájlokat ténylegesen valamelyik fájlkiszolgáló tárolja. Az UNC-út a gép nevét és a megosztás nevét tartalmazza."
        ],
        [
          "DFS-mappa",
          "A logikai mappanév (például szoftver) a DFS-névtérben jelenik meg; folder targetként a tényleges SMB-megosztás címe szerepel."
        ],
        [
          "Megosztási és NTFS-jogok",
          "Hálózati elérésnél a megosztás és az NTFS engedélyek együtt érvényesek: a szigorúbb korlátozás számít."
        ],
        [
          "Szoftver vs közös munka",
          "A szoftver gyakorlóterület átlagos felhasználó számára csak olvasható; a kozos_munka tartományi tesztfelhasználó számára írható, de a rendszerkönyvtárakhoz nem adunk jogot."
        ]
      ],
      "steps": [
        [
          "Külön fizikai adatmappák létrehozása",
          "A DFS gyökér és az adattartalom külön könyvtárakba kerüljenek.",
          "mkdir C:\\DFSData\\szoftver\nmkdir C:\\DFSData\\kozos_munka\necho DFS labor > C:\\DFSData\\szoftver\\tajekoztato.txt",
          null
        ],
        [
          "Szoftver megosztás létrehozása",
          "A forrásban bemutatott Create Share varázslót használjuk a szoftver megosztáshoz.",
          null,
          null
        ],
        [
          "A szoftver megosztás mappájának kiválasztása",
          "A megosztás helyét a saját szerveren kell kijelölni.",
          null,
          null
        ],
        [
          "Szoftver megosztási jogosultságai",
          "A tanulói jogosultság célja: olvasás igen, módosítás nem.",
          "",
          "A régi varázsló jelöléseit ne másold kritikátlanul: a megosztási és NTFS-jogosultságokat együtt kell ellenőrizni."
        ],
        [
          "Szoftver DFS-mappacél beállítása",
          "Összekötjük a szoftver logikai mappát a tényleges SRV-DC1 megosztással.",
          null,
          null
        ],
        [
          "Kozos_munka logikai DFS-mappa létrehozása",
          "A második mappa neve pontosan kozos_munka legyen.",
          null,
          null
        ],
        [
          "Kozos_munka SMB-megosztás létrehozása – alapmód",
          "Egyetlen szerver esetén a közös mappát is SRV-DC1-en készíted el.",
          null,
          null
        ],
        [
          "Kozos_munka megosztási jogosultság",
          "A normál tartományi tesztfelhasználó itt fájlt tudjon létrehozni és módosítani.",
          "",
          "Általános „Everyone: Full Control” beállítást nem kérünk. A teszteléshez használt csoportot célszerű egyértelműen meghatározni."
        ],
        [
          "A mappacél hozzáadása és ellenőrzése",
          "A kozos_munka DFS-mappához most kötjük hozzá az SMB-megosztást.",
          null,
          null
        ],
        [
          "Mappacélok és jogok ellenőrzése",
          "A névtér és a tényleges megosztás kettős ellenőrzése kötelező.",
          "dir \\gyakorlat.local\\mappak",
          null
        ]
      ],
      "shots": [
        [
          "s70_03",
          "Külön fizikai adatmappák létrehozása"
        ],
        [
          "s70_03",
          "Szoftver megosztás létrehozása"
        ],
        [
          "s70_04",
          "Szoftver megosztás létrehozása"
        ],
        [
          "s71_01",
          "Szoftver megosztás létrehozása"
        ],
        [
          "s71_02",
          "Szoftver megosztás létrehozása"
        ],
        [
          "s71_03",
          "A szoftver megosztás mappájának kiválasztása"
        ],
        [
          "s71_04",
          "A szoftver megosztás mappájának kiválasztása"
        ],
        [
          "s71_04",
          "Szoftver megosztási jogosultságai"
        ],
        [
          "s72_01",
          "Szoftver megosztási jogosultságai"
        ],
        [
          "s72_01",
          "Szoftver DFS-mappacél beállítása"
        ],
        [
          "s72_02",
          "Szoftver DFS-mappacél beállítása"
        ],
        [
          "s72_03",
          "Szoftver DFS-mappacél beállítása"
        ],
        [
          "s72_04",
          "Kozos_munka logikai DFS-mappa létrehozása"
        ],
        [
          "s72_05",
          "Kozos_munka logikai DFS-mappa létrehozása"
        ],
        [
          "s73_01",
          "Kozos_munka SMB-megosztás létrehozása – alapmód"
        ],
        [
          "s73_02",
          "Kozos_munka SMB-megosztás létrehozása – alapmód"
        ],
        [
          "s73_03",
          "Kozos_munka SMB-megosztás létrehozása – alapmód"
        ],
        [
          "s73_04",
          "Kozos_munka SMB-megosztás létrehozása – alapmód"
        ],
        [
          "s74_01",
          "Kozos_munka megosztási jogosultság"
        ],
        [
          "s74_02",
          "Kozos_munka megosztási jogosultság"
        ],
        [
          "s74_03",
          "Kozos_munka megosztási jogosultság"
        ],
        [
          "s74_04",
          "A mappacél hozzáadása és ellenőrzése"
        ],
        [
          "s75_01",
          "A mappacél hozzáadása és ellenőrzése"
        ],
        [
          "s75_02",
          "A mappacél hozzáadása és ellenőrzése"
        ],
        [
          "s75_03",
          "A mappacél hozzáadása és ellenőrzése"
        ],
        [
          "s75_03",
          "Mappacélok és jogok ellenőrzése"
        ]
      ]
    },
    {
      "id": "publish",
      "icon": "🏛️",
      "title": "05 · Megosztások közzététele a címtárban",
      "minutes": 35,
      "intro": "A megosztások Active Directoryban is kereshető objektumként jelennek meg. Ez a lépés nem helyettesíti a DFS-mappacélok létrehozását.",
      "goals": [
        "OU és megosztottmappa-objektum fogalma",
        "UNC-útvonal közzététele AD-ben",
        "Windows 7 keresési lehetőség értelmezése"
      ],
      "theory": [
        [
          "Organizational Unit (OU)",
          "Logikai tároló az Active Directoryban. A minta szerint külön Megosztasok OU-ba gyűjtjük a megosztott mappák hivatkozásait."
        ],
        [
          "Published shared folder",
          "Az AD-ben közzétett megosztás egy kereshető címtárobjektum: a hozzá rendelt UNC-út nem új fizikai másolat."
        ],
        [
          "Névtér és címtár különbsége",
          "A DFS-névtér tényleges fájlelérést szervez; az AD közzététel az objektum megtalálását segítheti."
        ]
      ],
      "steps": [
        [
          "Active Directory Users and Computers indítása",
          "A DNS-t vagy DFS-t most nem kell újratelepíteni: a meglévő ADUC konzolt nyitod meg.",
          "dsa.msc",
          null
        ],
        [
          "Megosztasok szervezeti egység",
          "A megosztottmappa-objektumok külön OU-ba kerülnek.",
          null,
          null
        ],
        [
          "Szoftver megosztás közzététele",
          "A DFS-útvonalat tesszük kereshetővé, nem a C: meghajtón levő fizikai mappát.",
          null,
          null
        ],
        [
          "Kozos_munka megosztás közzététele",
          "A második hivatkozás ugyanabban a szervezeti egységben legyen.",
          null,
          null
        ],
        [
          "A közzétett objektumok ellenőrzése",
          "A kereshető AD-hivatkozások mellett a DFS-mappaelérésnek is működnie kell.",
          null,
          null
        ]
      ],
      "shots": [
        [
          "s76_01",
          "Active Directory Users and Computers indítása"
        ],
        [
          "s76_02",
          "Megosztasok szervezeti egység"
        ],
        [
          "s76_03",
          "Megosztasok szervezeti egység"
        ],
        [
          "s76_04",
          "Szoftver megosztás közzététele"
        ],
        [
          "s76_05",
          "Szoftver megosztás közzététele"
        ],
        [
          "s76_06",
          "Kozos_munka megosztás közzététele"
        ],
        [
          "s77_01",
          "Kozos_munka megosztás közzététele"
        ],
        [
          "s77_01",
          "A közzétett objektumok ellenőrzése"
        ]
      ]
    },
    {
      "id": "client",
      "icon": "💻",
      "title": "06 · Windows 7 elérés és meghajtók",
      "minutes": 50,
      "intro": "A WIN7-01 kliensen megnyitod a DFS-megosztásokat, hálózati meghajtóként csatlakoztatod őket, majd egy normál felhasználóval ellenőrzöd az olvasási/írási jogokat.",
      "goals": [
        "UNC-útvonalak használata Windows 7-en",
        "S: és M: hálózati meghajtó hozzárendelése",
        "Tartományi admin és normál felhasználó jogainak összehasonlítása"
      ],
      "theory": [
        [
          "UNC-útvonal",
          "A \\\\gyakorlat.local\\mappak\\szoftver olyan név, amely a DFS-névtér által hivatkozott SMB-megosztást éri el."
        ],
        [
          "Meghajtóbetűjel",
          "A Windows 7 felhasználói környezetében a megosztás az S: és M: betűjellel is csatolható. Ez nem változtatja meg az adatok tárolási helyét."
        ],
        [
          "Hozzáférési teszt",
          "Az olvasás, írás, törlés eltérő művelet. Nem elég a mappát megnyitni: meg kell kísérelni a műveleteket, és rögzíteni az eredményt."
        ]
      ],
      "steps": [
        [
          "Tartományi bejelentkezés Windows 7-en",
          "Először a tartományi kliens működőképességét igazolod.",
          "whoami\nipconfig /all\nipconfig /flushdns",
          null
        ],
        [
          "A DFS gyökér megnyitása",
          "Közvetlenül a Windows Explorer címsorában ellenőrzöd a névtér elérését.",
          "dir \\gyakorlat.local\\mappak",
          null
        ],
        [
          "Megosztások keresése a címtárban",
          "A PDF ezen a ponton az Active Directoryban közzétett megosztások keresését is bemutatja.",
          null,
          null
        ],
        [
          "Szoftver meghajtó csatolása S: betűjelre",
          "A megosztás az Intézőben hálózati meghajtóként is látszódjon.",
          "net use S: \\gyakorlat.local\\mappak\\szoftver /persistent:yes",
          null
        ],
        [
          "Közös munka meghajtó csatolása M: betűjelre",
          "A második DFS-mappát az M: meghajtóhoz kötjük.",
          "net use M: \\gyakorlat.local\\mappak\\kozos_munka /persistent:yes",
          null
        ],
        [
          "Fájlkezelési próba normál felhasználóval",
          "A szoftver olvasható, de nem írható; a közös munka mappa írható legyen.",
          "echo DFS mappa ellenorzes > M:\\dfs_teszt.txt",
          "Csak saját laborfájlokat hozz létre. Más tanuló állományait ne töröld."
        ],
        [
          "Jogosultságteszt rendszergazdai felhasználóval",
          "Hasonlítsd össze, hogyan különböznek az adminisztrátor és a normál felhasználó lehetőségei.",
          "whoami\nnet use",
          null
        ],
        [
          "Végső UNC és meghajtóellenőrzés",
          "Rögzítsd az S: és M: csatolásokat és a tényleges helyeket.",
          "net use\ndir S:\ndir M:",
          null
        ]
      ],
      "shots": [
        [
          "s77_02",
          "A DFS gyökér megnyitása"
        ],
        [
          "s77_02",
          "Megosztások keresése a címtárban"
        ],
        [
          "s77_03",
          "Megosztások keresése a címtárban"
        ],
        [
          "s77_04",
          "Szoftver meghajtó csatolása S: betűjelre"
        ],
        [
          "s78_01",
          "Szoftver meghajtó csatolása S: betűjelre"
        ],
        [
          "s78_02",
          "Szoftver meghajtó csatolása S: betűjelre"
        ],
        [
          "s78_02",
          "Közös munka meghajtó csatolása M: betűjelre"
        ],
        [
          "s78_02",
          "Végső UNC és meghajtóellenőrzés"
        ]
      ]
    },
    {
      "id": "extra",
      "icon": "🧪",
      "title": "07 · Bővítés: második fájlkiszolgáló",
      "minutes": 45,
      "intro": "Választható haladó feladat. Az eredeti DFS-minta második, tartományba léptetett Windows Server gépre teszi a kozos_munka megosztást. Ha csak egy szervered van, ezt a részt olvasd el, de nem kötelező végrehajtani.",
      "goals": [
        "Tagkiszolgáló csatlakoztatása tartományhoz",
        "DNS-hibák felismerése",
        "A DFS mappacél áthelyezése második szerverre"
      ],
      "theory": [
        [
          "Kiegészítő gép",
          "SRV-FS1 egy külön Windows Server 2012 virtuális gép. Nem tartományvezérlő; a gyakorlat.local tartomány tagjaként fájlkiszolgálói szerepben működik."
        ],
        [
          "SID és Sysprep",
          "A PDF-ben egy nem megfelelően klónozott gép SID-ütközése szerepel. Biztonságosabb új, tiszta Windows Server telepítés vagy megfelelően általánosított sablon használata. Tartományvezérlőt nem szabad a szokásos kliens-Sysprep eljárással „javítani”."
        ],
        [
          "DNS-hiba",
          "Ha egy tartományvezérlő több IP-címet regisztrál, hibás névfeloldás lehet. A NAT/WAN-adaptert nem kívánjuk belső AD DNS-rekordként publikálni."
        ],
        [
          "Két mappacél ≠ replikáció",
          "A kozos_munka célját másik kiszolgálóra is áttehetjük, de a DFS Replication külön beállítást igényel."
        ]
      ],
      "steps": [
        [
          "Második virtuális szerver előkészítése",
          "Csak akkor végezd el, ha van külön második Windows Server 2012 VM-ed.",
          "ipconfig /all",
          "Ha a laborodban a .250 címet már használják, válassz másik, a DHCP-től kizárt szabad LAN1-címet."
        ],
        [
          "Domain-join egy külön Windows Serveren",
          "Az SRV-FS1 nevű tagkiszolgálót a gyakorlat.local tartományhoz kapcsolod.",
          null,
          null
        ],
        [
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás",
          "A forrásban egy SID-ütközés miatt nem sikerült tartományba léptetni a második gépet.",
          "cd %WINDIR%\\System32\\Sysprep",
          "Ezen a laboron a tartományvezérlőt semmilyen körülmények között ne általánosítsd a Sysprep eszközzel."
        ],
        [
          "OOBE és kezdeti rendszergazdai beállítás – magyarázat",
          "Az általánosított referencia-VM következő indulásakor kezdeti beállításokat kérhet.",
          null,
          null
        ],
        [
          "DNS diagnosztika tartománycsatlakozási hiba esetén",
          "A hibás vagy fölösleges DNS-rekordok megakadályozhatják az AD-szolgáltatás felderítését.",
          "nslookup gyakorlat.local\nnslookup SRV-DC1.gyakorlat.local\nipconfig /all",
          "A mintában régi VMware NAT-címek szerepelnek. A te VirtualBox-környezetedben ezektől eltérő címek várhatók."
        ],
        [
          "DNS-továbbító és gyorsítótár ellenőrzése",
          "A mintaképek DNS Forwarders beállítást és DNS-gyorsítótár tisztítást mutatnak.",
          "ipconfig /flushdns\nnslookup SRV-DC1.gyakorlat.local",
          null
        ],
        [
          "Kozos_munka megosztás áthelyezése SRV-FS1-re",
          "Ettől válik a két logikai DFS-mappa ténylegesen két külön szerveren tárolttá.",
          "net use M: \\gyakorlat.local\\mappak\\kozos_munka",
          "A DFS Replication nem indul el pusztán attól, hogy újabb mappacélt adsz a névtérhez. Adatköltöztetés vagy replikáció külön feladat."
        ]
      ],
      "shots": [
        [
          "s57_01",
          "Második virtuális szerver előkészítése"
        ],
        [
          "s57_01",
          "Domain-join egy külön Windows Serveren"
        ],
        [
          "s57_02",
          "Domain-join egy külön Windows Serveren"
        ],
        [
          "s63_01",
          "Domain-join egy külön Windows Serveren"
        ],
        [
          "s57_03",
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás"
        ],
        [
          "s58_01",
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás"
        ],
        [
          "s58_02",
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás"
        ],
        [
          "s58_03",
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás"
        ],
        [
          "s58_04",
          "Hibásan klónozott VM és Sysprep – csak elméleti bemutatás"
        ],
        [
          "s59_01",
          "OOBE és kezdeti rendszergazdai beállítás – magyarázat"
        ],
        [
          "s59_02",
          "OOBE és kezdeti rendszergazdai beállítás – magyarázat"
        ],
        [
          "s59_03",
          "OOBE és kezdeti rendszergazdai beállítás – magyarázat"
        ],
        [
          "s60_01",
          "DNS diagnosztika tartománycsatlakozási hiba esetén"
        ],
        [
          "s60_02",
          "DNS diagnosztika tartománycsatlakozási hiba esetén"
        ],
        [
          "s61_01",
          "DNS diagnosztika tartománycsatlakozási hiba esetén"
        ],
        [
          "s61_02",
          "DNS-továbbító és gyorsítótár ellenőrzése"
        ],
        [
          "s61_03",
          "DNS-továbbító és gyorsítótár ellenőrzése"
        ],
        [
          "s62_01",
          "DNS-továbbító és gyorsítótár ellenőrzése"
        ],
        [
          "s62_02",
          "DNS-továbbító és gyorsítótár ellenőrzése"
        ],
        [
          "s62_03",
          "DNS-továbbító és gyorsítótár ellenőrzése"
        ],
        [
          "s73_02",
          "Kozos_munka megosztás áthelyezése SRV-FS1-re"
        ],
        [
          "s73_03",
          "Kozos_munka megosztás áthelyezése SRV-FS1-re"
        ],
        [
          "s74_01",
          "Kozos_munka megosztás áthelyezése SRV-FS1-re"
        ],
        [
          "s75_01",
          "Kozos_munka megosztás áthelyezése SRV-FS1-re"
        ]
      ]
    },
    {
      "id": "finish",
      "icon": "✅",
      "title": "08 · Ellenőrzés és beadás",
      "minutes": 25,
      "intro": "A teljes DFS-konfigurációt ellenőrzőlista alapján véglegesíted, elkészíted a saját képernyőképeket és kitöltöd a 40 kérdéses zárótesztet.",
      "goals": [
        "Az eredmény igazolása saját képernyőképekkel",
        "Tipikus DNS/SMB/DFS hibák elkülönítése",
        "Teszt PDF-eredménylap elkészítése"
      ],
      "theory": [
        [
          "Amit a képernyőkép bizonyít",
          "Különböztesd meg a szerepkör sikeres telepítését, a DFS-névtér jelenlétét, a mappacélokat és a valódi felhasználói hozzáférést."
        ],
        [
          "Hibakeresési sorrend",
          "Elsőként IP / DNS, majd SMB megosztás, utána DFS namespace és végül jogosultság."
        ],
        [
          "Tényleges beadás",
          "A weboldal helyben menti a pipákat és a tesztválaszokat, de nem tölti fel a fájlokat. A PDF-et és a saját PNG-fájlokat a tanár által kijelölt felületre kell beküldeni."
        ]
      ],
      "steps": [
        [
          "Névtér és megosztások teljes ellenőrzése",
          "Vizsgáld meg, hogy a Windows 7-en mindkét DFS útvonal működik.",
          "net use\ndir \\gyakorlat.local\\mappak",
          null
        ],
        [
          "Hibaelhárítás: a DFS-útvonal nem nyílik meg",
          "Ne adj automatikusan teljes jogosultságot mindenkinek, hanem azonosítsd a hibás szintet.",
          "ping 192.168.15.254\nnslookup SRV-DC1.gyakorlat.local\nnet use",
          null
        ],
        [
          "Leadandó képernyőképek elkészítése",
          "A feladat lényeges mozzanatairól készíts valódi, önálló képernyőképeket.",
          null,
          null
        ],
        [
          "40 kérdéses záróteszt",
          "A DFS fogalmairól, szerepköreiről, beállításairól és hibakereséséről szóló teszt automatikusan kiértékel.",
          null,
          null
        ],
        [
          "Teszt PDF-be mentése és beküldés",
          "A PDF-eredménylap tartalmazza a teljes eredményt és kérdésenként a javítást.",
          null,
          null
        ]
      ],
      "shots": [
        [
          "s75_03",
          "Névtér és megosztások teljes ellenőrzése"
        ],
        [
          "s78_02",
          "Névtér és megosztások teljes ellenőrzése"
        ]
      ]
    }
  ],
  "evidence": [
    [
      "D01",
      "prep",
      "Windows 7 tartománytagság és IP/DNS",
      "D01_windows_7_tartománytagság_.png",
      true
    ],
    [
      "D02",
      "roles",
      "DFS Namespaces szerepkör telepítve",
      "D02_dfs_namespaces_szerepkör_t.png",
      true
    ],
    [
      "D03",
      "roles",
      "DFS Management konzol megnyitva",
      "D03_dfs_management_konzol_megn.png",
      true
    ],
    [
      "D04",
      "namespace",
      "Névtér létrehozás sikeres",
      "D04_névtér_létrehozás_sikeres.png",
      true
    ],
    [
      "D05",
      "namespace",
      "gyakorlat.local mappak névtér megjelenik",
      "D05_gyakorlatlocal_mappak_névt.png",
      true
    ],
    [
      "D06",
      "shares",
      "szoftver SMB megosztás célútja",
      "D06_szoftver_smb_megosztás_cél.png",
      true
    ],
    [
      "D07",
      "shares",
      "szoftver mappacél a DFS névtérben",
      "D07_szoftver_mappacél_a_dfs_né.png",
      true
    ],
    [
      "D08",
      "shares",
      "kozos_munka SMB megosztás és célút",
      "D08_kozos_munka_smb_megosztás_.png",
      true
    ],
    [
      "D09",
      "shares",
      "Mindkét DFS-mappa és mappacél látszik",
      "D09_mindkét_dfsmappa_és_mappac.png",
      true
    ],
    [
      "D10",
      "shares",
      "Szoftver megosztás és NTFS olvasási jog",
      "D10_szoftver_megosztás_és_ntfs.png",
      true
    ],
    [
      "D11",
      "shares",
      "kozos_munka megosztás és NTFS módosítási jog",
      "D11_kozos_munka_megosztás_és_n.png",
      true
    ],
    [
      "D12",
      "publish",
      "Megosztasok OU és két közzétett objektum",
      "D12_megosztasok_ou_és_két_közz.png",
      true
    ],
    [
      "D13",
      "client",
      "Windows 7 a DFS névtér mappáival",
      "D13_windows_7_a_dfs_névtér_map.png",
      true
    ],
    [
      "D14",
      "client",
      "S meghajtó csatolása",
      "D14_s_meghajtó_csatolása.png",
      true
    ],
    [
      "D15",
      "client",
      "M meghajtó csatolása",
      "D15_m_meghajtó_csatolása.png",
      true
    ],
    [
      "D16",
      "client",
      "S és M meghajtó egyszerre látszik",
      "D16_s_és_m_meghajtó_egyszerre_.png",
      true
    ],
    [
      "D17",
      "client",
      "Normál felhasználó S írás tiltva",
      "D17_normál_felhasználó_s_írás_.png",
      true
    ],
    [
      "D18",
      "client",
      "Normál felhasználó M írás sikeres",
      "D18_normál_felhasználó_m_írás_.png",
      true
    ],
    [
      "D19",
      "extra",
      "Második fájlkiszolgáló tartománytagság",
      "D19_második_fájlkiszolgáló_tar.png",
      false
    ],
    [
      "D20",
      "extra",
      "Második szerveren kozos_munka cél",
      "D20_második_szerveren_kozos_mu.png",
      false
    ]
  ],
  "questions": [
    [
      "Mit jelent a DFS rövidítés ebben a feladatban?",
      [
        "Distributed File System (elosztott állományrendszer)",
        "Dynamic File Storage",
        "Domain File Security",
        "Direct Folder Synchronization"
      ],
      0,
      "A DFS elosztott állományrendszert jelent; a névtér fájlmegosztásokat fog össze."
    ],
    [
      "Mire szolgál a DFS Namespaces?",
      [
        "Egységes logikai UNC-útvonal alá szervezi a megosztásokat.",
        "Fájlokat vírusellenőriz",
        "Kizárólag IP-címet oszt",
        "Minden állományt automatikusan lemásol"
      ],
      0,
      "A DFS Namespaces logikai elérési útvonalat ad, nem automatikus replikációt."
    ],
    [
      "Melyik a feladat tartományi DFS-névterének címe?",
      [
        "\\\\gyakorlat.local\\mappak",
        "\\\\SRV-DC1\\C$",
        "\\\\gyakorlat.local\\Users",
        "\\\\WIN7-01\\mappak"
      ],
      0,
      "A névtér címe a tartomány nevéből és a mappak gyökérből áll."
    ],
    [
      "Mit jelent a DFS mappacél?",
      [
        "Tényleges SMB-megosztás UNC-útvonala",
        "Helyi meghajtó betűjele",
        "VirtualBox NAT adapter",
        "DNS zóna típusa"
      ],
      0,
      "A mappacél egy valódi kiszolgálón levő megosztásra mutat."
    ],
    [
      "Melyik szolgáltatás NEM egyenlő a DFS Namespaces használatával?",
      [
        "A fájlok automatikus replikálása",
        "Logikai mappák listázása",
        "Tartományi UNC-út használata",
        "Mappacélokhoz irányítás"
      ],
      0,
      "A replikáció a DFS Replication külön funkciója."
    ],
    [
      "Melyik Windows Server 2012 szerepkör tartalmazza a DFS Namespaces opciót?",
      [
        "File and Storage Services → File and iSCSI Services",
        "AD Certificate Services",
        "Windows Deployment Services",
        "Print and Document Services"
      ],
      0,
      "A DFS Namespaces fájlkiszolgálói szolgáltatás."
    ],
    [
      "Melyik kezelőkonzollal konfigurálható a DFS névtér?",
      [
        "DFS Management",
        "Device Manager",
        "Task Scheduler",
        "Disk Cleanup"
      ],
      0,
      "A DFS Management (dfsmgmt.msc) kezeli a névtereket."
    ],
    [
      "Mi a DFS Management futtatási parancsa?",
      [
        "dfsmgmt.msc",
        "dsa.msc",
        "services.exe",
        "diskpart"
      ],
      0,
      "A dfsmgmt.msc a DFS kezelőkonzolt nyitja meg."
    ],
    [
      "A New Namespace varázsló elején mit kell kiválasztani?",
      [
        "A namespace server kiszolgálót",
        "A PDF nyomtatót",
        "A DHCP lease időt",
        "A kliens felbontását"
      ],
      0,
      "A névtér gazdáját, itt az SRV-DC1 gépet kell megadni."
    ],
    [
      "Melyik nevet írjuk a Namespace Name mezőbe?",
      [
        "mappak",
        "szoftver.exe",
        "kozos_munka.txt",
        "LAN1"
      ],
      0,
      "A logikai névtér gyökere a mappak."
    ],
    [
      "Melyik névtértípust használjuk a laborban?",
      [
        "Domain-based namespace",
        "Standalone-only workgroup",
        "NFS namespace",
        "FAT namespace"
      ],
      0,
      "A névtér AD-tartományban jön létre."
    ],
    [
      "Miért fontos a működő DNS a DFS-laborban?",
      [
        "A kliens fel tudja oldani a tartomány és szerver neveit.",
        "A DNS tárolja az összes fájlt.",
        "A DNS oszt NTFS engedélyeket.",
        "A DNS helyettesíti a DHCP-t."
      ],
      0,
      "A DFS UNC elérés nevekre épül, ezért a belső névfeloldás kulcsfontosságú."
    ],
    [
      "Melyik a Windows 7 kliens alapvető belső hálózata ebben a laborban?",
      [
        "VirtualBox Internal Network / LAN1",
        "Bridged az iskola éles hálózatára",
        "Kizárólag NAT a klienesen",
        "Host-only a tartománytól függetlenül"
      ],
      0,
      "A DFS-kliens és a kiszolgáló ugyanabban a labor-LAN1-ben van."
    ],
    [
      "Mi a tartomány neve a laborban?",
      [
        "gyakorlat.local",
        "workgroup",
        "dfs.example",
        "localhost"
      ],
      0,
      "A tartomány az előző gyakorlatban létrehozott gyakorlat.local."
    ],
    [
      "Melyik gép a névtér gazdája az alapváltozatban?",
      [
        "SRV-DC1",
        "WIN7-01",
        "VirtualBox host",
        "Hálózati nyomtató"
      ],
      0,
      "Az alapútvonalon SRV-DC1 szolgálja ki a névteret."
    ],
    [
      "Mit tárol az alapútvonalon a C:\\DFSRoots\\mappak?",
      [
        "A DFS névtér gyökérmegosztásához kapcsolódó könyvtárat",
        "A Windows 7 rendszerfájljait",
        "A DHCP konfigurációmentését",
        "A BIOS frissítést"
      ],
      0,
      "A gyökér a logikai namespace-hez tartozik, a valódi adattartalom külön mappákban van."
    ],
    [
      "Hogyan különítjük el a tényleges adatmappákat a DFS gyökértől?",
      [
        "C:\\DFSData\\szoftver és C:\\DFSData\\kozos_munka mappákban",
        "A Program Files könyvtár törlésével",
        "A Windows könyvtár megosztásával",
        "A DFS gyökér átnevezésével"
      ],
      0,
      "Az önálló adatmappák elkerülik a gyökér és a célmappák összekeverését."
    ],
    [
      "Mi az SRV-DC1 gépen létrehozott szoftver SMB-megosztás UNC-címe?",
      [
        "\\\\SRV-DC1\\szoftver",
        "\\\\gyakorlat.local\\DNS",
        "C:\\DFSRoots\\szoftver",
        "\\\\WIN7-01\\szoftver"
      ],
      0,
      "A tényleges SMB cél tartalmazza a kiszolgáló nevét."
    ],
    [
      "Melyik logikai név alatt jelenjen meg a második DFS-mappa?",
      [
        "kozos_munka",
        "workgroup",
        "SYSVOL",
        "DHCP_Leases"
      ],
      0,
      "A második DFS-mappa neve kozos_munka."
    ],
    [
      "Melyik címen éri el a kliens a második DFS-mappát?",
      [
        "\\\\gyakorlat.local\\mappak\\kozos_munka",
        "\\\\gyakorlat.local\\Users",
        "\\\\SRV-DC1\\C$",
        "\\\\WIN7-01\\Temp"
      ],
      0,
      "A kliens a logikai névtér útvonalát használja."
    ],
    [
      "Mit kell ellenőrizni, ha a kozos_munka megnyílik, de nem lehet bele írni?",
      [
        "A megosztási és NTFS módosítási jogosultságokat",
        "A monitor fényerejét",
        "A BIOS boot sorrendet",
        "Az egér sebességét"
      ],
      0,
      "A két engedélyrendszer együtt érvényesül."
    ],
    [
      "Mi a cél a szoftver megosztás normál felhasználói jogaival?",
      [
        "Olvasás megengedett, írás tiltott",
        "Teljes rendszergazdai jog",
        "Minden hozzáférés tiltott",
        "Tetszőleges törlés engedélyezett"
      ],
      0,
      "A szoftver mappát a normál felhasználó olvassa, de ne módosítsa."
    ],
    [
      "Milyen NTFS-jog általában megfelelő az írható kozos_munka mappához a kijelölt tesztcsoportnak?",
      [
        "Modify / Módosítás",
        "Take Ownership mindenkinek",
        "Csak List Folder, írás nélkül",
        "Nincs semmilyen hozzáférés"
      ],
      0,
      "A Modify jog lehetővé teszi a tesztfájlok létrehozását és szerkesztését."
    ],
    [
      "A Windows hálózati fájlelérésnél mely jogosultságok együtt számítanak?",
      [
        "Megosztási és NTFS jogosultságok",
        "Csak BIOS jogosultság",
        "Csak DHCP opció",
        "Kizárólag képernyőzár jelszó"
      ],
      0,
      "A megosztás és a fájlrendszer jogosultságai együttesen hatnak."
    ],
    [
      "Mire szolgál az Active Directoryban létrehozott Megosztasok OU?",
      [
        "Az AD-ben közzétett megosztásobjektumok rendezésére",
        "A DHCP scope törlésére",
        "A NAT beállítására",
        "A VirtualBox leállítására"
      ],
      0,
      "A szervezeti egység az AD-objektumok logikai tárolója."
    ],
    [
      "Melyik kezelőeszközzel hozhatunk létre OU-t?",
      [
        "Active Directory Users and Computers",
        "DFS Replication Monitor",
        "Windows Update",
        "Server Backup kizárólag"
      ],
      0,
      "Az OU az ADUC (dsa.msc) konzolban készül."
    ],
    [
      "Mit írunk a Shared Folder objektum Network path mezőjébe a Szoftver közzétételekor?",
      [
        "\\\\gyakorlat.local\\mappak\\szoftver",
        "C:\\Windows\\System32",
        "\\\\WIN7-01\\C$",
        "http://gyakorlat.local/szoftver"
      ],
      0,
      "A címtári objektum a DFS elérési útra mutat."
    ],
    [
      "A közzétett Shared Folder objektum ténylegesen hová másolja a fájlokat?",
      [
        "Sehova; kereshető hivatkozást tartalmaz.",
        "Automatikusan minden kliensre",
        "Az Active Directory adatbázisába fájlonként",
        "A DNS zónába"
      ],
      0,
      "Az AD közzététel nem másolja át a dokumentumokat."
    ],
    [
      "Melyik meghajtóbetűjelhez csatoljuk a szoftver DFS-mappát?",
      [
        "S:",
        "M:",
        "C:",
        "Z: csak"
      ],
      0,
      "A szoftverhez S: betűjelet használunk."
    ],
    [
      "Melyik meghajtóbetűjelhez csatoljuk a kozos_munka DFS-mappát?",
      [
        "M:",
        "S:",
        "A:",
        "P: kötelező"
      ],
      0,
      "A közös munkát M: betűjelként csatoljuk."
    ],
    [
      "Melyik parancs listázza a hálózati meghajtókapcsolatokat Windows 7-en?",
      [
        "net use",
        "ipconfig /flushdns",
        "taskkill /f",
        "format c:"
      ],
      0,
      "A net use felsorolja a hozzárendelt hálózati kapcsolatokat."
    ],
    [
      "Mit jelent a /persistent:yes a net use parancsban?",
      [
        "A Windows bejelentkezéskor is megpróbálja újracsatlakoztatni a kapcsolatot.",
        "A fájlok automatikus törlését",
        "A DFS Replication bekapcsolását",
        "A DNS-szerver újraindítását"
      ],
      0,
      "A /persistent:yes megjegyezteti a meghajtócsatlakozást."
    ],
    [
      "Mit várunk egy normál felhasználó szoftver-megosztás tesztjénél?",
      [
        "Olvasni tud, de új fájlt nem menthet.",
        "Futtathat új tartományvezérlőt",
        "Minden fájlt törölhet",
        "Semmit nem láthat egyáltalán"
      ],
      0,
      "A szoftver mappa normál felhasználónak olvasható, de írásvédett."
    ],
    [
      "Mi a jó eredmény a normál felhasználó kozos_munka tesztjénél?",
      [
        "Létrehoz, szerkeszt és újranyit egy próbaállományt.",
        "Csak üres meghajtót lát",
        "A tartomány feloszlik",
        "A DNS szolgáltatás leáll"
      ],
      0,
      "A kozos_munka mappában az előírt csoportnak módosítási joga van."
    ],
    [
      "Mi a bővített labor második kiszolgálójának neve?",
      [
        "SRV-FS1",
        "WIN7-01",
        "SRV-DC1 ugyanaz a gép",
        "LAN2"
      ],
      0,
      "A második szerver tagkiszolgáló, név szerint SRV-FS1."
    ],
    [
      "Miért nem elég a DFS Namespaces szerepkör két szerver fájljainak szinkronizálásához?",
      [
        "A replikációt külön konfigurálni kell.",
        "Az UNC-utak nem tartalmaznak betűt",
        "A DHCP letiltja a Windows-t",
        "Mert csak Linuxon működik"
      ],
      0,
      "A Namespace útvonalat szervez; a replikáció külön DFSR feladat."
    ],
    [
      "Mit nem szabad tenni a működő tartományvezérlőn a SID-hiba elhárításához?",
      [
        "Sysprep /generalize futtatása a tartományvezérlőn",
        "A DNS ellenőrzése",
        "Az ipconfig /all futtatása",
        "Pillanatkép készítése"
      ],
      0,
      "A Sysprep nem a működő DC javítására szolgál; új tagkiszolgálót tiszta VM-ből hozz létre."
    ],
    [
      "Mit ellenőrzöl először, ha a DFS UNC-útvonal nem érhető el?",
      [
        "A LAN1 IP/DNS kapcsolatot és a kiszolgáló névfeloldását",
        "A háttérkép színét",
        "A PowerPoint betűtípust",
        "A nyomtató tintaszintjét"
      ],
      0,
      "DFS elérési hibánál IP/DNS → SMB → DFS → jogosultság sorrendben érdemes haladni."
    ],
    [
      "Miért hasznos a közvetlen \\\\SRV-DC1\\szoftver teszt DFS-hiba esetén?",
      [
        "Megkülönbözteti az SMB-megosztás hibáját a névtér hibájától.",
        "Bekapcsolja a replikációt",
        "Törli a DNS zónát",
        "Új Windows fiókot hoz létre"
      ],
      0,
      "Ha közvetlen SMB működik, a DFS-névteret kell külön vizsgálni."
    ],
    [
      "Mit kell a tanár számára beküldeni a gyakorlati feladat végén?",
      [
        "Saját PNG-képernyőképeket és névvel ellátott PDF-teszteredményt",
        "Csak a mintaképeket",
        "Csak egy IP-címet üzenetben",
        "A domain admin jelszót"
      ],
      0,
      "A beadandó saját működési bizonyítékokat és a nyomtatható teszteredményt tartalmazza."
    ]
  ]
};
