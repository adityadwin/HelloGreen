import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const markCommit = (year, x, y, count) => {
  const date = moment()
    .year(year)
    .startOf("year")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  jsonfile.writeFile(path, data, () => {
    git
      .add([path])
      .commit(`${date} - Commit ${count}`, { "--date": date })
      .push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return git.push();

  const year = random.boolean() ? 2023 : 2024; // Memastikan hanya 2023 atau 2024
  const x = random.int(0, 52); // 52 minggu dalam setahun
  const y = random.int(0, 6); // 0-6 hari dalam seminggu

  const date = moment()
    .year(year)
    .startOf("year")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log(`Commit ${n}: ${date}`);
  jsonfile.writeFile(path, data, () => {
    git
      .add([path])
      .commit(
        `${date} - Commit ${n}`,
        { "--date": date },
        makeCommits.bind(this, --n)
      );
  });
};

makeCommits(1000); // Meningkatkan jumlah commit untuk lebih banyak warna hijau
