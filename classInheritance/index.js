class Animal {
  constructor(group, location, aggressive) {
    this.group = group;
    this.location = location;
    this.aggressive = aggressive;
    this.isLandAnimal = true;
    this.canFly = false;
  }
  swim() { action.swim() }
}


class Penguin extends Animal {
  constructor(group, location, aggressive) {
    super(group, location, aggressive);
    this.furLength = 'short';
  }
  diveIntoWater() { action.dive(); }
}

class KomodoDragon extends Animal {
  constructor(group, location, aggressive) {
    super(group, location, aggressive);
    this.venom = 'poisonous';
    this.humansEaten = 0;
  }
  breathFire() { throw new Error('A Komodo Dragon cannot breathe fire...') }
  venomousBite(enemy) { enemy.bite(this.venom) }
  eatHuman() { this.humansEaten += 1; }
}

let Gregg = new Penguin('Mammal', 'Antarctica', false)
console.log(Gregg.isLandAnimal)