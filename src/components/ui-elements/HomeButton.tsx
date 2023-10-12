import '../../index.css'

export const HomeButton = (props: {title: string, onClick?: () => void}) => {
    const {title, onClick} = props;
    const styles:React.CSSProperties = {
        width: '300px',
        cursor: 'pointer',
        marginTop: '30px',
        userSelect: 'none',
        textAlign: 'center',
        padding: '25px 0px',
        borderRadius: '50px',
        letterSpacing: '1px',
        background: '#f7911e',
        color: 'rgb(255, 255, 250)',
        boxShadow: '1px 5px #85381c',
        fontFamily: 'DelaGothicOne',
    }
    return (<div className="btn-home" onClick={onClick} style={styles}>{title}</div>)
}