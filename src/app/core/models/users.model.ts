export interface Post {
    userId: number;
    id: number;
    title: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface WeeklyAvailability {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    company?: Company;
    postCount?: number;
    availability?: WeeklyAvailability;
    location?: string;
}
