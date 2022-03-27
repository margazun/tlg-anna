export type Payment = {
	pk: string;
	transaction_id: string;
	transaction_created_at: string;
	_user_id: string;
	currency: string;
	amount: string;
	is_gift: string;
}

export interface PaymentI {
	amount: string,
	is_gift: string,
}