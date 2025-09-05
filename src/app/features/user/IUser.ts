import { ICountry } from "@/app/constants/countries"
import { IntRange } from "@/app/utils"

export type IUsers = IUser[]
type AvatarT =  IUser["userItems"]["avatarIds"][number]
export interface IUser {
    email: string,
    username: string,
    countryCode: string,
    displayedAvatar: AvatarT,
    inGame: {
        question: ICountry["name"],
        answer: ICountry["name"],
        allAnswers: Map<ICountry["name"], ICountry["name"]>,
        isLose: Boolean
    },
    userItems: {
        coins: number,
        maxScore: number,
        avatarIds:string[],
        energy: IntRange<0, 11>,
    },
    settings: {
        sounds: boolean
    }
}