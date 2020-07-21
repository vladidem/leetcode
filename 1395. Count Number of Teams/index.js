require('../helpers/defineArrayFlat')();
require('../helpers/defineArrayLast')();

Array.prototype.isEqual = function (other) {
  if (this === other) return true;
  if (this == null || other == null) return false;
  if (this.length !== other.length) return false;

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== other[i]) {
      return false;
    }
  }

  return true;
};

const subArrays = (array, size = 1) => {
  const arrayChunks = [];
  for (let i = 0; i <= array.length - size; i++) {
    const arrayChunk = array.slice(i, i + size);
    arrayChunks.push(arrayChunk);
  }
  return arrayChunks;
};

class Soldier {
  constructor(index, rating) {
    this.index = index;
    this.rating = rating;
  }
}

class TeamProducer {
  constructor(teamRules, teamSize = 3) {
    this.teamRules = teamRules;
    this.teamSize = teamSize;
  }

  produce(soldiers) {
    this.soldiers = soldiers;
    this.fillAdjacency();
    let teams = this.createTeams();

    teams = teams
      .filter((team) => team.length >= this.teamSize)
      .map((team) => subArrays(team, this.teamSize))
      .flat(1);

    teams = teams.filter((team, index) => {
      const otherIndex = teams.findIndex((other) => team.isEqual(other));

      return index === otherIndex;
    });

    return teams;
  }

  fillAdjacency() {
    this.adjacency = new Map();

    for (const soldier of this.soldiers) {
      const adjacent = [];
      for (const other of this.soldiers) {
        if (this.passesRules(soldier, other)) {
          adjacent.push(other);
        }
      }
      this.adjacency.set(soldier, adjacent);
    }
  }

  passesRules(soldier, other) {
    if (soldier === other) {
      return false;
    }
    for (const rule of this.teamRules) {
      if (!rule(soldier, other)) {
        return false;
      }
    }
    return true;
  }

  createTeams() {
    const usedSoldiers = new Set();
    let teams = [];
    let fullTeams = [];

    for (const teamStarter of this.soldiers) {
      if (usedSoldiers.has(teamStarter)) {
        continue;
      }
      teams = [[teamStarter]];

      while (teams.length > 0) {
        teams = teams
          .map((team) => {
            const lastSoldier = team.last();
            const nextSoldiers = this.adjacency.get(lastSoldier) || [];

            const nextTeams =
              nextSoldiers.map((nextSoldier) => [...team, nextSoldier]) || [];
            nextSoldiers.forEach((soldier) => usedSoldiers.add(soldier));

            if (nextTeams.length === 0) {
              fullTeams.push(team);
            }

            return nextTeams;
          })
          .flat(1);
      }
    }
    return fullTeams;
  }
}

/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  const ascendingProducer = new TeamProducer([
    (s1, s2) => s1.index < s2.index,
    (s1, s2) => s1.rating < s2.rating,
  ]);
  const descendingProducer = new TeamProducer([
    (s1, s2) => s1.index < s2.index,
    (s1, s2) => s1.rating > s2.rating,
  ]);
  const soldiers = rating.map((r, index) => new Soldier(index, r));
  const teams = [
    ...ascendingProducer.produce(soldiers),
    ...descendingProducer.produce(soldiers),
  ];

  return teams.length;
};

module.exports = { numTeams, subArrays };
