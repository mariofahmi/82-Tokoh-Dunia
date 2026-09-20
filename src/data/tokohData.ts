import { Tokoh, EraCategory } from '../types/tokoh';

export const TOKOH_DATA: Tokoh[] = [
  {
    "rank": 2,
    "name": "Isaac Newton",
    "origin": "Inggris",
    "years": "1642 – 1727",
    "influence": "Hukum gerak, gravitasi, kalkulus, optik; fondasi sains modern",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg/330px-Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Isaac_Newton",
    "wikiDesc": "English polymath (1642–1727)"
  },
  {
    "rank": 7,
    "name": "Ts'ai Lun",
    "origin": "Cina",
    "years": "tak pasti (aktif ±105 M)",
    "influence": "Penemu kertas",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Cai-lun.jpg/330px-Cai-lun.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Cai_Lun",
    "wikiDesc": "Chinese Han dynasty official and paper innovator"
  },
  {
    "rank": 8,
    "name": "Johann Gutenberg",
    "origin": "Jerman",
    "years": "±1400 – 1468",
    "influence": "Mesin cetak huruf lepas di Eropa",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Mainz_Gutenbergdenkmal_2016_%28cropped%29.jpg/330px-Mainz_Gutenbergdenkmal_2016_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Johannes_Gutenberg",
    "wikiDesc": "German inventor and craftsman (c. 1393–1406 – 1468)"
  },
  {
    "rank": 9,
    "name": "Christopher Columbus",
    "origin": "Italia (Genoa)",
    "years": "1451 – 1506",
    "influence": "Membuka Amerika bagi Eropa; awal kolonisasi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg/330px-Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Christopher_Columbus",
    "wikiDesc": "Italian navigator and explorer (1451–1506)"
  },
  {
    "rank": 10,
    "name": "Albert Einstein",
    "origin": "Jerman",
    "years": "1879 – 1955",
    "influence": "Teori relativitas; E = mc²",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Albert_Einstein_Head_cleaned.jpg/330px-Albert_Einstein_Head_cleaned.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Albert_Einstein",
    "wikiDesc": "German-born theoretical physicist (1879–1955)"
  },
  {
    "rank": 11,
    "name": "Karl Marx",
    "origin": "Jerman",
    "years": "1818 – 1883",
    "influence": "Teori komunisme",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png/330px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Karl_Marx",
    "wikiDesc": "German philosopher and socialist (1818–1883)"
  },
  {
    "rank": 12,
    "name": "Louis Pasteur",
    "origin": "Prancis",
    "years": "1822 – 1895",
    "influence": "Teori kuman dan vaksinasi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Louis_Pasteur%2C_foto_av_Paul_Nadar%2C_Crisco_edit.jpg/330px-Louis_Pasteur%2C_foto_av_Paul_Nadar%2C_Crisco_edit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Louis_Pasteur",
    "wikiDesc": "French chemist, pharmacist and microbiologist (1822–1895)"
  },
  {
    "rank": 13,
    "name": "Galileo Galilei",
    "origin": "Italia",
    "years": "1564 – 1642",
    "influence": "Metode ilmiah eksperimental; teleskop; mekanika",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Galileo_Galilei_%281564-1642%29_RMG_BHC2700.tiff/lossy-page1-330px-Galileo_Galilei_%281564-1642%29_RMG_BHC2700.tiff.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Galileo_Galilei",
    "wikiDesc": "Italian physicist and astronomer (1564–1642)"
  },
  {
    "rank": 14,
    "name": "Aristoteles",
    "origin": "Yunani",
    "years": "384 – 322 SM",
    "influence": "Logika dan pendekatan rasional pada ilmu dan filsafat",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/330px-Aristotle_Altemps_Inv8575.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Aristotle",
    "wikiDesc": "Ancient Greek philosopher and polymath (384–322 BC)"
  },
  {
    "rank": 15,
    "name": "Lenin",
    "origin": "Rusia",
    "years": "1870 – 1924",
    "influence": "Pendiri negara komunis pertama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Lenin_in_1920_%28cropped%29.jpg/330px-Lenin_in_1920_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Vladimir_Lenin",
    "wikiDesc": "Leader of the Soviet Union from 1922 to 1924"
  },
  {
    "rank": 17,
    "name": "Charles Darwin",
    "origin": "Inggris",
    "years": "1809 – 1882",
    "influence": "Evolusi melalui seleksi alam",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Charles_Darwin_seated_crop.jpg/330px-Charles_Darwin_seated_crop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Charles_Darwin",
    "wikiDesc": "English naturalist and biologist (1809–1882)"
  },
  {
    "rank": 18,
    "name": "Shih Huang Ti",
    "origin": "Cina",
    "years": "259 – 210 SM",
    "influence": "Menyatukan Cina; kaisar pertama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/QinShiHuang19century.jpg/330px-QinShiHuang19century.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Qin_Shi_Huang",
    "wikiDesc": "Emperor of China from 221 to 210 BC"
  },
  {
    "rank": 19,
    "name": "Augustus Caesar",
    "origin": "Roma (Italia)",
    "years": "63 SM – 14 M",
    "influence": "Pendiri Kekaisaran Romawi; Pax Romana",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Augustus_of_Prima_Porta.jpg/330px-Augustus_of_Prima_Porta.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Augustus",
    "wikiDesc": "Roman emperor from 27 BC to AD 14"
  },
  {
    "rank": 20,
    "name": "Mao Tse-Tung",
    "origin": "Cina",
    "years": "1893 – 1976",
    "influence": "Merombak Cina menjadi negara komunis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Mao_Zedong_1950_Portrait_%283x4_cropped%29%282%29.jpg/330px-Mao_Zedong_1950_Portrait_%283x4_cropped%29%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Mao_Zedong",
    "wikiDesc": "Leader of China from 1949 to 1976"
  },
  {
    "rank": 21,
    "name": "Jengis Khan",
    "origin": "Mongolia",
    "years": "±1162 – 1227",
    "influence": "Membangun kekaisaran Mongol yang menaklukkan Asia",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/330px-YuanEmperorAlbumGenghisPortrait.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Genghis_Khan",
    "wikiDesc": "Khan of the Mongol Empire from 1206 to 1227"
  },
  {
    "rank": 22,
    "name": "Euclid",
    "origin": "Yunani",
    "years": "±abad ke-3 SM",
    "influence": "Geometri Euclides (Elements)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Italian_-_Euclid_-_Google_Art_Project.jpg/330px-Italian_-_Euclid_-_Google_Art_Project.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Euclid",
    "wikiDesc": "Ancient Greek mathematician (fl. 300 BC)"
  },
  {
    "rank": 24,
    "name": "Nicolaus Copernicus",
    "origin": "Polandia",
    "years": "1473 – 1543",
    "influence": "Teori heliosentris",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Nikolaus_Kopernikus_MOT.jpg/330px-Nikolaus_Kopernikus_MOT.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Nicolaus_Copernicus",
    "wikiDesc": "Mathematician and astronomer (1473–1543)"
  },
  {
    "rank": 25,
    "name": "James Watt",
    "origin": "Skotlandia",
    "years": "1736 – 1819",
    "influence": "Mesin uap praktis; kunci Revolusi Industri",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Watt_James_von_Breda.jpg/330px-Watt_James_von_Breda.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "James_Watt",
    "wikiDesc": "Scottish inventor, engineer and chemist (1736–1819)"
  },
  {
    "rank": 27,
    "name": "George Washington",
    "origin": "Amerika Serikat",
    "years": "1732 – 1799",
    "influence": "Panglima perang kemerdekaan; presiden pertama AS",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/330px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "George_Washington",
    "wikiDesc": "Founding Father, U.S. president from 1789 to 1797"
  },
  {
    "rank": 28,
    "name": "Michael Faraday",
    "origin": "Inggris",
    "years": "1791 – 1867",
    "influence": "Induksi elektromagnetik; motor dan dinamo listrik",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Michael_Faraday_sitting_crop.jpg/330px-Michael_Faraday_sitting_crop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Michael_Faraday",
    "wikiDesc": "English chemist and physicist (1791–1867)"
  },
  {
    "rank": 29,
    "name": "James Clerk Maxwell",
    "origin": "Skotlandia",
    "years": "1831 – 1879",
    "influence": "Empat persamaan yang menyatukan listrik dan magnet",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/James-Clerk-Maxwell-1831-1879.jpg/330px-James-Clerk-Maxwell-1831-1879.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "James_Clerk_Maxwell",
    "wikiDesc": "Scottish physicist and mathematician (1831–1879)"
  },
  {
    "rank": 30,
    "name": "Orville & Wilbur Wright",
    "origin": "Amerika Serikat",
    "years": "W. 1867 – 1912; O. 1871 – 1948",
    "influence": "Pesawat terbang bermesin pertama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Orville_Wright_1905-crop.jpg/330px-Orville_Wright_1905-crop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Wright_brothers",
    "wikiDesc": "American aviation pioneers, inventors of the airplane"
  },
  {
    "rank": 31,
    "name": "Antoine Lavoisier",
    "origin": "Prancis",
    "years": "1743 – 1794",
    "influence": "Peletak dasar kimia modern",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/David_-_Portrait_of_Monsieur_Lavoisier_%28cropped%292.jpg/330px-David_-_Portrait_of_Monsieur_Lavoisier_%28cropped%292.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Antoine_Lavoisier",
    "wikiDesc": "French nobleman and chemist (1743–1794)"
  },
  {
    "rank": 32,
    "name": "Sigmund Freud",
    "origin": "Austria (kini Ceko)",
    "years": "1856 – 1939",
    "influence": "Psikoanalisis; peran alam bawah sadar",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg/330px-Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Sigmund_Freud",
    "wikiDesc": "Austrian neurologist and founder of psychoanalysis (1856–1939)"
  },
  {
    "rank": 33,
    "name": "Alexander Yang Agung",
    "origin": "Makedonia (Yunani)",
    "years": "356 – 323 SM",
    "influence": "Menaklukkan Persia; menyebarkan budaya Yunani",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Alexander_Mosaic_detail_of_Alexander_the_Great_%283x4_cropped%29.jpg/330px-Alexander_Mosaic_detail_of_Alexander_the_Great_%283x4_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Alexander_the_Great",
    "wikiDesc": "King of Macedon from 336 to 323 BC"
  },
  {
    "rank": 34,
    "name": "Napoleon Bonaparte",
    "origin": "Prancis (Korsika)",
    "years": "1769 – 1821",
    "influence": "Penakluk Eropa; menyebarkan ide Revolusi Prancis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/330px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Napoleon",
    "wikiDesc": "Emperor of the French (1804–1814; 1815)"
  },
  {
    "rank": 35,
    "name": "Adolf Hitler",
    "origin": "Austria",
    "years": "1889 – 1945",
    "influence": "Pemicu Perang Dunia II; dimasukkan karena pengaruh, bukan penghormatan",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Hitler_portrait_crop_%28cropped%29%282%29.jpg/330px-Hitler_portrait_crop_%28cropped%29%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Adolf_Hitler",
    "wikiDesc": "Dictator of Germany from 1933 to 1945"
  },
  {
    "rank": 36,
    "name": "William Shakespeare",
    "origin": "Inggris",
    "years": "1564 – 1616",
    "influence": "Dramawan terbesar berbahasa Inggris",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/William_Shakespeare_by_John_Taylor%2C_edited.jpg/330px-William_Shakespeare_by_John_Taylor%2C_edited.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "William_Shakespeare",
    "wikiDesc": "English playwright and poet (1564–1616)"
  },
  {
    "rank": 37,
    "name": "Adam Smith",
    "origin": "Skotlandia",
    "years": "1723 – 1790",
    "influence": "Ekonomi klasik dan pasar bebas (Wealth of Nations)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Adam_Smith_The_Muir_portrait.jpg/330px-Adam_Smith_The_Muir_portrait.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Adam_Smith",
    "wikiDesc": "Scottish economist and philosopher (1723–1790)"
  },
  {
    "rank": 38,
    "name": "Thomas Edison",
    "origin": "Amerika Serikat",
    "years": "1847 – 1931",
    "influence": "Lampu pijar, jaringan listrik, fonograf, film",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/330px-Thomas_Edison2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Thomas_Edison",
    "wikiDesc": "American inventor and businessman (1847–1931)"
  },
  {
    "rank": 39,
    "name": "Antony van Leeuwenhoek",
    "origin": "Belanda",
    "years": "1632 – 1723",
    "influence": "Mikroskop; penemu mikroorganisme",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Anthonie_van_Leeuwenhoek_%281632-1723%29._Natuurkundige_te_Delft_Rijksmuseum_SK-A-957.jpeg/330px-Anthonie_van_Leeuwenhoek_%281632-1723%29._Natuurkundige_te_Delft_Rijksmuseum_SK-A-957.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Antonie_van_Leeuwenhoek",
    "wikiDesc": "Dutch microbiologist (1632–1723)"
  },
  {
    "rank": 40,
    "name": "Plato",
    "origin": "Yunani",
    "years": "427 – 347 SM",
    "influence": "Filsafat politik dan etika Barat; Akademi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Plato_Silanion_Musei_Capitolini_MC1377.png/330px-Plato_Silanion_Musei_Capitolini_MC1377.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Plato",
    "wikiDesc": "Ancient Greek philosopher (c. 428-347 BC)"
  },
  {
    "rank": 41,
    "name": "Guglielmo Marconi",
    "origin": "Italia",
    "years": "1874 – 1937",
    "influence": "Radio (komunikasi nirkabel)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Guglielmo_Marconi.jpg/330px-Guglielmo_Marconi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Guglielmo_Marconi",
    "wikiDesc": "Italian electrical engineer and inventor (1874–1937)"
  },
  {
    "rank": 42,
    "name": "Ludwig van Beethoven",
    "origin": "Jerman",
    "years": "1770 – 1827",
    "influence": "Komposer besar transisi klasik ke romantik",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg/330px-Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Ludwig_van_Beethoven",
    "wikiDesc": "German composer (1770–1827)"
  },
  {
    "rank": 43,
    "name": "Werner Heisenberg",
    "origin": "Jerman",
    "years": "1901 – 1976",
    "influence": "Mekanika kuantum; prinsip ketidakpastian",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Werner_Heisenberg_Portrait_%283x4_cropped%29.jpg/330px-Werner_Heisenberg_Portrait_%283x4_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Werner_Heisenberg",
    "wikiDesc": "German physicist (1901–1976)"
  },
  {
    "rank": 44,
    "name": "Alexander Graham Bell",
    "origin": "Skotlandia (dihitung Inggris)",
    "years": "1847 – 1922",
    "influence": "Telepon",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Alexander_Graham_Bell_1895_NPG_77_363.jpg/330px-Alexander_Graham_Bell_1895_NPG_77_363.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Alexander_Graham_Bell",
    "wikiDesc": "Inventor of the telephone (1847–1922)"
  },
  {
    "rank": 45,
    "name": "Alexander Fleming",
    "origin": "Skotlandia",
    "years": "1881 – 1955",
    "influence": "Penisilin",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Synthetic_Production_of_Penicillin_TR1468.jpg/330px-Synthetic_Production_of_Penicillin_TR1468.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Alexander_Fleming",
    "wikiDesc": "Scottish physician and microbiologist (1881–1955)"
  },
  {
    "rank": 46,
    "name": "Simon Bolivar",
    "origin": "Venezuela",
    "years": "1783 – 1830",
    "influence": "Membebaskan lima negeri Amerika Selatan dari Spanyol",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Sim%C3%B3n_Bol%C3%ADvar._Toro_Moreno%2C_Luis._1922%2C_Legislative_Palace%2C_La_Paz.png/330px-Sim%C3%B3n_Bol%C3%ADvar._Toro_Moreno%2C_Luis._1922%2C_Legislative_Palace%2C_La_Paz.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Simón_Bolívar",
    "wikiDesc": "Venezuelan statesman and military officer (1783–1830)"
  },
  {
    "rank": 47,
    "name": "Oliver Cromwell",
    "origin": "Inggris",
    "years": "1599 – 1658",
    "influence": "Kemenangan parlemen; dasar demokrasi parlementer Inggris",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Oliver_Cromwell_by_Samuel_Cooper.jpg/330px-Oliver_Cromwell_by_Samuel_Cooper.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Oliver_Cromwell",
    "wikiDesc": "English military and political leader (1599–1658)"
  },
  {
    "rank": 48,
    "name": "John Locke",
    "origin": "Inggris",
    "years": "1632 – 1704",
    "influence": "Gagasan konstitusi demokratis; memengaruhi AS dan Prancis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Godfrey_Kneller_-_Portrait_of_John_Locke_%28Hermitage%29.jpg/330px-Godfrey_Kneller_-_Portrait_of_John_Locke_%28Hermitage%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "John_Locke",
    "wikiDesc": "English philosopher and physician (1632–1704)"
  },
  {
    "rank": 49,
    "name": "Michelangelo",
    "origin": "Italia",
    "years": "1475 – 1564",
    "influence": "Puncak seni Renaisans (David, Sistina, Pietà)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/330px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Michelangelo",
    "wikiDesc": "Italian artist and architect (1475–1564)"
  },
  {
    "rank": 54,
    "name": "Max Planck",
    "origin": "Jerman",
    "years": "1858 – 1947",
    "influence": "Teori kuantum",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Max_Planck_by_Hugo_Erfurth_1938cr_-_restoration1.jpg/330px-Max_Planck_by_Hugo_Erfurth_1938cr_-_restoration1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Max_Planck",
    "wikiDesc": "German physicist (1858–1947)"
  },
  {
    "rank": 56,
    "name": "William T.G. Morton",
    "origin": "Amerika Serikat",
    "years": "1819 – 1868",
    "influence": "Memperkenalkan anestesi eter dalam bedah",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/WTG_Morton.jpg/330px-WTG_Morton.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "William_T._G._Morton",
    "wikiDesc": "American dentist and physician (1819–1868)"
  },
  {
    "rank": 57,
    "name": "William Harvey",
    "origin": "Inggris",
    "years": "1578 – 1657",
    "influence": "Penemu peredaran darah",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/William_Harvey_2.jpg/330px-William_Harvey_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "William_Harvey",
    "wikiDesc": "English physician (1578–1657)"
  },
  {
    "rank": 58,
    "name": "Antoine Henri Becquerel",
    "origin": "Prancis",
    "years": "1852 – 1908",
    "influence": "Penemu radioaktivitas",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Paul_Nadar_-_Henri_Becquerel.jpg/330px-Paul_Nadar_-_Henri_Becquerel.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Henri_Becquerel",
    "wikiDesc": "French physicist (1852–1908)"
  },
  {
    "rank": 59,
    "name": "Gregor Mendel",
    "origin": "Austria (kini Ceko)",
    "years": "1822 – 1884",
    "influence": "Hukum pewarisan sifat (genetika)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Gregor_Mendel_2.jpg/330px-Gregor_Mendel_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Gregor_Mendel",
    "wikiDesc": "Austrian biologist and friar (1822–1884)"
  },
  {
    "rank": 60,
    "name": "Joseph Lister",
    "origin": "Inggris",
    "years": "1827 – 1912",
    "influence": "Antiseptik dalam pembedahan",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Joseph_Lister_1902.jpg/330px-Joseph_Lister_1902.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Joseph_Lister",
    "wikiDesc": "English scientist, surgeon and antiseptic pioneer (1827–1912)"
  },
  {
    "rank": 61,
    "name": "Nikolaus August Otto",
    "origin": "Jerman",
    "years": "1832 – 1891",
    "influence": "Mesin pembakaran dalam empat langkah",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Nikolaus_August_Otto.png/330px-Nikolaus_August_Otto.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Nikolaus_Otto",
    "wikiDesc": "Inventor of the internal combustion engine"
  },
  {
    "rank": 62,
    "name": "Louis Daguerre",
    "origin": "Prancis",
    "years": "1787 – 1851",
    "influence": "Fotografi praktis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Louis_Daguerre_2.jpg/330px-Louis_Daguerre_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Louis_Daguerre",
    "wikiDesc": "French scientist, artist and photographer (1787–1851)"
  },
  {
    "rank": 63,
    "name": "Joseph Stalin",
    "origin": "Georgia (Uni Soviet)",
    "years": "1879 – 1953",
    "influence": "Diktator Soviet; masuk karena pengaruh, bukan penghormatan",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/StalinCropped1943.jpg/330px-StalinCropped1943.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Joseph_Stalin",
    "wikiDesc": "Leader of the Soviet Union from 1924 to 1953"
  },
  {
    "rank": 64,
    "name": "René Descartes",
    "origin": "Prancis",
    "years": "1596 – 1650",
    "influence": "Filsafat modern; geometri analitik",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/330px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "René_Descartes",
    "wikiDesc": "French philosopher and mathematician (1596–1650)"
  },
  {
    "rank": 65,
    "name": "Julius Caesar",
    "origin": "Roma",
    "years": "100 – 44 SM",
    "influence": "Menaklukkan Galia; membuka jalan bagi Kekaisaran Romawi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg/330px-Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Julius_Caesar",
    "wikiDesc": "Roman general and dictator (100–44 BC)"
  },
  {
    "rank": 66,
    "name": "Francisco Pizarro",
    "origin": "Spanyol",
    "years": "±1475 – 1541",
    "influence": "Menaklukkan Kerajaan Inca",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Portrait_of_Francisco_Pizarro.jpg/330px-Portrait_of_Francisco_Pizarro.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Francisco_Pizarro",
    "wikiDesc": "Spanish conquistador (1478–1541)"
  },
  {
    "rank": 67,
    "name": "Hernando Cortes",
    "origin": "Spanyol",
    "years": "1485 – 1547",
    "influence": "Menaklukkan Meksiko (Aztec)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Retrato_de_Hern%C3%A1n_Cort%C3%A9s.jpg/330px-Retrato_de_Hern%C3%A1n_Cort%C3%A9s.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Hernán_Cortés",
    "wikiDesc": "Spanish conquistador and explorer (1485–1547)"
  },
  {
    "rank": 68,
    "name": "Ratu Isabella I",
    "origin": "Spanyol (Kastilia)",
    "years": "1451 – 1504",
    "influence": "Penguasa Spanyol; pembiaya Columbus",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/IsabellaofCastile03.jpg/330px-IsabellaofCastile03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Isabella_I_of_Castile",
    "wikiDesc": "Queen of Castile and León from 1474 to 1504"
  },
  {
    "rank": 69,
    "name": "William Sang Penakluk",
    "origin": "Prancis (Normandia)",
    "years": "±1027 – 1087",
    "influence": "Menaklukkan Inggris tahun 1066",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/William_the_Conqueror_%28TFA%29.jpg/330px-William_the_Conqueror_%28TFA%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "William_the_Conqueror",
    "wikiDesc": "King of England from 1066 to 1087"
  },
  {
    "rank": 70,
    "name": "Thomas Jefferson",
    "origin": "Amerika Serikat",
    "years": "1743 – 1826",
    "influence": "Penulis Deklarasi Kemerdekaan; kebebasan beragama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg/330px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Thomas_Jefferson",
    "wikiDesc": "Founding Father, U.S. president from 1801 to 1809"
  },
  {
    "rank": 71,
    "name": "Jean-Jacques Rousseau",
    "origin": "Swiss (Jenewa)",
    "years": "1712 – 1778",
    "influence": "Pemikiran demokrasi; inspirasi Revolusi Prancis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_adjusted.jpg/330px-Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_adjusted.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Jean-Jacques_Rousseau",
    "wikiDesc": "Genevan philosopher, writer, and composer (1712–1778)"
  },
  {
    "rank": 72,
    "name": "Edward Jenner",
    "origin": "Inggris",
    "years": "1749 – 1823",
    "influence": "Vaksinasi cacar",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Edward_Jenner.jpg/330px-Edward_Jenner.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Edward_Jenner",
    "wikiDesc": "English physician (1749–1823)"
  },
  {
    "rank": 73,
    "name": "Wilhelm Conrad Röntgen",
    "origin": "Jerman",
    "years": "1845 – 1923",
    "influence": "Sinar-X",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Wilhelm_Conrad_R%C3%B6ntgen_%281888-1900%29%2C_88374_p.jpg/330px-Wilhelm_Conrad_R%C3%B6ntgen_%281888-1900%29%2C_88374_p.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Wilhelm_Röntgen",
    "wikiDesc": "German physicist (1845–1923)"
  },
  {
    "rank": 74,
    "name": "Johann Sebastian Bach",
    "origin": "Jerman",
    "years": "1685 – 1750",
    "influence": "Puncak musik barok; memadukan gaya Eropa",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Johann_Sebastian_Bach.jpg/330px-Johann_Sebastian_Bach.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Johann_Sebastian_Bach",
    "wikiDesc": "German composer (1685–1750)"
  },
  {
    "rank": 76,
    "name": "Enrico Fermi",
    "origin": "Italia",
    "years": "1901 – 1954",
    "influence": "Reaktor atom pertama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Enrico_Fermi_1943-49.jpg/330px-Enrico_Fermi_1943-49.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Enrico_Fermi",
    "wikiDesc": "Italian-American physicist (1901–1954)"
  },
  {
    "rank": 77,
    "name": "Thomas Malthus",
    "origin": "Inggris",
    "years": "1766 – 1834",
    "influence": "Teori pertumbuhan penduduk",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Thomas_Robert_Malthus_Wellcome_L0069037_-crop.jpg/330px-Thomas_Robert_Malthus_Wellcome_L0069037_-crop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Thomas_Robert_Malthus",
    "wikiDesc": "British political economist (1766–1834)"
  },
  {
    "rank": 78,
    "name": "Francis Bacon",
    "origin": "Inggris",
    "years": "1561 – 1626",
    "influence": "Menganjurkan penyelidikan ilmiah empiris",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Somer_Francis_Bacon.jpg/330px-Somer_Francis_Bacon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Francis_Bacon",
    "wikiDesc": "English philosopher and statesman (1561–1626)"
  },
  {
    "rank": 79,
    "name": "Voltaire",
    "origin": "Prancis",
    "years": "1694 – 1778",
    "influence": "Juru bicara pemikiran bebas liberal",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg/330px-Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Voltaire",
    "wikiDesc": "French writer and philosopher (1694–1778)"
  },
  {
    "rank": 80,
    "name": "John F. Kennedy",
    "origin": "Amerika Serikat",
    "years": "1917 – 1963",
    "influence": "Pencetus Program Apollo ke bulan",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/330px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "John_F._Kennedy",
    "wikiDesc": "President of the United States from 1961 to 1963"
  },
  {
    "rank": 81,
    "name": "Gregory Pincus",
    "origin": "Amerika Serikat",
    "years": "1903 – 1967",
    "influence": "Pil kontrasepsi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/GGP%EF%BC%8C%E4%B8%80%E4%BD%8D%E7%BE%8E%E5%9B%BD%E7%8A%B9%E5%A4%AA%E7%94%B7%E5%AD%90.jpg/330px-GGP%EF%BC%8C%E4%B8%80%E4%BD%8D%E7%BE%8E%E5%9B%BD%E7%8A%B9%E5%A4%AA%E7%94%B7%E5%AD%90.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Gregory_Pincus",
    "wikiDesc": "American biochemist (1903–1967), inventor of the contraceptive pill"
  },
  {
    "rank": 82,
    "name": "Sui Wen Ti",
    "origin": "Cina",
    "years": "541 – 604",
    "influence": "Menyatukan kembali Cina",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Sui_Wendi_Tang.jpg/330px-Sui_Wendi_Tang.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Emperor_Wen_of_Sui",
    "wikiDesc": "Emperor of China from 581 to 604"
  },
  {
    "rank": 84,
    "name": "Vasco da Gama",
    "origin": "Portugal",
    "years": "±1460 – 1524",
    "influence": "Jalur laut Eropa–India lewat Afrika",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Ignoto_portoghese%2C_ritratto_di_un_cavaliere_dell%27ordine_di_cristo%2C_1525-50_ca._02.jpg/330px-Ignoto_portoghese%2C_ritratto_di_un_cavaliere_dell%27ordine_di_cristo%2C_1525-50_ca._02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Vasco_da_Gama",
    "wikiDesc": "Portuguese explorer (c. 1460s – 1524)"
  },
  {
    "rank": 85,
    "name": "Charlemagne",
    "origin": "Frank (Prancis/Jerman)",
    "years": "742 – 814",
    "influence": "Kaisar Eropa Barat abad tengah",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Charlemagne_denier_Mayence_812_814.jpg/330px-Charlemagne_denier_Mayence_812_814.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Charlemagne",
    "wikiDesc": "Carolingian emperor from 800 to 814"
  },
  {
    "rank": 86,
    "name": "Cyrus Yang Agung",
    "origin": "Persia",
    "years": "±590 – 529 SM",
    "influence": "Pendiri Kekaisaran Persia",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Cyrus_II_%28The_Great%29_%28cropped%29.jpg/330px-Cyrus_II_%28The_Great%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Cyrus_the_Great",
    "wikiDesc": "Founder of the Achaemenid Empire"
  },
  {
    "rank": 87,
    "name": "Leonhard Euler",
    "origin": "Swiss",
    "years": "1707 – 1783",
    "influence": "Matematika dan fisika matematis",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Leonhard_Euler_-_Jakob_Emanuel_Handmann_%28Kunstmuseum_Basel%29.jpg/330px-Leonhard_Euler_-_Jakob_Emanuel_Handmann_%28Kunstmuseum_Basel%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Leonhard_Euler",
    "wikiDesc": "Swiss mathematician (1707–1783)"
  },
  {
    "rank": 88,
    "name": "Niccolò Machiavelli",
    "origin": "Italia (Florence)",
    "years": "1469 – 1527",
    "influence": "Teori politik realis (The Prince)",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg/330px-Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Niccolò_Machiavelli",
    "wikiDesc": "Florentine statesman, diplomat, and political theorist (1469–1527)"
  },
  {
    "rank": 90,
    "name": "Menes",
    "origin": "Mesir",
    "years": "±3100 SM",
    "influence": "Penyatu Mesir; pendiri dinasti pertama",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Narmer_palette_%28obverse%29_%28cropped%29.jpg/330px-Narmer_palette_%28obverse%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Narmer",
    "wikiDesc": "Ancient Egyptian pharaoh of the Early Dynastic Period"
  },
  {
    "rank": 91,
    "name": "Peter Yang Agung",
    "origin": "Rusia",
    "years": "1672 – 1725",
    "influence": "Memodernkan dan membaratkan Rusia",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Inconnu_d%27apr%C3%A8s_J.-M._Nattier%2C_Portrait_de_Pierre_Ier_%28mus%C3%A9e_de_l%E2%80%99Ermitage%29.jpg/330px-Inconnu_d%27apr%C3%A8s_J.-M._Nattier%2C_Portrait_de_Pierre_Ier_%28mus%C3%A9e_de_l%E2%80%99Ermitage%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Peter_the_Great",
    "wikiDesc": "Tsar of Russia from 1682 to 1725"
  },
  {
    "rank": 93,
    "name": "John Dalton",
    "origin": "Inggris",
    "years": "1766 – 1844",
    "influence": "Teori atom modern",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/John_Dalton_by_Thomas_Phillips%2C_1835.jpg/330px-John_Dalton_by_Thomas_Phillips%2C_1835.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "John_Dalton",
    "wikiDesc": "British chemist and physicist (1766–1844)"
  },
  {
    "rank": 94,
    "name": "Homer",
    "origin": "Yunani",
    "years": "±abad ke-8 SM",
    "influence": "Iliad dan Odyssey; dasar sastra Barat",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg/330px-Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Homer",
    "wikiDesc": "Ancient Greek poet"
  },
  {
    "rank": 95,
    "name": "Ratu Elizabeth I",
    "origin": "Inggris",
    "years": "1533 – 1603",
    "influence": "Zaman keemasan Inggris; kekuatan laut",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Darnley_stage_3.jpg/330px-Darnley_stage_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Elizabeth_I",
    "wikiDesc": "Queen of England and Ireland from 1558 to 1603"
  },
  {
    "rank": 96,
    "name": "Justinian I",
    "origin": "Romawi Timur (Balkan)",
    "years": "483 – 565",
    "influence": "Kodifikasi hukum Romawi",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Mosaic_of_Justinianus_I_-_Basilica_San_Vitale_%28Ravenna%29.jpg/330px-Mosaic_of_Justinianus_I_-_Basilica_San_Vitale_%28Ravenna%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Justinian_I",
    "wikiDesc": "Roman emperor from 527 to 565"
  },
  {
    "rank": 97,
    "name": "Johannes Kepler",
    "origin": "Jerman",
    "years": "1571 – 1630",
    "influence": "Hukum gerak planet",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/JKepler.jpg/330px-JKepler.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Johannes_Kepler",
    "wikiDesc": "German astronomer and mathematician (1571–1630)"
  },
  {
    "rank": 98,
    "name": "Pablo Picasso",
    "origin": "Spanyol",
    "years": "1881 – 1973",
    "influence": "Kubisme; seni modern",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/330px-Pablo_picasso_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Pablo_Picasso",
    "wikiDesc": "Spanish painter and sculptor (1881–1973)"
  },
  {
    "rank": 100,
    "name": "Niels Bohr",
    "origin": "Denmark",
    "years": "1885 – 1962",
    "influence": "Model atom dan fisika kuantum",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Niels_Bohr.jpg/330px-Niels_Bohr.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiTitle": "Niels_Bohr",
    "wikiDesc": "Danish physicist (1885–1962)"
  }
];

export function getEraCategory(yearsStr: string): EraCategory {
  if (!yearsStr) return 'Abad 1900+';
  const upper = yearsStr.toUpperCase();

  if (upper.includes('SM')) {
    return 'Sebelum Masehi';
  }

  const numbers = yearsStr.match(/\d+/g);
  if (!numbers || numbers.length === 0) {
    return 'Abad 1-1500';
  }

  const startYear = parseInt(numbers[0], 10);
  if (startYear <= 1500) {
    return 'Abad 1-1500';
  } else if (startYear <= 1900) {
    return 'Abad 1501-1900';
  } else {
    return 'Abad 1900+';
  }
}

export function extractCleanOrigin(originStr: string): string {
  if (!originStr) return 'Lainnya';
  const clean = originStr.split('(')[0].split(',')[0].trim();
  return clean || originStr;
}

export function getAllOrigins(): string[] {
  const originSet = new Set<string>();
  TOKOH_DATA.forEach((tokoh) => {
    originSet.add(extractCleanOrigin(tokoh.origin));
  });
  return Array.from(originSet).sort((a, b) => a.localeCompare('id'));
}
