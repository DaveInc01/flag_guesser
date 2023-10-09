import  { ICountry, Countries } from "../../constants/countries";
import { Container } from "../layouts/Container";
import { PlayContent } from "../layouts/PlayContent";
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";
import { ButtonIcon } from "../ui-elements/button-icon";
import { PlayTimer } from "../ui-elements/timer/PlayTimer";
const playHeaderStyle: React.CSSProperties = {}
export const PlayPage = () => (
    <div>
        <Container>
        <header style={{display:'flex', justifyContent: 'space-between'}}>
            <ButtonIcon icon="/assets/images/icons/forward-left.svg" clickCallback={() => {}}/>
            <PlayTimer startTime={10} onFinish={() => {console.log("ON TIME FINISH")}}/>
            <InfoDeskButton 
                text="3" 
                icon="/assets/images/icons/heart.png"/>
        </header>
            < PlayContent score={0} countries={Countries.slice(Countries.length - 4, Countries.length)}/>
        </Container>
    </div>
)