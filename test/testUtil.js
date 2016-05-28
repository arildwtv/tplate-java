import fs from 'fs';

export function readFixture(fixtureName) {
  return String(fs.readFileSync(`${__dirname}/fixtures/${fixtureName}.txt`));
}
