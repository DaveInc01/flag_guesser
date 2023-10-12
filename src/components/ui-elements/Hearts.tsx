import {range} from 'lodash'
import '../../style/Hearts.css'

export const Hearts = ({maxCount, count}:{maxCount:number, count: number}) =>
{
    return (
        <div className='heart-content'>
            {range(maxCount).map((v, i) => <img key={i} src={"/assets/images/icons/".concat(i < count ? 'heart.png' : 'heart-lose.png')} />)}
        </div>
    )
}
