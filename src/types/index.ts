import { OutputFileEntry } from "@uploadcare/react-uploader"

export interface UserLogIn {
    email: string,
    password: string
}

export interface UserSignIn {
    email: string,
    password: string,
    confirmPassword: string
}

export interface FileEntry {
    files: OutputFileEntry[]
}

export interface PhotoMeta {
    cdnUrl: string,
    uuid: string
}

export interface Post {
    captions: string,
    photo: PhotoMeta[],
    likes: number,
    userLikes: [],
    userId: string | null,
    date: Date
}