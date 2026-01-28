export interface Post {
    userId: number;
    id: number;
    title: string;
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
    postCount?: number;
    availability?: WeeklyAvailability;
    location?: string;
}
