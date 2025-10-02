import { ISounds } from "@/app/constants/media";

export const playSound = async (path:ISounds, isSoundOn:boolean) => {
    let audio = (new Audio(path))
    if (isSoundOn)
    {
        try {
            await audio.play()
        } catch (err) {
            console.log("Failed to play, error: " + err);
        }
    }
}

export const stopSound = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.currentTime = 0;
};
