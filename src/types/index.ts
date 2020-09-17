export type UserState = "creatingEntry" | "submitted" | "idle", "updatingEntry"

export interface User {
    state: UserState    
}

export interface Entry {
    entry: string
    date: string
    submitted: false
}