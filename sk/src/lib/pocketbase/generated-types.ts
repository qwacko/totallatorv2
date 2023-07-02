/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	AccountSummary = "account_summary",
	Accounts = "accounts",
	Bills = "bills",
	Budgets = "budgets",
	Categories = "categories",
	Tags = "tags",
	Transactions = "transactions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum AccountSummaryAccountTypeOptions {
	"asset" = "asset",
	"liability" = "liability",
	"income" = "income",
	"expense" = "expense",
}
export type AccountSummaryRecord<Tmonth = unknown, Trunning_total = unknown, Tsum_from_transactions = unknown, Tsum_to_transactions = unknown> = {
	account_id?: RecordIdString
	account_title?: string
	account_type: AccountSummaryAccountTypeOptions
	month?: null | Tmonth
	num_from_transactions?: number
	num_to_transactions?: number
	sum_from_transactions?: null | Tsum_from_transactions
	sum_to_transactions?: null | Tsum_to_transactions
	running_total?: null | Trunning_total
}

export enum AccountsTypeOptions {
	"asset" = "asset",
	"liability" = "liability",
	"income" = "income",
	"expense" = "expense",
}
export type AccountsRecord = {
	title?: string
	type: AccountsTypeOptions
	isCash?: boolean
	isNetWorth?: boolean
}

export type BillsRecord = {
	title: string
}

export type BudgetsRecord = {
	title: string
}

export type CategoriesRecord = {
	title?: string
	group?: string
	combinedTitle?: string
}

export type TagsRecord = {
	title: string
	group: string
	combinedTitle?: string
}

export type TransactionsRecord = {
	fromAccount: RecordIdString
	toAccount: RecordIdString
	description?: string
	amount?: number
	tag?: RecordIdString
	bill?: RecordIdString
	budget?: RecordIdString
	category?: RecordIdString
	date: IsoDateString
}

export enum UsersRoleOptions {
	"view" = "view",
	"admin" = "admin",
}
export type UsersRecord = {
	name?: string
	avatar?: string
	role?: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type AccountSummaryResponse<Tmonth = unknown, Trunning_total = unknown, Tsum_from_transactions = unknown, Tsum_to_transactions = unknown, Texpand = unknown> = Required<AccountSummaryRecord<Tmonth, Trunning_total, Tsum_from_transactions, Tsum_to_transactions>> & BaseSystemFields<Texpand>
export type AccountsResponse<Texpand = unknown> = Required<AccountsRecord> & BaseSystemFields<Texpand>
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>
export type BudgetsResponse<Texpand = unknown> = Required<BudgetsRecord> & BaseSystemFields<Texpand>
export type CategoriesResponse<Texpand = unknown> = Required<CategoriesRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	account_summary: AccountSummaryRecord
	accounts: AccountsRecord
	bills: BillsRecord
	budgets: BudgetsRecord
	categories: CategoriesRecord
	tags: TagsRecord
	transactions: TransactionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	account_summary: AccountSummaryResponse
	accounts: AccountsResponse
	bills: BillsResponse
	budgets: BudgetsResponse
	categories: CategoriesResponse
	tags: TagsResponse
	transactions: TransactionsResponse
	users: UsersResponse
}