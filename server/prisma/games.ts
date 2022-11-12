import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const countries = {
  // group A
  Qatar: 'QA',
  Ecuador: 'EC',
  Senegal: 'SE',
  Netherlands: 'NE',
  // group B
  England: 'GB-ENG',
  Iran: 'IR',
  USA: 'US',
  Wales: 'GB-WLS',
  // group C
  Argentina: 'AR',
  SaudiArabia: 'SA',
  Mexico: 'MX',
  Poland: 'PL',
  // group D
  France: 'FR',
  Australia: 'AU',
  Denmark: 'DK',
  Tunisia: 'TN',
  // group E
  Spain: 'ES',
  CostaRica: 'CR',
  Germany: 'DE',
  Japan: 'JP',
  // group F
  Belgium: 'BE',
  Canada: 'CA',
  Morocco: 'MA',
  Croatia: 'HR',
  // group G
  Brazil: 'BR',
  Serbia: 'RS',
  Switzerland: 'CH',
  Cameroon: 'CM',
  // group H
  Portugal: 'PT',
  Ghana: 'GH',
  Uruguay: 'UY',
  KoreaRepublic: 'KR',
};

const allCupGames = [
  {
    firstTeamCountryCode: countries.Qatar,
    secondTeamCountryCode: countries.Ecuador,
    date: new Date('2022-11-20 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.England,
    secondTeamCountryCode: countries.Iran,
    date: new Date('2022-11-21 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Senegal,
    secondTeamCountryCode: countries.Netherlands,
    date: new Date('2022-11-21 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.USA,
    secondTeamCountryCode: countries.Wales,
    date: new Date('2022-11-21 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Argentina,
    secondTeamCountryCode: countries.SaudiArabia,
    date: new Date('2022-11-22 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Denmark,
    secondTeamCountryCode: countries.Tunisia,
    date: new Date('2022-11-22 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Mexico,
    secondTeamCountryCode: countries.Poland,
    date: new Date('2022-11-22 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.France,
    secondTeamCountryCode: countries.Australia,
    date: new Date('2022-11-22 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Morocco,
    secondTeamCountryCode: countries.Croatia,
    date: new Date('2022-11-23 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Germany,
    secondTeamCountryCode: countries.Japan,
    date: new Date('2022-11-23 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Spain,
    secondTeamCountryCode: countries.CostaRica,
    date: new Date('2022-11-23 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Belgium,
    secondTeamCountryCode: countries.Canada,
    date: new Date('2022-11-23 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Switzerland,
    secondTeamCountryCode: countries.Cameroon,
    date: new Date('2022-11-24 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Uruguay,
    secondTeamCountryCode: countries.KoreaRepublic,
    date: new Date('2022-11-24 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Portugal,
    secondTeamCountryCode: countries.Ghana,
    date: new Date('2022-11-24 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Brazil,
    secondTeamCountryCode: countries.Serbia,
    date: new Date('2022-11-24 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Wales,
    secondTeamCountryCode: countries.Iran,
    date: new Date('2022-11-25 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Qatar,
    secondTeamCountryCode: countries.Senegal,
    date: new Date('2022-11-25 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Netherlands,
    secondTeamCountryCode: countries.Ecuador,
    date: new Date('2022-11-25 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.England,
    secondTeamCountryCode: countries.USA,
    date: new Date('2022-11-25 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Tunisia,
    secondTeamCountryCode: countries.Australia,
    date: new Date('2022-11-26 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Poland,
    secondTeamCountryCode: countries.SaudiArabia,
    date: new Date('2022-11-26 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.France,
    secondTeamCountryCode: countries.Denmark,
    date: new Date('2022-11-26 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Argentina,
    secondTeamCountryCode: countries.Mexico,
    date: new Date('2022-11-26 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Japan,
    secondTeamCountryCode: countries.CostaRica,
    date: new Date('2022-11-27 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Belgium,
    secondTeamCountryCode: countries.Morocco,
    date: new Date('2022-11-27 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Croatia,
    secondTeamCountryCode: countries.Canada,
    date: new Date('2022-11-27 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Spain,
    secondTeamCountryCode: countries.Germany,
    date: new Date('2022-11-27 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Cameroon,
    secondTeamCountryCode: countries.Serbia,
    date: new Date('2022-11-28 07:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.KoreaRepublic,
    secondTeamCountryCode: countries.Ghana,
    date: new Date('2022-11-28 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Brazil,
    secondTeamCountryCode: countries.Switzerland,
    date: new Date('2022-11-28 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Portugal,
    secondTeamCountryCode: countries.Uruguay,
    date: new Date('2022-11-28 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Ecuador,
    secondTeamCountryCode: countries.Senegal,
    date: new Date('2022-11-29 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Netherlands,
    secondTeamCountryCode: countries.Qatar,
    date: new Date('2022-11-29 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Iran,
    secondTeamCountryCode: countries.USA,
    date: new Date('2022-11-29 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Wales,
    secondTeamCountryCode: countries.England,
    date: new Date('2022-11-29 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Tunisia,
    secondTeamCountryCode: countries.France,
    date: new Date('2022-11-30 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Australia,
    secondTeamCountryCode: countries.Denmark,
    date: new Date('2022-11-30 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Poland,
    secondTeamCountryCode: countries.Argentina,
    date: new Date('2022-11-30 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.SaudiArabia,
    secondTeamCountryCode: countries.Mexico,
    date: new Date('2022-11-30 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Croatia,
    secondTeamCountryCode: countries.Belgium,
    date: new Date('2022-12-01 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Canada,
    secondTeamCountryCode: countries.Morocco,
    date: new Date('2022-12-01 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Japan,
    secondTeamCountryCode: countries.Spain,
    date: new Date('2022-12-01 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.CostaRica,
    secondTeamCountryCode: countries.Germany,
    date: new Date('2022-12-01 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.KoreaRepublic,
    secondTeamCountryCode: countries.Portugal,
    date: new Date('2022-12-02 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Ghana,
    secondTeamCountryCode: countries.Uruguay,
    date: new Date('2022-12-02 12:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Serbia,
    secondTeamCountryCode: countries.Switzerland,
    date: new Date('2022-12-02 16:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Cameroon,
    secondTeamCountryCode: countries.Brazil,
    date: new Date('2022-12-02 16:00').toISOString(),
  },
];

const someCupGames = [
  {
    firstTeamCountryCode: countries.Qatar,
    secondTeamCountryCode: countries.Ecuador,
    date: new Date('2022-11-20 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.England,
    secondTeamCountryCode: countries.Iran,
    date: new Date('2022-11-21 10:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.Senegal,
    secondTeamCountryCode: countries.Netherlands,
    date: new Date('2022-11-21 13:00').toISOString(),
  },
  {
    firstTeamCountryCode: countries.USA,
    secondTeamCountryCode: countries.Wales,
    date: new Date('2022-11-21 16:00').toISOString(),
  },
];

async function main() {
  for (let index in someCupGames) {
    await prisma.game.create({
      data: someCupGames[index]
    });
  }
}

main();
