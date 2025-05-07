import { RouterComponent } from './components/Router'
import './index.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";

function App(){
  return (
    <div className="app">
      <div className='screen-background'></div>
      <div className='screen-filter'></div>
      <RouterComponent />
    </div>
  )
}

export default App;
