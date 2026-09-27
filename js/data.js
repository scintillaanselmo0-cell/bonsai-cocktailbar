/* ============================================================================
   BONSAI COCKTAIL BAR — UNICA FONTE DI VERITÀ
   ----------------------------------------------------------------------------
   Per modificare il sito NON toccare mai l'HTML o il CSS.
   Cambia solo i valori qui sotto: un prezzo, un orario, un piatto, un numero.
   Ogni voce di menu vive in una LISTA (menu[]). Ogni lista ha un titolo e
   le sue voci, oppure dei gruppi con sottotitoli.
   ============================================================================ */

window.BONSAI = {

  /* --- ANAGRAFICA --------------------------------------------------------- */
  business: {
    name: "Bonsai Cocktail Bar",
    tagline: "Sorseggia la tranquillità",
    claim: "Nel cuore della città, ma lontano da tutto.",
    kind: "Cocktail bar & caffetteria",
    address: "Via Sandro Botticelli 27",
    city: "Aversa",
    province: "CE",
    zip: "81031",
    country: "IT",
    phone: "+39 350 928 0647",        // usato per "Chiama"
    whatsapp: "393509280647",         // solo cifre, formato internazionale
    email: "bonsai.cocktailbar@gmail.com",
    priceRange: "€€",
    // coordinate Via Sandro Botticelli 27, Aversa (CE)
    geo: { lat: 40.9740, lng: 14.2010 },
    mapEmbed: "https://www.google.com/maps?q=Via+Sandro+Botticelli+27,+81031+Aversa+CE&output=embed",
    mapLink: "https://maps.google.com/?q=Via+Sandro+Botticelli+27,+81031+Aversa+CE",
    socials: {
      instagram: "https://www.instagram.com/bonsai.cocktailbar",
      tiktok: "https://www.tiktok.com/@bonsai.bar",
      facebook: "https://www.facebook.com/bonsaicocktailbaraversa",
      linktree: "https://linktr.ee/BonsaiAversa"
    },
    // mondi collegati citati sui social (mostrati come rimandi, non come sezioni)
    universe: [
      { label: "Bonsai Padel Club", handle: "@bonsai.padelclub", url: "https://www.instagram.com/bonsai.padelclub" },
      { label: "Bonsai Mare", handle: "@bonsai.mare", url: "https://www.instagram.com/bonsai.mare" }
    ],
    // Bonsai Padel Club — contatti dedicati per la prenotazione campo
    padel: {
      phone: "+39 392 523 1859",     // usato per "Chiama" padel
      whatsapp: "393925231859",      // solo cifre — prenotazione campo
      instagram: "https://www.instagram.com/bonsai.padelclub"
    }
  },

  /* --- ORARI -------------------------------------------------------------- */
  /* Chiave = giorno JS: 0 Dom, 1 Lun, 2 Mar, 3 Mer, 4 Gio, 5 Ven, 6 Sab.
     close "02:00" = chiusura alle 2 del giorno dopo (gestita nel codice).
     null = chiuso.                                                           */
  hours: {
    0: { open: "07:00", close: "02:00" }, // Domenica
    1: null,                              // Lunedì — CHIUSO
    2: { open: "07:00", close: "02:00" }, // Martedì
    3: { open: "07:00", close: "02:00" }, // Mercoledì
    4: { open: "07:00", close: "02:00" }, // Giovedì
    5: { open: "07:00", close: "02:00" }, // Venerdì
    6: { open: "07:00", close: "02:00" }  // Sabato
  },
  hoursLabel: "Mar – Dom · 07:00 – 02:00 · Lunedì chiuso",

  /* --- GALLERIA SIGNATURE (scorrimento automatico, solo foto) -------------- */
  /* Solo immagini: nessun nome, nessun prezzo. Per aggiungere/togliere una
     foto, aggiungi o rimuovi una riga qui. L'ordine è quello di scorrimento. */
  gallery: [
    "assets/g-pati.webp",
    "assets/d-terza.webp",
    "assets/g-god-sour.webp",
    "assets/g-aperol-fizz.webp",
    "assets/d-pati.webp",
    "assets/g-tropical-zing.webp",
    "assets/d-god.webp",
    "assets/g-peach-fizz.webp",
    "assets/g-a-alla-terza.webp",
    "assets/g-no-virgin-colada.webp"
  ],

  /* --- MENU: array di LISTE ---------------------------------------------- */
  /* Ogni lista: { id, title, note?, items:[...] }  oppure
                 { id, title, note?, groups:[{ subtitle, items:[...] }] }
     Ogni voce:  { name, desc?, price, tags?:[...] }  (price come stringa)   */
  menu: [

    /* 1 — SIGNATURE ------------------------------------------------------- */
    {
      id: "signature",
      title: "Signature",
      note: "The Bonsai on Classic — il cambiamento è progresso: classici riadattati dalla nostra creatività.",
      items: [
        { name: "«A» alla Terza", desc: "Bourbon whiskey, albicocca, mandorla, limone", price: "12", tags: ["vellutato","signature"] },
        { name: "Aperol Fizz", desc: "Aperol, sciroppo di prosecco, limone, tonica", price: "12", tags: ["inebriante"] },
        { name: "God Sour", desc: "Rum rye, amaretto, limone, cacao", price: "12", tags: ["amaricante","signature"] },
        { name: "Ruota", desc: "Vodka, orange curaçao, pesca, mirtillo, pompelmo rosa", price: "12", tags: ["assuefacente"] },
        { name: "Pati", desc: "Tequila, passion fruit, peperoncino, vaniglia", price: "12", tags: ["afrodisiaco","piccante","signature"] },
        { name: "C.G.E.", desc: "Gin, bitter, aranciata", price: "12", tags: ["nostalgico"] },
        { name: "Orsolita", desc: "Tequila, mezcal, miele, lime", price: "12", tags: ["mielato"] },
        { name: "No Piña Colada", desc: "Gin, ananas, cocco, pompelmo rosa", price: "12", tags: ["esotico"] },
        { name: "Hugojito", desc: "Rum, saint germain, menta, prosecco, lime", price: "12", tags: ["aromatico"] }
      ]
    },

    /* 2 — GRANDI CLASSICI ------------------------------------------------- */
    {
      id: "classici",
      title: "Classici",
      note: "I grandi classici della mixology, serviti con precisione e cura. Ogni sorso, un omaggio all'arte del bere miscelato.",
      items: [
        { name: "Negroni", price: "10" },
        { name: "Long Island", price: "11" },
        { name: "Margarita", price: "11" },
        { name: "Daiquiri", price: "11" },
        { name: "Mojito", price: "12" },
        { name: "Whisky Sour", price: "11" },
        { name: "Paloma", price: "12" },
        { name: "Moscow Mule", price: "11" },
        { name: "Dark and Stormy", price: "11" },
        { name: "Espresso Martini", price: "11" }
      ]
    },

    /* 3 — ALCOL FREE ------------------------------------------------------ */
    {
      id: "analcolici",
      title: "Analcolici",
      note: "Un viaggio di gusto che non ha bisogno di alcol per sorprenderti.",
      items: [
        { name: "Peach Fizz", desc: "Gin 0.0, pesca, limone, soda", price: "8", tags: ["delicato","analcolico"] },
        { name: "Negroni 0.0", desc: "Gin 0.0, vermouth 0.0, bitter 0.0", price: "8", tags: ["introspettivo","analcolico"] },
        { name: "Light Passion", desc: "Passion fruit, lime, soda", price: "8", tags: ["vivace","analcolico"] },
        { name: "Light Mango", desc: "Mango, lime, soda", price: "8", tags: ["evanescente","analcolico"] },
        { name: "Tropical Zing", desc: "Arancia, ananas, pesca, pompelmo rosa", price: "8", tags: ["sferzante","analcolico"] },
        { name: "No Virgin Colada", desc: "Ananas, cocco, Red Bull White", price: "8", tags: ["energetico","analcolico"] }
      ]
    },

    /* 4 — DISTILLATI & BITTERS ------------------------------------------- */
    {
      id: "distillati",
      title: "Distillati",
      note: "Distillery & bitters — la nostra selezione al banco.",
      groups: [
        {
          subtitle: "Vodka & Agave",
          items: [
            { name: "Vodka Tito's", price: "10" },
            { name: "Vodka Grey Goose", price: "12" },
            { name: "Vodka Skyy 90", price: "12" },
            { name: "Tequila Patrón Silver", price: "13" },
            { name: "Tequila Patrón Reposado", price: "14" },
            { name: "Tequila Cincoro Blanco", price: "11" },
            { name: "Tequila Cincoro Reposado", price: "13" },
            { name: "Mezcal Burrito Joven", price: "17" },
            { name: "Mezcal Xaman Espadín", price: "9" },
            { name: "Sotol Señor", price: "9" }
          ]
        },
        {
          subtitle: "Rum & Whiskey",
          items: [
            { name: "Diplomático Blanco", price: "10" },
            { name: "Diplomático Reserva Exclusiva", price: "11" },
            { name: "Santa Teresa 1796", price: "10" },
            { name: "Clairin Communal", price: "11" },
            { name: "Zacapa 23", price: "9" },
            { name: "La Factoría", price: "10" },
            { name: "Maker's Mark", desc: "Kentucky Straight Bourbon", price: "9" },
            { name: "Big Moustache", desc: "American Single Malt", price: "13" },
            { name: "Port Askaig Islay", desc: "Scotch Whisky", price: "14" },
            { name: "Talisker", desc: "Single Malt Scotch", price: "11" },
            { name: "Johnnie Walker Gold Label", desc: "Scotch Whisky", price: "10" },
            { name: "Jameson", desc: "Irish Whiskey", price: "7" },
            { name: "Jameson Black Barrel", desc: "Irish Whiskey", price: "10" },
            { name: "Nikka Coffey", desc: "Japanese Whiskey", price: "15" },
            { name: "Catoctin Creek", desc: "Rye Whiskey", price: "11" }
          ]
        },
        {
          subtitle: "Amari",
          items: [
            { name: "Amaro Bonsai", price: "7", tags: ["signature"] },
            { name: "Amaro del Capo", price: "5" },
            { name: "Jägermeister", price: "5" },
            { name: "Jefferson", price: "6" },
            { name: "Roger", price: "5" },
            { name: "Montenegro", price: "5" },
            { name: "Braulio", price: "5" },
            { name: "Fernet Branca", price: "5" },
            { name: "Brancamenta", price: "5" }
          ]
        }
      ]
    },

    /* 5 — VINI ----------------------------------------------------------- */
    {
      id: "vini",
      title: "Vini",
      note: "Bonsai wine selection — prezzo al calice · alla bottiglia.",
      groups: [
        {
          subtitle: "Bianchi",
          items: [
            { name: "Greco di Tufo", price: "7 · 28" },
            { name: "Fiano di Avellino", price: "7 · 27" },
            { name: "Asprinio d'Aversa", price: "6 · 25" },
            { name: "Falanghina", price: "32" },
            { name: "Gewürztraminer", price: "8 · 35" }
          ]
        },
        {
          subtitle: "Rossi",
          items: [
            { name: "Aglianico", price: "6 · 25" },
            { name: "Primitivo D.O.C.", price: "6 · 28" },
            { name: "Piedirosso", price: "6 · 27" },
            { name: "Taurasi D.O.C.", price: "35" },
            { name: "Syrah", price: "6 · 28" }
          ]
        },
        {
          subtitle: "Rosé",
          items: [
            { name: "Aglianico Rosé", price: "7 · 28" },
            { name: "Nero di Troia Rosé", price: "7 · 28" },
            { name: "Primitivo Rosé", price: "7 · 28" }
          ]
        }
      ]
    },

    /* 6 — BIRRE ---------------------------------------------------------- */
    {
      id: "birre",
      title: "Birre",
      note: "Selezione artigianale: La Chouffe e birrificio Flea.",
      items: [
        { name: "La Chouffe Blonde", desc: "Belgian Strong Golden Ale · 8%", price: "7" },
        { name: "La Chouffe Brune", desc: "Belgian Dark Strong Ale · 8%", price: "7" },
        { name: "Flea Isabella", desc: "Gluten Free · 4,9%", price: "7", tags: ["gluten free"] },
        { name: "Flea Adelaide", desc: "APA · 4,9%", price: "7" },
        { name: "Flea Bianca Lancia", desc: "Blanche · 5,0%", price: "7" },
        { name: "Flea Margherita", desc: "Weiss · 5,2%", price: "7" },
        { name: "Flea Costanza", desc: "Blonde Ale · 5,2%", price: "7" },
        { name: "Flea Federico II", desc: "Golden Ale · 5,9%", price: "7" },
        { name: "Flea Federico II Extra", desc: "IPA · 6,6%", price: "7" },
        { name: "Flea Anaïs", desc: "Smoked · 6,4%", price: "7" },
        { name: "Flea Bastola", desc: "Imperial Red Ale · 6,9%", price: "7" },
        { name: "Flea Violante", desc: "Belgian Strong Ale · 8,0%", price: "7" }
      ]
    },

    /* 7 — SOFT DRINK ----------------------------------------------------- */
    {
      id: "soft",
      title: "Soft Drink",
      items: [
        { name: "Coca Cola Original / Zero", price: "5" },
        { name: "Estathé Limone / Pesca", price: "5" },
        { name: "Fanta", price: "5" },
        { name: "Sprite", price: "5" },
        { name: "Tonica", price: "5" },
        { name: "Tassoni / Tassoni Zero", price: "5" },
        { name: "Crodino XL Biondo", price: "5" },
        { name: "Limonata", price: "5" },
        { name: "Soda Pompelmo Rosa / Ananas", price: "5" },
        { name: "Soda Ciliegia", price: "5" },
        { name: "Red Bull Original / White / Zero", price: "5" },
        { name: "Cocktail S. Pellegrino Bianco / Rosso", price: "5" }
      ]
    },

    /* 8 — CIBO ----------------------------------------------------------- */
    {
      id: "cibo",
      title: "Cibo",
      note: "Share food, taste — da condividere sopra un drink.",
      groups: [
        {
          subtitle: "Pinse",
          items: [
            { name: "Semplice", desc: "Olio, spezie", price: "6" },
            { name: "Leggera", desc: "Crudo, rucola, pomodorini, scaglie di grana", price: "10" },
            { name: "Golosa", desc: "Mortadella, stracciata, granella di pistacchio", price: "12" },
            { name: "Giulietta", desc: "Salsiccia, crema di zucchine, provolone, grana", price: "10" },
            { name: "Spack", desc: "Speck, crema di patate, olive nere", price: "10" }
          ]
        },
        {
          subtitle: "Piccoli sfizi",
          items: [
            { name: "Patate fritte", price: "5" },
            { name: "Patate fritte e salsiccia", price: "7" },
            { name: "Patate fritte e cheddar", price: "6" },
            { name: "Zeppoline alle alghe", price: "4" },
            { name: "Bruschette al pomodoro", desc: "4 pz", price: "4" },
            { name: "Bruschette mix", desc: "4 pz", price: "6" }
          ]
        },
        {
          subtitle: "Taglieri",
          items: [
            { name: "Salumi e formaggi", desc: "Selezione di 4 salumi e 4 formaggi", price: "17", tags: ["da condividere"] },
            { name: "Crudo e grana", price: "12" },
            { name: "Salumi", desc: "Selezione di 4 salumi", price: "14" },
            { name: "Formaggi", desc: "Selezione di 4 formaggi", price: "14" }
          ]
        },
        {
          subtitle: "Burgers",
          items: [
            { name: "Classic", desc: "Hamburger, formaggio, pomodoro, insalata", price: "12" },
            { name: "Esotico", desc: "Hamburger, rucola, provola, speck, salsa al mango", price: "12" },
            { name: "Napoli", desc: "Salsiccia, friarielli", price: "10" },
            { name: "Pork", desc: "Porchetta, provola, patate al forno", price: "12" }
          ]
        },
        {
          subtitle: "Dessert",
          items: [
            { name: "Cuore Caldo", price: "6" },
            { name: "Tiramisù", price: "6" },
            { name: "Cheesecake", desc: "Nutella, fondente, cioccolato bianco, pistacchio", price: "6" },
            { name: "Red Velvet", price: "6" },
            { name: "Delizia al Limone", price: "6" }
          ]
        }
      ]
    },

    /* 9 — CAFFETTERIA ---------------------------------------------------- */
    {
      id: "caffetteria",
      title: "Caffetteria",
      note: "Breakfast & coffee — dalle 07:00, per iniziare la giornata con calma.",
      groups: [
        {
          subtitle: "Caffè",
          items: [
            { name: "Caffè", price: "2,50" },
            { name: "Decaffeinato", price: "2,50" },
            { name: "Ginseng", price: "2,50" },
            { name: "Orzo", price: "3,50" },
            { name: "Cappuccino", price: "3,50" },
            { name: "Caffè nocciola", price: "4,50" },
            { name: "Irish Coffee", price: "6,00" }
          ]
        },
        {
          subtitle: "The & Tisane",
          items: [
            { name: "The nero", price: "5" },
            { name: "Camomilla", price: "5" },
            { name: "The verde e vaniglia", price: "5" },
            { name: "The verde", price: "5" },
            { name: "Tisana ai frutti rossi", price: "5" },
            { name: "The nero e fiori di ciliegio", price: "5" }
          ]
        },
        {
          subtitle: "Cioccolata",
          items: [
            { name: "Classica", price: "5" },
            { name: "Fondente", price: "5" },
            { name: "Bianca", price: "5" }
          ]
        },
        {
          subtitle: "Pasticceria",
          items: [
            { name: "Cornetto vuoto", price: "1,60" },
            { name: "Cornetto vuoto vegano", price: "1,60" },
            { name: "Cornetto cioccolato", price: "1,60" },
            { name: "Cornetto crema", price: "1,60" },
            { name: "Cornetto crema e amarena", price: "1,60" },
            { name: "Cornetto arancia amara", price: "1,60" },
            { name: "Cornetto 5 cereali e frutti di bosco", price: "1,60" },
            { name: "Polacca aversana", price: "1,60" },
            { name: "Treccia noci pecan", price: "1,60" },
            { name: "Pain au chocolat", price: "1,60" }
          ]
        }
      ]
    }

  ]
};
