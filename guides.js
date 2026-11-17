/* Részletes, képpel társított útmutatók */
window.LAB_GUIDES = {
  "prep": [
    {
      "actions": [
        "VirtualBox-ban ellenőrizd: a szerver LAN1 adaptere és a kliens egyetlen adaptere azonos nevű belső hálózatra (LAN1) csatlakozik.",
        "Ha a korábbi feladat végén /25 hálózatot használtál, tartsd meg: a szerver LAN1-címe 192.168.15.254/25, a kliens LAN1-en DHCP-t kap.",
        "Ha a korábbi labor más címezéssel működik, ne írd át fölöslegesen; dokumentáld, és az útmutató példacímeit igazítsd a saját laborodhoz.",
        "Az internetet a szerver NAT-adaptere biztosítja; a DFS-megosztásokhoz a Windows 7 kizárólag a belső LAN1-et használja."
      ],
      "images": []
    },
    {
      "actions": [
        "Állítsd le szabályosan a virtuális gépeket, vagy a VirtualBox által támogatott állapotban készíts pillanatképet.",
        "A VirtualBoxban nyisd meg a gép Snapshots / Pillanatképek felületét.",
        "Nevezd el például: DFS_elott_AD_DNS_mukodik.",
        "Ellenőrizd, hogy mindkét virtuális géphez látszik az új pillanatkép."
      ],
      "images": []
    },
    {
      "actions": [
        "A szerveren nyisd meg a Server Manager → Local Server lapot: a Computer name és a Domain sor legyen megfelelő.",
        "A Windows 7 rendszeren: Start → jobb kattintás Számítógép → Tulajdonságok; ellenőrizd a tartománytagságot.",
        "Ha a Windows 7 még nem tartománytag, a Rendszer → Beállítások módosítása → Módosítás alatt add meg a gyakorlat.local tartományt.",
        "Hitelesítéskor használd a tartományi rendszergazdát, majd a csatlakozást követően indítsd újra a klienst."
      ],
      "images": [
        "s57_01",
        "s57_02",
        "s62_03"
      ]
    },
    {
      "actions": [
        "Windows 7-en nyiss Parancssort: Start → Futtatás / kereső → cmd.",
        "Futtasd az ipconfig /all parancsot; keresd a DNS Servers sort. LAN1 hálózatban a szerver címe legyen 192.168.15.254.",
        "Ellenőrizd a kapcsolatot: ping 192.168.15.254.",
        "Ellenőrizd a tartomány feloldását: nslookup gyakorlat.local, valamint nslookup SRV-DC1.gyakorlat.local.",
        "Ha a DNS helyett a VirtualBox NAT DNS szerepel a kliensen, javítsd a LAN1 DHCP 006-os opcióját vagy az ideiglenes statikus DNS-t."
      ],
      "images": [
        "s60_02",
        "s62_03"
      ]
    },
    {
      "actions": [
        "A Server Manager → Tools → Active Directory Users and Computers konzolban ellenőrizd, hogy van működő tesztfelhasználó.",
        "Ha nincs, hozz létre egy külön gyakorló fiókot, például dfs.tanulo; adj neki erős, kizárólag a laborban használt jelszót.",
        "A tesztfelhasználó NE legyen a Domain Admins csoport tagja.",
        "A kliensen később ezzel a fiókkal teszteled, hogy mit tud olvasni vagy módosítani egy átlagos tartományi felhasználó."
      ],
      "images": []
    },
    {
      "actions": [
        "A DFS névtér neve mappak, teljes UNC-útvonala: \\\\gyakorlat.local\\mappak.",
        "A két logikai DFS-mappa: szoftver és kozos_munka.",
        "Alapmódban mindkét tényleges SMB-megosztás az SRV-DC1 gépen van: \\\\SRV-DC1\\szoftver és \\\\SRV-DC1\\kozos_munka.",
        "Bővített módban a kozos_munka mappacél a második kiszolgálóra (SRV-FS1) kerülhet.",
        "A cél: a kliensnek ugyanazt a DFS-útvonalat kell használnia akkor is, ha az alatta lévő megosztás másik szerveren van."
      ],
      "images": []
    }
  ],
  "roles": [
    {
      "actions": [
        "Jelentkezz be a Windows Server 2012 kiszolgálóra tartományi rendszergazdaként.",
        "Nyisd meg a Server Manager programot (vagy kattints a tálca megfelelő ikonjára).",
        "Kattints a Dashboard → Add Roles and Features pontra.",
        "A Before You Begin oldalon válaszd a Next lehetőséget."
      ],
      "images": [
        "s63_01",
        "s63_02"
      ]
    },
    {
      "actions": [
        "Az Installation Type ablakban válaszd a Role-based or feature-based installation lehetőséget.",
        "A Server Selection listában válaszd ki a helyi SRV-DC1 kiszolgálót.",
        "Ellenőrizd, hogy a kiválasztott gép valóban a gyakorlat.local tartomány tagja.",
        "Kattints a Next gombra."
      ],
      "images": [
        "s63_02"
      ]
    },
    {
      "actions": [
        "A Server Roles panelen bontsd ki: File and Storage Services → File and iSCSI Services.",
        "Jelöld be a DFS Namespaces szerepkört.",
        "A felugró Add Features ablakban hagyd kijelölve a DFS Management Tools kezelőeszközt.",
        "Kattints az Add Features, majd a Next lehetőségre."
      ],
      "images": [
        "s63_02",
        "s64_01"
      ]
    },
    {
      "actions": [
        "Ugyanabban a Server Roles listában keresd a DFS Replication lehetőséget.",
        "Jelöld ki, és ellenőrizd, hogy a DFS Namespaces is be van kapcsolva.",
        "Rögzítsd, hogy a DFS Replication csak későbbi, két kiszolgálós replikációs feladathoz kell.",
        "Az alapútvonal működéséhez önmagában a DFS Namespaces elegendő; ha azonos eredményt szeretnél a mintával, mindkét szerepkört telepítheted."
      ],
      "images": [
        "s64_02"
      ]
    },
    {
      "actions": [
        "A Features oldalon az alapbeállításokat általában megtarthatod.",
        "Az Installation Selections / Confirmation lapon ellenőrizd a DFS Namespaces és a kiválasztott DFS Replication szerepkört.",
        "Kattints az Install gombra; ha újraindításra kér, előbb mentsd a munkát.",
        "Várd meg a telepítési folyamat lezárását."
      ],
      "images": [
        "s65_01",
        "s65_02"
      ]
    },
    {
      "actions": [
        "A Results oldalon keresd az Installation succeeded / Installation successful jelzést.",
        "Zárd be a varázslót a Close gombbal.",
        "Server Manager → Manage → Add Roles and Features alatt visszaellenőrizheted, hogy a szerepkör telepítve van.",
        "Készíts képernyőképet a sikeres telepítésről vagy a szerepkörlistáról."
      ],
      "images": [
        "s66_01"
      ]
    },
    {
      "actions": [
        "Server Manager → Tools → DFS Management.",
        "Ha nem látod a menüben, ellenőrizd, hogy a DFS Management Tools is települt.",
        "A konzol bal oldalán keresd a Namespaces és Replication csomópontot.",
        "A későbbi feladatok a Namespaces alatt zajlanak."
      ],
      "images": [
        "s66_02",
        "s67_01"
      ]
    }
  ],
  "namespace": [
    {
      "actions": [
        "A DFS Management ablak bal oldalán jobb kattintás a Namespaces elemre.",
        "Válaszd a New Namespace… pontot.",
        "A varázsló első kérdése: melyik kiszolgáló fogja fogadni a névtér kéréseit?",
        "Haladj a Namespace Server oldallal."
      ],
      "images": [
        "s67_01",
        "s67_02"
      ]
    },
    {
      "actions": [
        "A Namespace Server mezőbe írd be: SRV-DC1.",
        "Ha a Check / Browse ablakból választanád: Browse → gépnév beírása → Check Names → OK.",
        "Ellenőrizd, hogy a gép megjelenik a varázslóban.",
        "Kattints a Next gombra."
      ],
      "images": [
        "s68_01",
        "s68_02",
        "s69_01"
      ]
    },
    {
      "actions": [
        "Namespace Name and Settings: a Name mezőbe írd: mappak.",
        "A varázslóban megjelenő mintacím a gyakorlat.local tartományba mutasson.",
        "Kattints az Edit Settings gombra; külön ellenőrizd a gyökérmegosztás helyét és jogosultságát.",
        "Ha a gyökérkönyvtár létrejön, tartsd külön a tényleges adatoktól."
      ],
      "images": [
        "s69_02"
      ]
    },
    {
      "actions": [
        "Az Edit Settings ablakban adj meg egy elkülönített helyet, például C:\\DFSRoots\\mappak.",
        "A megosztás neve legyen mappak.",
        "A gyökér megtekintéséhez a hitelesített tartományi felhasználók legalább olvasási jogosultságot kapjanak.",
        "A mappacélok tényleges írási jogosultságait később, külön a szoftver és kozos_munka megosztásoknál szabályozd.",
        "Fogadd el a beállításokat az OK gombbal."
      ],
      "images": [
        "s69_03"
      ]
    },
    {
      "actions": [
        "Válaszd a Domain-based namespace opciót.",
        "A Windows Server 2008 mode opció ebben a környezetben bekapcsolható, ha a tartományi feltételek teljesülnek.",
        "Ellenőrizd a preview sorban a domain-alapú UNC-címet.",
        "Kattints Next."
      ],
      "images": [
        "s69_04"
      ]
    },
    {
      "actions": [
        "A Review Settings oldalon: a kiszolgáló SRV-DC1, a névtér neve mappak, típusa domain-based.",
        "Ha bármi hibás, válaszd a Previous lehetőséget.",
        "Ha minden rendben, kattints a Create gombra.",
        "A Confirmation oldalon keresd a Success állapotot."
      ],
      "images": [
        "s69_05",
        "s70_01"
      ]
    },
    {
      "actions": [
        "A DFS Management → Namespaces alatt nyisd meg a \\\\gyakorlat.local\\mappak elemet.",
        "Ellenőrizd a Namespace Servers fülön, hogy az SRV-DC1 jelenik meg.",
        "Nyisd meg a File Explorer címsorában: \\\\gyakorlat.local\\mappak.",
        "A gyökér üres lehet, amíg nem adtuk hozzá a két logikai DFS-mappát."
      ],
      "images": [
        "s70_02"
      ]
    },
    {
      "actions": [
        "A DFS Management bal oldali fájában jelöld ki a gyakorlat.local tartományban lévő mappak névteret.",
        "Gondoskodj arról, hogy a névtér teljes UNC-útvonala olvasható legyen.",
        "Készíts saját PNG-képernyőképet, ne a mintaképet mentsd le.",
        "A fájlnévhez használd a leadandó lista megfelelő sorát."
      ],
      "images": [
        "s70_02"
      ]
    }
  ],
  "shares": [
    {
      "actions": [
        "SRV-DC1-en nyisd meg a Fájlkezelőt a C: meghajtón.",
        "Hozd létre a C:\\DFSData\\szoftver és C:\\DFSData\\kozos_munka mappákat.",
        "A szoftver mappában hozz létre egy olvasható fájlt: tajekoztato.txt.",
        "A kozos_munka mappában hozz létre egy alapteszt-fájlt: kozos_proba.txt.",
        "Ellenőrizd, hogy ezek nem a C:\\DFSRoots\\mappak gyökér belsejébe kerültek."
      ],
      "images": [
        "s70_03"
      ]
    },
    {
      "actions": [
        "DFS Management → Namespaces → \\\\gyakorlat.local\\mappak → jobb kattintás → New Folder.",
        "A Name mezőbe írd: szoftver.",
        "A Folder Targets mellett nyomd meg az Add, majd a Browse gombot.",
        "A megosztásválasztó ablakban SRV-DC1 kiszolgálót adj meg; válaszd a New Shared Folder pontot.",
        "A Share name legyen szoftver, a Local path C:\\DFSData\\szoftver."
      ],
      "images": [
        "s70_03",
        "s70_04",
        "s71_01",
        "s71_02"
      ]
    },
    {
      "actions": [
        "A Create Share ablakban kattints a Browse gombra.",
        "A mappafában navigálj: C: → DFSData → szoftver.",
        "Ha még nincs mappa, a Make New Folder paranccsal hozd létre.",
        "A kiválasztott könyvtár a Local path mezőben pontosan C:\\DFSData\\szoftver legyen.",
        "Kattints az OK gombra."
      ],
      "images": [
        "s71_03",
        "s71_04"
      ]
    },
    {
      "actions": [
        "A megosztás létrehozásakor állítsd az általános tartományi felhasználóknak a Read jogot.",
        "A Domain Admins / Administrators csoport teljes jogosultságát hagyd meg.",
        "A C:\\DFSData\\szoftver mappa NTFS-biztonsági lapján is ellenőrizd, hogy a normál tesztfelhasználónak csak Read & Execute joga van.",
        "Kattints az OK gombra a megosztás elkészítéséhez."
      ],
      "images": [
        "s71_04",
        "s72_01"
      ]
    },
    {
      "actions": [
        "A Browse for Shared Folders ablakban válaszd ki az új szoftver megosztást.",
        "Az Add Folder Target mezőben ellenőrizd: \\\\SRV-DC1\\szoftver.",
        "A New Folder ablakban a Name: szoftver és a Folder Targets alatt ez az UNC legyen látható.",
        "Kattints az OK gombra és ellenőrizd, hogy az új mappa megjelenik a DFS Management fában."
      ],
      "images": [
        "s72_01",
        "s72_02",
        "s72_03"
      ]
    },
    {
      "actions": [
        "A \\\\gyakorlat.local\\mappak névtéren jobb kattintás → New Folder.",
        "A Name mező: kozos_munka (ékezet és szóköz nélkül).",
        "A Folder Targets → Add gombbal add meg a tényleges megosztás útját.",
        "Alapmódban a cél \\\\SRV-DC1\\kozos_munka; bővített módban \\\\SRV-FS1\\kozos_munka."
      ],
      "images": [
        "s72_04",
        "s72_05"
      ]
    },
    {
      "actions": [
        "A megosztás keresésénél Browse → SRV-DC1 → New Shared Folder.",
        "Share name: kozos_munka, helyi útvonal: C:\\DFSData\\kozos_munka.",
        "A létrehozás után a Folder Target mezőbe \\\\SRV-DC1\\kozos_munka kerüljön.",
        "A későbbi kiterjesztett változatban átirányíthatod / további célként felveheted az SRV-FS1 megosztást, de ez nem replikál automatikusan."
      ],
      "images": [
        "s73_01",
        "s73_02",
        "s73_03",
        "s73_04"
      ]
    },
    {
      "actions": [
        "A kozos_munka megosztás Share Permissions lapján adj Change jogot a gyakorlásra kiválasztott csoportnak / felhasználónak.",
        "A C:\\DFSData\\kozos_munka mappán NTFS jogként Modify szükséges ugyanezen eléréshez.",
        "Administrators és SYSTEM jogosultságait hagyd megfelelő állapotban; ismeretlen fiókoknak ne adj teljes hozzáférést.",
        "A két réteg beállítása után erősítsd meg a megosztást."
      ],
      "images": [
        "s74_01",
        "s74_02",
        "s74_03"
      ]
    },
    {
      "actions": [
        "A Browse for Shared Folders listában jelöld ki a kozos_munka megosztást.",
        "Az Add Folder Target ablakban a beállított célút szerepeljen.",
        "Fogadd el OK-val a célmegadást.",
        "A New Folder ablakban ellenőrizd a kozos_munka nevet és a mappacélt; OK.",
        "A DFS Management bal panelén legyen két logikai mappa: szoftver, kozos_munka."
      ],
      "images": [
        "s74_04",
        "s75_01",
        "s75_02",
        "s75_03"
      ]
    },
    {
      "actions": [
        "A DFS Managementben nyisd meg sorban a szoftver és a kozos_munka mappát.",
        "A Folder Targets fülön ellenőrizd az UNC-címeket.",
        "A Windows Explorer címsorába írd be: \\\\gyakorlat.local\\mappak\\szoftver, majd \\\\gyakorlat.local\\mappak\\kozos_munka.",
        "Rendszergazdaként mindkét helyen látni kell a próbaállományokat.",
        "Készíts képet, amelyen a DFS-mappák és a mögöttes célutak olvashatók."
      ],
      "images": [
        "s75_03"
      ]
    }
  ],
  "publish": [
    {
      "actions": [
        "SRV-DC1-en Server Manager → Tools → Active Directory Users and Computers.",
        "Alternatív megoldás: Win+R → dsa.msc.",
        "Bontsd ki a gyakorlat.local tartományt.",
        "A bal oldali fában kattints a tartomány nevére."
      ],
      "images": [
        "s76_01"
      ]
    },
    {
      "actions": [
        "Jobb kattintás a gyakorlat.local tartományon → New → Organizational Unit.",
        "Name: Megosztasok (az egyszerű laborban ékezet nélkül).",
        "Az accidental deletion védelem maradhat kijelölve.",
        "Kattints az OK gombra; a tartomány alatt megjelenik a Megosztasok OU."
      ],
      "images": [
        "s76_02",
        "s76_03"
      ]
    },
    {
      "actions": [
        "Jobb kattintás a Megosztasok OU-ra → New → Shared Folder.",
        "Name: Szoftver.",
        "Network path (\\\\server\\share): \\\\gyakorlat.local\\mappak\\szoftver.",
        "Nyomd meg az OK gombot.",
        "A Megosztasok OU-ban Shared Folder típusú Szoftver objektum jelenjen meg."
      ],
      "images": [
        "s76_04",
        "s76_05"
      ]
    },
    {
      "actions": [
        "A Megosztasok OU-n jobb kattintás → New → Shared Folder.",
        "Name: Kozos_munka.",
        "Network path: \\\\gyakorlat.local\\mappak\\kozos_munka.",
        "Kattints az OK-ra, majd frissítsd a konzolt.",
        "Ellenőrizd, hogy mindkét megosztásobjektum látható."
      ],
      "images": [
        "s76_06",
        "s77_01"
      ]
    },
    {
      "actions": [
        "Kattints a Szoftver objektumra, és nézd meg a Properties / Tulajdonságok ablakban a Network path értéket.",
        "Ismételd meg ugyanezt a Kozos_munka objektumnál.",
        "A két hivatkozásnak a tartományi DFS-útvonalra kell mutatnia.",
        "Készíts PNG képet a két Shared Folder objektumról a Megosztasok OU-ban."
      ],
      "images": [
        "s77_01"
      ]
    }
  ],
  "client": [
    {
      "actions": [
        "Indítsd el a WIN7-01 gépet, szükség esetén a Ctrl+Alt+Del bejelentkező felületen válassz másik felhasználót.",
        "Jelentkezz be egy tartományi tesztfelhasználóval, például GYAKORLAT\\dfs.tanulo.",
        "Parancssorban futtasd a whoami és az ipconfig /all parancsokat.",
        "A DNS-kiszolgáló a tartományvezérlő legyen; szükség esetén futtasd az ipconfig /flushdns utasítást."
      ],
      "images": []
    },
    {
      "actions": [
        "Kattints a Windows 7 tálcán a Windows Explorer / Intéző ikonjára.",
        "A címsorba írd be: \\\\gyakorlat.local\\mappak, majd Enter.",
        "A megnyitott helyen szoftver és kozos_munka mappát kell látnod.",
        "Ha nem nyílik meg, próbáld külön a \\\\SRV-DC1\\szoftver SMB-utat; ez segít elkülöníteni a DFS és a megosztási problémát."
      ],
      "images": [
        "s77_02"
      ]
    },
    {
      "actions": [
        "A Windows 7 Intéző Network / Hálózat nézetében keresd a Search Active Directory / Keresés az Active Directoryban lehetőséget, ha a kiadás és a környezet felkínálja.",
        "A keresési típus legyen Shared Folders, a hely pedig gyakorlat.local.",
        "A Name mezővel keresd a Szoftver objektumot; indítsd a Find Now keresést.",
        "Ha a keresőparancs nem látható, ez nem akadály: az előző lépés közvetlen DFS-UNC útvonalával ugyanúgy elvégezhető a feladat."
      ],
      "images": [
        "s77_02",
        "s77_03"
      ]
    },
    {
      "actions": [
        "A Start → Számítógép ablakban kattints a Hálózati meghajtó csatlakoztatása lehetőségre.",
        "Válaszd a Drive / Meghajtó mezőben az S: betűjelet.",
        "Folder / Mappa: \\\\gyakorlat.local\\mappak\\szoftver.",
        "Ha bejelölöd a Reconnect at logon opciót, a Windows újra megpróbálja csatlakoztatni bejelentkezéskor.",
        "A Finish / Befejezés után ellenőrizd, hogy az S: megjelent a Számítógépben."
      ],
      "images": [
        "s77_04",
        "s78_01",
        "s78_02"
      ]
    },
    {
      "actions": [
        "Nyisd meg újra a Hálózati meghajtó csatlakoztatása ablakot.",
        "Meghajtóbetűjel: M:.",
        "Elérési út: \\\\gyakorlat.local\\mappak\\kozos_munka.",
        "Kattints a Befejezés gombra.",
        "A Számítógép ablakban egyszerre legyen látható az S: és az M: hálózati meghajtó."
      ],
      "images": [
        "s78_02"
      ]
    },
    {
      "actions": [
        "Egyszerű tartományi tesztfelhasználóként nyisd meg az S: meghajtót: olvasd el a tajekoztato.txt fájlt.",
        "Próbálj az S:-re új fájlt menteni. Elvárt: Hozzáférés megtagadva / nincs írási jog.",
        "Nyisd meg az M: meghajtót és hozz létre egy sajat_nev.txt állományt.",
        "Írj bele néhány sort, mentsd, majd nyisd meg újból.",
        "Ha az M: művelet is tiltott, ellenőrizd külön a megosztási és az NTFS Modify jogot."
      ],
      "images": []
    },
    {
      "actions": [
        "Jelentkezz ki a normál felhasználói munkamenetből.",
        "Jelentkezz be a tartományi rendszergazdai gyakorlófiókkal.",
        "A két megosztáson ellenőrizd a hozzáférést és a mappák tulajdonságait.",
        "Készíts külön képet a normál felhasználó korlátozott műveletéről és az adminisztrátori ellenőrzésről.",
        "Ne keverd össze a rendszergazdai hozzáférést azzal, hogy minden tartományi felhasználónak teljes hozzáférés járna."
      ],
      "images": []
    },
    {
      "actions": [
        "Futtasd: net use.",
        "Keresd a két sort: S: → \\\\gyakorlat.local\\mappak\\szoftver és M: → \\\\gyakorlat.local\\mappak\\kozos_munka.",
        "Futtasd a dir S: és dir M: utasításokat.",
        "Az Intézőben készíts képet, amelyen mindkét meghajtóbetűjel látszik."
      ],
      "images": [
        "s78_02"
      ]
    }
  ],
  "extra": [
    {
      "actions": [
        "Hozz létre tiszta telepítésből egy külön Windows Server 2012 virtuális gépet.",
        "Állítsd be a nevét SRV-FS1-re, és kapcsolódjon belső VirtualBox Internal Network → LAN1 hálózathoz.",
        "Használható statikus laborcím: 192.168.15.250/25 (ha az előző DHCP laborban a .250–.254 tartomány kizárt).",
        "Alapértelmezett átjáró: 192.168.15.254; elsődleges DNS: 192.168.15.254.",
        "A második VM-et még nem kell Domain Controller szerepre előléptetni."
      ],
      "images": [
        "s57_01"
      ]
    },
    {
      "actions": [
        "Server Manager → Local Server → Computer Name → Change.",
        "Válaszd a Domain tagságot és írd be: gyakorlat.local.",
        "A hitelesítési kérdésnél add meg a tartományi rendszergazda fiókját.",
        "Sikeres csatlakozás esetén megjelenik a Welcome to the gyakorlat.local domain üzenet.",
        "Indítsd újra az SRV-FS1 gépet."
      ],
      "images": [
        "s57_01",
        "s57_02",
        "s63_01"
      ]
    },
    {
      "actions": [
        "Nézd meg az SID-ütközési hibát ábrázoló mintaképet.",
        "Értsd meg: egy tartományvezérlő egyszerű másolata nem megfelelő kiindulópont tagkiszolgáló készítéséhez.",
        "Ha tiszta telepítést használsz, ez a javítási lépés nem szükséges.",
        "Egy még NEM tartománytag, NEM tartományvezérlő, erre előkészített referencia-VM általánosítása esetén a Sysprep /generalize /oobe eszköz használható; utána az OOBE újragenerálja a telepítés egyedi adatait.",
        "Ne futtasd a Sysprepet a működő SRV-DC1 tartományvezérlőn."
      ],
      "images": [
        "s57_03",
        "s58_01",
        "s58_02",
        "s58_03",
        "s58_04"
      ]
    },
    {
      "actions": [
        "A képeken a régió, nyelv és rendszergazdai jelszó kezdeti beállítóoldalai látszanak.",
        "Az adatokat csak a külön tagkiszolgálón add meg, ha tényleg Sysprepelt, nem tartománytag referencia VM-et indítottál.",
        "Tiszta telepítés vagy kész külön tagkiszolgáló esetén ezt a lépést kihagyhatod.",
        "Ellenőrizd, hogy az új VM neve SRV-FS1, nem azonos a tartományvezérlőével."
      ],
      "images": [
        "s59_01",
        "s59_02",
        "s59_03"
      ]
    },
    {
      "actions": [
        "Ha az SRV-FS1 tartományba léptetése sikertelen, ne módosíts DNS-t véletlenszerűen.",
        "SRV-FS1-en futtasd: nslookup gyakorlat.local és nslookup SRV-DC1.gyakorlat.local.",
        "SRV-DC1-en futtasd az ipconfig /all parancsot és hasonlítsd össze a válaszból kapott címeket.",
        "Csak egyértelműen téves, már nem használt címbejegyzést törölj a DNS konzolból, a működő LAN1-rekordot ne.",
        "Ha a DNS-kiszolgáló WAN/NAT-címe jelenik meg AD-rekordként, ellenőrizd az interfészek DNS-regisztrációs beállításait."
      ],
      "images": [
        "s60_01",
        "s60_02",
        "s61_01"
      ]
    },
    {
      "actions": [
        "Server Manager → Tools → DNS; jobb kattintás SRV-DC1 → Properties → Forwarders.",
        "Ellenőrizd, hogy az AD DNS nem a korábbi másik VM helytelen címét használja továbbítónak.",
        "A Clear Cache parancs csak a DNS gyorsítótárát üríti; a tartományi rekordokat nem kell emiatt törölni.",
        "Végezz új nslookup próbát a tartományra és az SRV-DC1 névre.",
        "Csak ezután próbáld újra a tartományba csatlakozást."
      ],
      "images": [
        "s61_02",
        "s61_03",
        "s62_01",
        "s62_02",
        "s62_03"
      ]
    },
    {
      "actions": [
        "SRV-FS1-en hozd létre a C:\\DFSData\\kozos_munka helyi mappát és a kozos_munka SMB-megosztást.",
        "Állítsd be ugyanazokat a tervezett megosztási és NTFS-jogosultságokat, amelyeket az alapútvonalban gyakoroltál.",
        "SRV-DC1 DFS Management → Namespaces → \\\\gyakorlat.local\\mappak → kozos_munka → Folder Targets.",
        "A korábbi cél helyett add meg: \\\\SRV-FS1\\kozos_munka. Az alapcél csak akkor távolítható el biztonságosan, ha a fájlokat ellenőrzötten átvitted és az új elérés működik.",
        "A WIN7-01-en az M: meghajtó DFS-útvonala változatlan marad."
      ],
      "images": [
        "s73_02",
        "s73_03",
        "s74_01",
        "s75_01"
      ]
    }
  ],
  "finish": [
    {
      "actions": [
        "A kliensen nyisd meg a \\\\gyakorlat.local\\mappak névteret.",
        "Ellenőrizd a szoftver és kozos_munka mappát.",
        "Futtasd a net use parancsot és hasonlítsd össze az S: és M: betűjelek célját.",
        "Készíts képet a szerveren a DFS Management névtérről, a kliensen az S: és M: meghajtóról."
      ],
      "images": [
        "s75_03",
        "s78_02"
      ]
    },
    {
      "actions": [
        "A kliensen pingeld a szervert, majd futtasd az nslookup SRV-DC1.gyakorlat.local parancsot.",
        "Próbáld megnyitni közvetlenül a \\\\SRV-DC1\\szoftver megosztást.",
        "Ha az SMB működik, de a DFS-út nem, a DFS Managementben nézd meg a Namespace Servers és Folder Targets beállításokat.",
        "Ha a mappa megnyílik, de írni nem tudsz, ellenőrizd a Share Permissions + NTFS Security jogosultságokat.",
        "Ügyelj arra, hogy rendszergazdai fiók és normál felhasználó eredménye eltérhet."
      ],
      "images": []
    },
    {
      "actions": [
        "A Windows 7-ben használhatod a Képmetszőt (Snipping Tool), vagy PrtScn → Paint módszert.",
        "A szerveren is használhatod a Képmetszőt, ha elérhető, vagy a Print Screen → Paint módszert.",
        "Ments minden képet PNG-ként, olvasható felbontásban.",
        "A weboldal Leadandó képek menüjében pontosan megadom az egyes képek tárgyát és ajánlott fájlnevét.",
        "Jelszavak és személyes adatok ne szerepeljenek a képeken."
      ],
      "images": []
    },
    {
      "actions": [
        "Nyisd meg a 40 kérdéses záróteszt menüpontot.",
        "Írd be a teljes nevedet és az osztályodat.",
        "Válaszolj az összes kérdésre; a kihagyottakat is láthatod.",
        "A végén kattints a Kiértékelem a tesztet gombra.",
        "Ellenőrizd a pontszámot, százalékot és a hibák magyarázatát."
      ],
      "images": []
    },
    {
      "actions": [
        "A kiértékelés után kattints a PDF eredménylap nyomtatása gombra.",
        "A böngésző nyomtatási ablakában válaszd: Mentés PDF-ként (Save as PDF).",
        "A fájlt nevezd el például Vezeteknev_Keresztnev_DFS_teszt.pdf névre.",
        "A saját képernyőképekkel együtt csatold a Classroom feladatához.",
        "A weboldal önmagában nem tölt fel semmit és nem küld semmilyen eredményt automatikusan."
      ],
      "images": []
    }
  ]
};
