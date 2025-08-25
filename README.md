# Coding Canvas za decu 🎨💻

Ova aplikacija omogućava deci da uče programiranje kroz crtanje pomoću koda.  
Umesto da koriste miš, deca pišu jednostavne naredbe na srpskom jeziku (latinica) kako bi crtala oblike na canvas-u.  

---

## 🎯 Cilj aplikacije
- Da dete na zabavan način uči osnovne koncepte programiranja (funkcije, argumenti, redosled izvršavanja).
- Da razume kako koordinatni sistem funkcioniše (x i y ose).
- Da razvija logičko razmišljanje i osećaj za geometriju dok crta.

---

## 🚀 Kako pokrenuti aplikaciju

1. Sačuvaj datoteke:
   - `index.html`
   - `style.css`
   - `app.js`
2. Otvori **index.html** u pretraživaču.
3. U prozorčiću za unos koda napiši željene naredbe i klikni na dugme **"Pokreni kod"**.

---

## ✍️ Dostupne naredbe

- `pomeriNa(x, y)` – pomera "olovku" na određenu tačku (bez crtanja).  
- `linijaDo(x, y)` – povlači liniju od trenutne pozicije do nove tačke.  
- `postaviBojuOlovke(r, g, b)` – postavlja boju olovke (vrednosti od 0 do 255).  
- `postaviDebljinuOlovke(s)` – postavlja debljinu linije.  
- `nacrtajPravougaonik(x, y, a, b)` – crta pravougaonik sa centrom u `(x,y)` i stranicama `a` i `b`.  
- `nacrtajKrug(x, y, r)` – crta krug sa centrom u `(x,y)` i poluprečnikom `r`. 
- `nacrtajElipsu(x, y, a, b)` – crta elipsu centriranu u `(x,y)`, koja dodiruje sredine stranica pravougaonika dimenzija `a` i `b`. 
- `postaviBojuPopune(r, g, b)` – postavlja boju popune za sledeće oblike (pravougaonik, krug, elipsa).
- `bezPopune()` – isključuje popunjavanje oblika (oblici će biti samo iscrtani linijom).
- `resetujPodesavanjaPlatna()` – vraća koordinatni sistem i trenutnu poziciju olovke na početne vrednosti.
- `resetujPodesavanjaAlata()` – vraća boju olovke, debljinu i boju popune na podrazumevane vrednosti.
- `resetujSvaPodesavanja()` – resetuje sva podešavanja platna i alata na podrazumevane vrednosti.
- `zapocniPoligon()` – počinje definisanje novog poligona i briše prethodno postavljena temena.
- `dodajTeme(x, y)` – dodaje teme (x, y) trenutnom poligonu.
- `zavrsiPoligon()` – iscrtava poligon sa zadatim temenima (mora biti bar 3 temena). Nakon crtanja temena se brišu.

---

## 🖼️ Koordinatni sistem

- Početno poreklo (`0,0`) se nalazi u donjem levom uglu canvas-a.  
- Na dnu i levoj strani se prikazuje **lenjir** (pomoćne linije), sa oznakama na svakih `50` piksela.  
- Koordinatni sistem može da se pomeri tako da poreklo bude negde drugde – to se podešava u početku koda.

---

## 🧒 Primer korišćenja

```javascript
postaviBoju(0, 0, 0);
postaviBojuPopune(255, 220, 40);
nacrtajKrug(300, 200, 120);

postaviBojuPopune(255, 255, 255);
nacrtajKrug(255, 240, 20);
nacrtajKrug(345, 240, 20);

postaviBojuPopune(0, 0, 0);
nacrtajKrug(260, 245, 7);
nacrtajKrug(350, 245, 7);

bezPopune();
postaviBoju(180, 80, 0);
postaviDebljinu(6);
pomeriNa(250, 160);
linijaDo(270, 145);
linijaDo(300, 140);
linijaDo(330, 145);
linijaDo(350, 160);
```
