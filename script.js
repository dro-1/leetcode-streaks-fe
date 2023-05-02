const members = {
  AJaguar: "+2348143261562",
  Enutrof: "+2348180454128",
  LitmusZhang: "+2349021876874",
  OnyenweakuChibueze: "+2348029472061",
  curiousPaul: "+2348058740670",
  dro: "+2347056041426",
  ibukun: "+2348092816159",
  MacChristo: "+2348161178104",
  UkemeEdet: "+2349162330659",
  Boss2021: "+2348154180579",
  kayode01: "+2348074533474",
  codesInML: "+2349028849304",
  bestBoonTech: "+2348035272328",
};
const names = Object.keys(members);

const getWeekNo = (date) => {
  let year = new Date(date.getFullYear(), 0, 1);
  let days = Math.ceil((date - year) / (24 * 60 * 60 * 1000));
  let weekNo = Math.ceil(days / 7);
  return weekNo;
};

let seed = getWeekNo(new Date());

const getRandom = () => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const getPairs = () => {
  const takenSet = new Set();

  let max = names.length - 1;
  let totalPairs = Math.floor(max / 2);
  const pairs = [];

  while (pairs.length < totalPairs) {
    let count = 2;
    let pair = [];
    while (count) {
      let random;
      do {
        random = Math.floor(getRandom() * max);
      } while (takenSet.has(random));

      takenSet.add(random);
      pair.push(random);
      count--;
    }

    pairs.push(pair);
  }
  return pairs;
};

const getWALink = (number) => `https://wa.me/${number}`;

const getLinksList = (pairs) => {
  let linksList = [];

  for (let [idx1, idx2] of pairs) {
    let [person1Name, person1Number] = [names[idx1], members[names[idx1]]];
    let [person2Name, person2Number] = [names[idx2], members[names[idx2]]];

    const link1 = document.createElement("a");
    link1.innerHTML = person1Name;
    link1.href = getWALink(person1Number);

    const link2 = document.createElement("a");
    link2.innerHTML = person2Name;
    link2.href = getWALink(person2Number);

    const listItem = document.createElement("li");
    listItem.appendChild(link1);
    listItem.innerHTML += " - ";
    listItem.appendChild(link2);
    linksList.push(listItem);
  }

  return linksList;
};

const pairs = getPairs();
console.log(pairs);

const linksList = getLinksList(pairs);
console.log(linksList);

let listContainer = document.querySelector(".links");

for (let link of linksList) {
  listContainer.appendChild(link);
}
