import { Context, session, Telegraf } from 'telegraf';
import { CONFIG } from '../config';
import { report } from './commands/report.command';
import { start } from './commands/start.command';


export const bot = new Telegraf<Context>(CONFIG.bot.token);
bot.use(session());

bot.command('/start', start);
bot.command('/report', report);

bot.telegram.deleteWebhook();

export const botStart = () => {
	bot.launch()
		.then(() => console.log('Bot has been started...'))
		.catch((err) => {
			console.log('Bot did not start.');
			console.error(`Error: ${err.message}`);
			bot.stop('SIGTERM');
		});
}