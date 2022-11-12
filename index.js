const back = document.getElementById("carousell");
const image = document.getElementsByClassName("galery");
const mapa = document.getElementById("map");
const ft = document.getElementById("ft");
const desc = document.getElementById("terms");
const res = document.getElementById("leftTab");

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

let i = 1,
  j = 1;
let slide = setInterval(() => {
  back.src = `${i}.jpg`;
  i += 5;
  if (i > 17) i = 1;
}, 3000);

function galery() {
  mapa.style = "display: none";
  ft.style = "display: none";
  image[0].style = "display: block";
  image[0].src = "2.jpg";
  desc.style = "display: none";
  res.style = "display: none";
}
function home() {
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
}
function termsDisplay() {
  desc.style = "display: block";
  desc.innerHTML = terms;
  image[0].style = "display:none";
  mapa.style = "display: none";
  ft.style = "display: none";
  res.style = "display: none";
}
function reserve() {
  res.style = "display: block";
  image[0].style = "display:none";
  mapa.style = "display: none";
  ft.style = "display: none";
}
function ch() {
  j += 1;
  if (j > 17) j = 1;
  image[0].src = `${j}.jpg`;
}
