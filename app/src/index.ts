import { bot, botStart } from './bot/bot';
import { DB } from './db/commands';

const main = async () => {
	try {
		botStart();
		process.once('SIGINT', () => bot.stop('SIGINT'));
		process.once('SIGTERM', () => bot.stop('SIGTERM'));
	} catch (err) {
		console.error(err);
		throw new Error("'Database has not been connected.'");
	}

}

main().catch(err => console.error(err));