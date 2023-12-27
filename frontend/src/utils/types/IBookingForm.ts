export interface IBookingForm{
    id?: number,
    name: string;
    email: string;
    phone: string;
    people: number;
    date: string;
    time: string;
    user_id: number | null;
}