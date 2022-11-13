const back = document.getElementById("carousell");
const image = document.getElementsByClassName("galery");
const mapa = document.getElementById("map");
const ft = document.getElementById("ft");
const desc = document.getElementById("terms");
const res = document.getElementById("leftTab");
const homeDisplay = document.getElementById("home");
const descDisplay = document.getElementById("descDisplay");
const flag = document.getElementsByClassName("flag");
let lang = "en";
let active = false;
const months = [
  { name: "Januar", noDays: 31, mon: 1 },
  { name: "Februar", noDays: 28, mon: 2 },
  { name: "Mart", noDays: 31, mon: 3 },
  { name: "April", noDays: 30, mon: 4 },
  { name: "Maj", noDays: 31, mon: 5 },
  { name: "Jun", noDays: 30, mon: 6 },
  { name: "Jul", noDays: 31, mon: 7 },
  { name: "Avgust", noDays: 31, mon: 8 },
  { name: "Septembar", noDays: 30, mon: 9 },
  { name: "Oktobar", noDays: 31, mon: 10 },
  { name: "Novembar", noDays: 30, mon: 11 },
  { name: "Decembar", noDays: 31, mon: 12 },
];

let d = new Date();
let startDate = null;
let endDate = null;
let noPerson = 2;
let price = 25;

const now = {
  today: d,
  day: d.getDate(),
  month: d.getMonth(),
  year: d.getFullYear(),
};
document.getElementById("no").addEventListener("change", () => {
  noPerson = parseInt(document.getElementById("no").value);
  if (noPerson === 3) {
    document.getElementById("cena").innerText = "Cena: 30 eur";
    price = 30;
  }
  if (noPerson === 4) {
    document.getElementById("cena").innerText = "Cena: 40 eur";
    price = 40;
  }
  if (noPerson < 3) {
    document.getElementById("cena").innerText = "Cena: 25eur";
    price = 25;
  }
  if (noPerson < 2) {
    document.getElementById("cena").innerText = "Cena: 25 eur";
    noPerson = 2;
    document.getElementById("no").value = 2;
    price = 25;
  }
  if (noPerson > 4) {
    document.getElementById("cena").innerText = "Cena: 40 eur";
    noPerson = 4;
    price = 40;
    document.getElementById("no").value = 4;
  }
});

const populateTable = () => {
  const days = months[d.getMonth()].noDays;
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const startOfWeek = firstDay.getDay();

  document.getElementById("month").innerHTML = months[d.getMonth()].name;

  for (let i = 1; i < startOfWeek; i++) {
    document.getElementById(i).innerText = "";
    document.getElementById(i).style.cursor = "default";
  }
  for (let i = startOfWeek, j = 1; j <= days; i++, j++) {
    document.getElementById(i).innerText = j;
    if (j === now.day && d.getMonth() === now.month) {
      document.getElementById(i).style.fontWeight = "bold";
      document.getElementById(i).style.backgroundColor = "#c2c0c0";
    } else {
      document.getElementById(i).style.fontWeight = "normal";
      document.getElementById(i).style.backgroundColor = "#e6e1db";
    }
  }
  for (let i = startOfWeek + days; i < 43; i++) {
    document.getElementById(i).innerText = "";
    document.getElementById(i).style.cursor = "default";
  }
};

populateTable();

const prevMonth = () => {
  d = new Date(2022, d.getMonth() - 1, now.day);
  populateTable();
};
const nextMonth = () => {
  d = new Date(2022, d.getMonth() + 1, now.day);
  populateTable();
};

const setDate = (e) => {
  if (!startDate && !endDate) {
    startDate = new Date(
      2022,
      d.getMonth(),
      document.getElementById(e).innerText
    );
    console.log(e);
    if (
      startDate > now.today ||
      (startDate.getDate() == now.day && startDate.getMonth() == now.month)
    )
      startDate = startDate;
    else {
      alert("Pogresan datum!");
      startDate = null;
    }
    document.getElementById(
      "startReserve"
    ).innerHTML = `${startDate.getDate()}-${
      months[startDate.getMonth()].mon
    }-2022`;
  } else {
    endDate = new Date(
      2022,
      d.getMonth(),
      document.getElementById(e).innerText
    );
    if (endDate > startDate) {
      document.getElementById("endReserve").innerHTML = `${endDate.getDate()}-${
        months[startDate.getMonth()].mon
      }-2022`;
      document.getElementById("message").innerText = `Rezervisali ste za ${
        endDate.getDate() - startDate.getDate()
      } dana`;
      let len = endDate.getDate() - startDate.getDate();
      for (let i = 0; i < len; i++) {
        document.getElementById(e - len + i).style =
          "background-color: #c3c0bf";
      }
    } else {
      alert("Pogresan datum!");
      endDate = null;
    }
  }
};
const resetReservation = () => {
  startDate = null;
  endDate = null;
  document.getElementById("startReserve").innerHTML = "?";
  document.getElementById("endReserve").innerHTML = "?";
  document.getElementById("message").innerText = "";
  for (let i = 1; i < 43; i++)
    document.getElementById(i).style = "background-color: #e6e6e6";
};
const order = () => {
  if (startDate && endDate) {
    document.getElementById(
      "mail"
    ).href += `Zeleo bih da rezervisem vas apartman na period od ${startDate.getDate()} ${
      months[startDate.getMonth()].name
    } do ${endDate.getDate()} ${
      months[endDate.getMonth()].name
    } za ${noPerson} osoba po ceni od ${price} din/danu.`;
    resetReservation();
    document.getElementById("message").innerText =
      "Zahvaljujemo se na rezervaciji. Ukoliko ste poslali mail, uskoro ce vam se javiti neko iz naseg tima.";
    document.getElementById("mail").click();
  }
};

ft.style = "display: none";
document.getElementById("left").style = "display: none";
document.getElementById("right").style = "display: none";
const terms = `Property description: <br><br>
One bedroom apartment with approx. 50m2 following structure:<br>
- Living toom<br>
- bedroom<br>
- Kitchen<br>
- Bathroom<br>
- Terrace<br>
Max capacity 4 persons (one large double bed and an extendable sofa).<br><br>

Pricing:<br>
- 2 adults = 25eur<br>
- 3 adults = 30eur<br>
- 4 adults = 35eur<br>
<br>
Features:<br>
- Wifi<br>
- Parking place<br>
- Pet friendly<br>
<br><br>
Check-in from 14:00, check-out until 11:00`;
const termsSer = `Opis smestaja: <br><br>
Apartman sa jednom spavacom sobom. 50m2 strukture:<br>
- Dnevna soba<br>
- Spavaca soba<br>
- Kuhinja<br>
- Kupatilo<br>
- Terasa<br>
Maksimalno 4 osoba (francuski lezaj garnitura na izvlacenje).<br><br>

Cene:<br>
- 2 osobe = 25eur<br>
- 3 osobe = 30eur<br>
- 4 osobe = 35eur<br>
<br>
Dostupno:<br>
- Wifi<br>
- Parking<br>
- Dozvoljeni kucni ljubimci<br>
<br><br>
Prijavljivanje od 14:00, odjavljivanje do 11:00`;
const english = descDisplay.innerHTML;
const serbian = `<strong>Opis:</strong><br><br>FINA apartman ima sve karakteristike porodicnog doma
uz punu privatnost gostiju.<br>Nalazi se na spratu porodicne kuce sa posebnim ulazom za goste.
<br>Prostrani apartman ima 50m2, veliku dnevnu sobu, spavacu sobu, potpuno opremljenu kuhinju i 
kupatilo.<br>Najlepsi deo objekta je velika osuncana terasa na istocnoj strani sa pogledom na 
vrt i mirnu ulicu.<br>U neposrednoj blizini se nalaze veliki marketi (IDEA, Zlatan Trag, Aman)
, lokalna pekara, apoteka i zelena pijaca.
<br>Posebno se vodi racuna o potrebama dece. Obezbedjujemo krevetac za malu decu, igracke, 
a u dvoristu postoji poseban deciji kutak sa kucicom na drvetu, toboganom, ljuljaskom i 
drugim decijim mobilijarom koji gosti mogu slobodno koristiti.
<br><br><strong>Okolina:</strong><br><br>Iako je apartman smesten van samog centra grada, 
do centra se stize laganom setnjom od 10 minuta. 
Prednost ove lokacije je sto je objekat izdvojen od gradske guzve a nedaleko je od svih 
sadrzaja. <br>Na 1km od apartmana je brdo Hisar i Park 9 Jugovica, koji pruzaju sve uslove 
rekreacije u prirodi. Na 20-tak km (15min voznje autom) je istorijski lokalitet Caricin Grad. 
Put nastavlja jos 20km do Radan Planine, jedne od netaknutih lepota Juzne Srbije. 
Podno Radan planine je Brestovacko jezero, prelepo mesto za izletnike i pecarose.
<br><br><strong>Domacini:</strong><br><br>Domacini su ozbiljni ljudi koji su stalno prisutni kada 
je potrebna pomoc ili savet, a neprimetni kada je gostima potrebna privatnost. <br>
Trudimo se da izadjemo u susret svim vasim zeljama u sklopu mogucnosti.`;

let i = 1,
  j = 1;
let slide = setInterval(() => {
  back.src = `${i}.jpg`;
  i += 5;
  if (i > 17) i = 1;
}, 3000);

function galery() {
  document.getElementById("left").style = "display: block";
  document.getElementById("right").style = "display: block";
  mapa.style = "display: none";
  ft.style = "display: none";
  image[0].style = "display: block";
  desc.style = "display: none";
  res.style = "display: none";
  homeDisplay.style = "display: none";
}
function home() {
  if (active) {
    homeDisplay.style = "display: none";
    document.getElementById("left").style = "display: none";
    document.getElementById("right").style = "display: none";
    active = false;
  } else {
    homeDisplay.style = "display: block";
    active = true;
  }
  if (lang === "en") descDisplay.innerHTML = english;
  else descDisplay.innerHTML = serbian;
  image[0].style = "display:none";
  mapa.style = "display: none";
  ft.style = "display: none";
  desc.style = "display: none";
  res.style = "display: none";
}
function contact() {
  image[0].style = "display:none";
  mapa.style = "display: block";
  ft.style = "display: flex";
  ft.style = "flex-direction: row";
  desc.style = "display: none";
  res.style = "display: none";
  homeDisplay.style = "display: none";
}
function termsDisplay() {
  desc.style = "display: block";
  if (lang === "en") desc.innerHTML = terms;
  else desc.innerHTML = termsSer;
  image[0].style = "display:none";
  mapa.style = "display: none";
  ft.style = "display: none";
  res.style = "display: none";
  homeDisplay.style = "display: none";
}
function reserve() {
  res.style = "display: block";
  image[0].style = "display:none";
  mapa.style = "display: none";
  ft.style = "display: none";
  homeDisplay.style = "display: none";
}
function serbDesc() {
  lang = "ser";
  desc.innerHTML = termsSer;
  descDisplay.innerHTML = serbian;
  document.getElementById("btnHome").innerText = "Opis";
  document.getElementById("btnReserve").innerText = "Zakupi";
  document.getElementById("btnGalery").innerText = "Slike";
  document.getElementById("btnTerms").innerText = "Uslovi";
  document.getElementById("btnContact").innerText = "Kontakt";
}
function engDesc() {
  lang = "en";
  desc.innerHTML = terms;
  descDisplay.innerHTML = english;
  document.getElementById("btnHome").innerText = "Home";
  document.getElementById("btnReserve").innerText = "Reserve";
  document.getElementById("btnGalery").innerText = "Galery";
  document.getElementById("btnTerms").innerText = "Terms";
  document.getElementById("btnContact").innerText = "Contact";
}

function ch(x) {
  let j = parseInt(image[0].src.substr(-5)) + x;
  if (j === 0) j = 17;
  if (j === 18) j = 1;
  image[0].src = `${j}.jpg`;
}
