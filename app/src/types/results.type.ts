export interface PaymentDayResultI {
	date: Date,
	totalAmount: number,
	averageAmount: number,
	totalPayments: number,
}

export interface PaymentResultI {
	totalAmount: number,
	averageAmount: number,
	totalPayments: number,
}

export interface LessonDayResultI {
	date: Date,
	introLessons: number,
	demoLessons: number,
}

export interface LessonResultI {
	introLessons: number,
	demoLessons: number,
}

export interface ReportDayI {
	date: Date,
	lessons: LessonResultI,
	payments: PaymentResultI,
}