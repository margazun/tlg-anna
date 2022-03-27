export function getNextDay(date: Date): Date {
	return new Date(date.setDate(date.getDate() + 1));
}
