
const containerStyle:React.CSSProperties = {
    marginLeft: '20%',
    marginRight: '20%',
    backgroundColor: '#1e384a',
    height: '100vh'
}
export const Container = ({children}: any) => (<main style={containerStyle}>{children}</main>)