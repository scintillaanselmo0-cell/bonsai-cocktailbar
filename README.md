# Bonsai Cocktail Bar — sito

Sito statico (HTML + CSS + vanilla JS). Nessun backend, nessun build.

## Modificare i contenuti
Apri **`js/data.js`**. Lì trovi TUTTO: nome, indirizzo, telefono, WhatsApp,
orari, drink signature e ogni lista del menu. Cambia solo i valori.
Per cambiare un prezzo o un orario editi una sola riga — mai l'HTML/CSS.

## Pubblicare su GitHub Pages
```
gh repo create bonsai-cocktailbar --public --source=. --remote=origin --push
```
Poi Settings → Pages → Deploy from branch → `main` / root. Il file `.nojekyll`
è già presente. Dominio: impostare `bonsaicocktailbar.it` in Pages → Custom domain.

## Struttura
- `index.html` — pagina unica con sezioni ancorate
- `css/style.css` — stile
- `js/data.js` — UNICA fonte di verità (dati)
- `js/app.js` — logica (menu, stato aperto/chiuso, prenotazione WhatsApp)
- `assets/` — immagini webp
