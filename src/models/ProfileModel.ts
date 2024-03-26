export interface ProfileModel {
    bio: string
    createdAt: string
    email: string
    familyName: string
    following: string[]
    givenName: string
    name: string
    photoUrl: string
    uid: string
    updatedAt: string
    interests?: string[];
    type?: "Organizer" | "Personal" | undefined
}