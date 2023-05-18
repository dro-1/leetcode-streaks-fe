const members = {
  AJaguar: "+2348143261562",
  Enutrof: "+2348180454128",
  LitmusZhang: "+2349021876874",
  OnyenweakuChibueze: "+2348029472061",
  curiousPaul: "+2348058740670",
  Ibukun: "+2348092816159",
  techWiz: "+2349162330659",
  Abdulrahman: "+2348154180579",
  smiley: "+447307722292",
  MakeThingsHappen: "+2348162831365",
};
const names = Object.keys(members);

function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function () {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
};
RNG.prototype.nextFloat = function () {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
};
RNG.prototype.nextRange = function (start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
};
RNG.prototype.choice = function (array) {
  return array[this.nextRange(0, array.length)];
};

const getWeekNo = (date) => {
  console.log(date);
  let year = new Date(date.getFullYear(), 0, 1);
  let days = Math.ceil((date - year) / (24 * 60 * 60 * 1000));
  let weekNo = Math.ceil(days / 7);
  return weekNo;
};

let seed = getWeekNo(new Date(2023, 4, 18));

const getPairs = () => {
  const takenSet = new Set();

  let max = names.length;
  let totalPairs = Math.floor(max / 2);
  const pairs = [];

  while (pairs.length < totalPairs) {
    let count = 2;
    let pair = [];
    rng = new RNG(seed);
    while (count) {
      let random;
      do {
        random = rng.nextRange(0, max);
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

const linksList = getLinksList(pairs);

let listContainer = document.querySelector(".links");

for (let link of linksList) {
  listContainer.appendChild(link);
}
