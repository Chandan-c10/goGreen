import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// 🔧 SET YOUR RANGE HERE
const START_DATE = "01/01/2024"; // dd/mm/yyyy
const END_DATE = "20/12/2024";   // dd/mm/yyyy

const start = moment(START_DATE, "DD/MM/YYYY");
const end = moment(END_DATE, "DD/MM/YYYY");

// Generate random date between range
const getRandomDate = () => {
  const diff = end.diff(start, "days");
  const randomDays = random.int(0, diff);

  return start
    .clone()
    .add(randomDays, "days")
    .add(random.int(0, 23), "hours")
    .add(random.int(0, 59), "minutes")
    .format();
};

// Recursive commit function (your style kept)
const makeCommits = (n) => {
  if (n === 0) return git.push();

  const date = getRandomDate();

  const data = {
    date: date,
  };

  console.log(date);

  jsonfile.writeFile(path, data, () => {
    git
      .add([path])
      .commit(`commit ${n}`, { "--date": date }, makeCommits.bind(this, --n));
  });
};

// 🔥 CHANGE NUMBER OF COMMITS HERE
makeCommits(100);
