export type ConfigBotT = {
  token: string,
  name: string,
}

export type InitialConfigDbT = {
  user: string,
  host: string,
  database: string,
  password: string,
  port: string,
  type: string,
  autoReconnect: string,
  reconnectInterval: string,
  reconnectTries: string,
}
export type ConfigDbT = Pick<InitialConfigDbT,
Exclude<keyof InitialConfigDbT, "port" | "autoReconnect" | "reconnectInterval" | "reconnectTries">> & {
  port: number,
  autoReconnect: boolean,
  reconnectInterval: number,
  reconnectTries: number,
};

export type InitialConfigTlgT = {
  supervisor: string,
  user: string,
}
export type ConfigTlgT = Pick<InitialConfigTlgT, Exclude<keyof InitialConfigTlgT, "supervisor" | "user">> & { user: number, supervisor: number };

export type InitialConfigT = {
  bot: ConfigBotT,
  db: InitialConfigDbT,
  tlg: InitialConfigTlgT,
}
export type ConfigT = Pick<InitialConfigT, Exclude<keyof InitialConfigT, "db" | "tlg">> & { db: ConfigDbT, tlg: ConfigTlgT};