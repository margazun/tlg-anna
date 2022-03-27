import { Context } from 'telegraf';
import { DB } from '../../db/commands';
import { formatDate } from '../../helpers';

export async function report(ctx: Context) {
	if (ctx.message) {
		if ('text' in ctx.message) {
			let { text } = ctx.message;
			let args = text.split(' ');
			if (args.length === 2) {
				try {
					let date = new Date(args[1]);
					const report = await DB.selectByDate(formatDate(date));
					let message = `Отчет о работе отдела продаж\n<code>${formatDate(report.date)}`;
					message += `\nОбщее количество уроков: ${report.lessons.demoLessons + report.lessons.introLessons}`;
					message += `\nиз них ВУ: ${report.lessons.introLessons}, ДУ: ${report.lessons.demoLessons}`;
					message += `\nКоличество продаж за день: ${report.payments.totalPayments}`;
					message += `\nСредний чек за день: ${parseFloat(report.payments.averageAmount.toString()).toFixed(2)}</code>`;
					return ctx.replyWithHTML(message);
				} catch (err) {
					return ctx.replyWithHTML(`Формат ввода команды\n/report <b>2022-03-14</b>`);
				}
			}
		}
	}
}