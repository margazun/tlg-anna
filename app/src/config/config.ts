import rc from 'rc';
import { ConfigBotT, ConfigDbT, ConfigT, ConfigTlgT, InitialConfigDbT, InitialConfigT, InitialConfigTlgT } from "../types/config.type";

function getConfig(name:string): ConfigT {
  const initialConfig = rc(name);
  if (!initialConfig) {
    throw new Error(`Config by name ${name} not found.`);
  }
  
  let config: {bot?: ConfigBotT, db?: ConfigDbT, tlg?: ConfigTlgT} = {}
  try {
    if ('bot' in initialConfig) {
      config.bot = <ConfigBotT>initialConfig.bot;
    }
    if ('db' in initialConfig) {
      config.db = parseConfigDb(initialConfig.db);
    }
    if ('tlg' in initialConfig) {
      config.tlg = parseConfigTlg(initialConfig.tlg);
    }
    if(
      config.bot === undefined ||
      config.db === undefined ||
      config.tlg === undefined
    ) {
      throw new Error(`Config by name ${name} is invalid.`);
    }
    return config as ConfigT;
  } catch (err) {
    throw new Error(`Config by name ${name} is invalid.`);
  }
}

function parseConfigDb(dbCongig: InitialConfigDbT): ConfigDbT {
  try {
    const port = Number.parseInt(dbCongig.port);
    let autoReconnect: boolean;
    if (typeof(dbCongig.autoReconnect) === 'boolean') {
      autoReconnect = dbCongig.autoReconnect;
    } else {
      autoReconnect = (dbCongig.autoReconnect.toLocaleLowerCase()) === 'true';
    }
    
    const reconnectInterval = Number(dbCongig.reconnectInterval);
    const reconnectTries = Number(dbCongig.reconnectTries);
    return <ConfigDbT>{
      ...dbCongig,
      port,
      autoReconnect,
      reconnectInterval,
      reconnectTries,
    }
  } catch (err) {
    throw new Error(`DB config port: ${dbCongig.port} is invalid`);
  }
}

function parseConfigTlg(tlgConfig: InitialConfigTlgT): ConfigTlgT {
  try {
    const supervisor = Number.parseInt(tlgConfig.supervisor);
    const user = Number.parseInt(tlgConfig.user);
    if ( isNaN(user) || isNaN(supervisor)) {
      throw new Error(`Supervisor or user Telegram ID is incorrect`);
    }
    return <ConfigTlgT> {
      ...tlgConfig,
      supervisor,
      user
    }
  } catch (err) {
    throw new Error(`Supervisor or user Telegram ID is incorrect`);
  }
}
export const CONFIG = getConfig('env_');