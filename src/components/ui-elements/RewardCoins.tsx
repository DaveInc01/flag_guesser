import '../../style/RewardCoins.css'

export const RewardCoins = ({coins}:{coins: number})=>
(
        <div className="reward-coins">
            <span>Reward: {coins}</span>
            <img src="/assets/images/home/coin.png" alt="" />
        </div>
)
