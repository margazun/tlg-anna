import { formatDate, getNextDay, getPrevtDay } from '../../helpers';
import { LessonDayResultI, LessonResultI, Payment, PaymentDayResultI, PaymentI, PaymentResultI } from '../../types';
import { sql } from '../sql.db';


export namespace DB {
	export async function selectByDate(date: Date | string) {

		date = new Date(date);
		const nextDay = new Date(date);
		nextDay.setDate(nextDay.getDate() + 1);
		const lessonsResult = await lesson.selectLessons(date, nextDay);
		const paymentResult = await payment.selectPayments(date, nextDay);
		return {
			date,
			lessons: { ...lessonsResult },
			payments: { ...paymentResult },
		}
	}

	export namespace payment {
		export async function yesterday(): Promise<PaymentDayResultI> {
			return selectByDate((new Date()));
		}
		export async function today(): Promise<PaymentDayResultI> {
			return selectByDate(getNextDay(new Date()));
		}
		export async function selectByDate(date:Date | string): Promise<PaymentDayResultI> {
			date = new Date(date);
			const sqlString = `SELECT * FROM public.payments
				WHERE transaction_created_at > '${formatDate(date)}' and
				transaction_created_at < '${formatDate(getNextDay(date))}'`;
				const result = await sql<Payment>(sqlString);
				let totalAmount: number = 0;
				result.map(element => {
					totalAmount += (element.is_gift === 'false' ? 1 : -1) * Number.parseFloat(element.amount);
				})
			return {
				date,
				totalAmount,
				averageAmount: totalAmount === 0 || result.length === 0 ? 0 : totalAmount/result.length,
				totalPayments: result.length
			}
		}
		export async function selectPayments(start: Date, end: Date): Promise<PaymentResultI> {
			const sqlString = `SELECT amount, is_gift
				FROM public.payments
				WHERE transaction_created_at > '${formatDate(start)}' and
				transaction_created_at < '${formatDate(end)}'`;
			const result = await sql<PaymentI>(sqlString);
			let totalAmount: number = 0;
			result.map(element => {
				totalAmount += (element.is_gift === 'false' ? 1 : -1) * Number.parseFloat(element.amount);
			});
			return {
				totalAmount,
				averageAmount: totalAmount === 0 || result.length === 0 ? 0 : totalAmount/result.length,
				totalPayments: result.length
			}
		}
	}

	export namespace lesson {
		export async function selectLessons(start: Date, end: Date): Promise<LessonResultI> {
			const sqlString: string = `SELECT public.events_dict._name, public.events_dict._description, public.events.happened_at
				FROM public.events
				JOIN public.events_dict
				ON public.events.event_id = public.events_dict.id
				WHERE public.events.happened_at > '${formatDate(start)}'
					and public.events.happened_at < '${formatDate(end)}'
					and (
						_name = 'student_passed_demolesson'
						or _name = 'student_pass_introlesson_succesfully'
					);`
			const result = await sql<any>(sqlString);
			let demoLessons:number = 0;
			let introLessons: number = 0;
			result.map(element => {
				if (element._name === 'student_passed_demolesson') {
					demoLessons++;
				} else {
					introLessons++;
				}
			})

			return {
				introLessons,
				demoLessons
			}
		}
		export async function getTypes(): Promise<any> {
			const sqlString = `SELECT id, _name, _description FROM public.events_dict;`;
			const result = sql<any>(sqlString);
			return result;
		}
		export async function yesterday(): Promise<LessonDayResultI> {
			const date = new Date();
			return {
				...(await selectLessons(getPrevtDay(date), date)),
				date
			}
		}
		export async function selectByDate(date:Date | string): Promise<LessonDayResultI> {
			date = new Date(date);
			return {
				date,
				...(await selectLessons(date, getNextDay(date))),
			}
		}
	}
}
