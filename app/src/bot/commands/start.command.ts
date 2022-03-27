import { Context } from 'telegraf';


export async function start(ctx:Context) {
	let message: string = `Привет${ctx.message?.from.first_name ? ', ' + ctx.message.from.first_name : '!'}`;
	message += `\nТеперь вы сможете получать отчеты.`;
	message += `\nФормат ввода команды\n/report <b>2022-03-14</b>`;
	return ctx.replyWithHTML(message);
}

