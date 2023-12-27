export interface IContactForm{
    id?: number,
    name: string,
    email: string,
    phone: string,
    message: string,
    answer: string,
    created_at?: string,
    status: "Open" | "Close",
    user_id: number | null,
}