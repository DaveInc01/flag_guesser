import { ISounds } from "../constants/media";

export const playSound = async (path:ISounds, isSoundOn:boolean) => {
    var audio = (new Audio(path))
    if (isSoundOn)
    {
        try {
            await audio.play()
        } catch (err) {
            console.log("Failed to play, error: " + err);
        }
    }
}