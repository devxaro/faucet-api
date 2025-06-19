export enum RequestSecurityType {
  Protected = 'PROTECTED',
  Public = 'PUBLIC'
}

export enum RequestVerbType {
  Get = 'GET',
  Post = 'POST',
  Update = 'UPDATE',
  Delete = 'DELETE'
}

export enum RolesType {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum operatorType {
  like = 'l',
  iLike = 'il',
  equal = 'e',
  notEqual = 'ne',
  greaterThan = 'gt',
  greaterThanOrEqual = 'gte',
  lessThan = 'lt',
  lessThanOrEqual = 'lte'
}

export enum TxStatusType {
  Executed = 'EXECUTED',
  Confirmed = 'CONFIRMED'
}

export enum JobType {
  CleanGamesJob = 'CLEAN_OLD_GAMES_JOB',
  MineBlockJob = 'MINE_BLOCK_JOB'
}
