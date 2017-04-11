import {randomNumber} from './util';

const WEAPONTYPES = {
  isw00 : 'knife',
  isw01 : 'cobalt knife',
  isw02 : 'golden knife',
  isw03 : 'demonic knife',
  isw04 : 'short sword',
  isw05 : 'iron sword',
  isw06 : 'steel sword',
  isw07 : 'empowered blade',
  isw08 : 'royal sword',
  isw09 : 'emerald blade',
  isw10 : 'draconic sword',
  isw11 : 'knights sword',
  isw12 : 'cobalt sword',
  isw13 : 'golden sword',
  isw14 : 'demonic sword',
  isw15 : 'frizuhasa',
  isw16 : 'champions broadsword',
  isw17 : 'heroic broadsword',
  isw18 : 'legendary broadsword',
  isw19 : 'terrakuugi',
  isw20 : 'izakugaken',
  isw21 : 'underworld slayer',
  isw22 : 'ragikagukenmasa'
};

export default class Weapon {
  constructor(num) {
    this.calcWeapon(num);
  }

  calcWeapon(num) {
    const identifier = num % 23;
    const type = identifier > 9 ? `isw${identifier}` : `isw0${identifier}`;
    this.type = type;
    this.name = WEAPONTYPES[this.type];
    this.damage = this.rngDamage(num);
  }

  rngDamage(num) {
    return (num * 9) + randomNumber(0, Math.floor(num * 3 / 2)) + 5;
  }
}
