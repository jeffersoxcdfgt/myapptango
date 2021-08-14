export interface DateCustom {
    page: number;
    per_page: number;
    total:number;
    total_pages: number;
    data: [
        {
            date: string;
            open: number;
            high: number;
            low: number;
            close: number;
        }
    ]
}