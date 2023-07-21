const Site = {
  TEST: 'TEST',
  FASTCAMPUS: 'FASTCAMPUS',
};

export type Site = (typeof Site)[keyof typeof Site];
