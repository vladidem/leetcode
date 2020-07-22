require('../helpers/defineArrayFlat')();

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

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

    return this.createTeams();
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
    let teams = [];
    let fullTeams = [];

    for (const teamStarter of this.soldiers) {
      teams = [[teamStarter]];

      for (let i = 1; i < this.teamSize; i++) {
        teams = teams
          .map((team) => {
            const lastSoldier = team.last();
            const nextSoldiers = this.getAdjacentSoldiers(lastSoldier);

            return nextSoldiers.map((soldier) => [...team, soldier]);
          })
          .flat(1);
      }

      fullTeams.push(...teams);
    }
    return fullTeams;
  }

  setUsed(soldier) {
    return this.usedSoldiers.add(soldier);
  }

  isSoldierUsed(soldier) {
    return this.usedSoldiers.has(soldier);
  }

  getAdjacentSoldiers(soldier) {
    return this.adjacency.get(soldier) || [];
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

module.exports = { numTeams };
