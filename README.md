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
   - `script.js`
2. Otvori **index.html** u pretraživaču.
3. U prozorčiću za unos koda napiši željene naredbe i klikni na dugme **"Pokreni kod"**.

---

## ✍️ Dostupne naredbe

- `idiNa(x, y)` – pomera "olovku" na određenu tačku (bez crtanja).  
- `povuciDo(x, y)` – povlači liniju od trenutne pozicije do nove tačke.  
- `postaviBoju(r, g, b)` – postavlja boju olovke (vrednosti od 0 do 255).  
- `postaviDebljinu(s)` – postavlja debljinu linije.  
- `nacrtajPravougaonik(x, y, a, b)` – crta pravougaonik sa centrom u `(x,y)` i stranicama `a` i `b`.  
- `nacrtajKrug(x, y, r)` – crta krug sa centrom u `(x,y)` i poluprečnikom `r`. 
- `nacrtajElipsu(x, y, a, b)` – crta elipsu centriranu u `(x,y)`, koja dodiruje sredine stranica pravougaonika dimenzija `a` i `b`. 

---

## 🖼️ Koordinatni sistem

- Početno poreklo (`0,0`) se nalazi u donjem levom uglu canvas-a.  
- Na dnu i levoj strani se prikazuje **lenjir** (pomoćne linije), sa oznakama na svakih `50` piksela.  
- Koordinatni sistem može da se pomeri tako da poreklo bude negde drugde – to se podešava u početku koda.

---

## 🧒 Primer korišćenja

```javascript
postaviBoju(255, 0, 0);   // crvena boja
postaviDebljinu(3);       // debljina linije
idiNa(50, 50);
povuciDo(200, 50);
nacrtajKrug(150, 150, 40);
nacrtajPravougaonik(100, 100, 60, 40);
nacrtajElipsu(300, 150, 100, 60); // elipsa centrirana u (300,150)
