import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './app.css';
import {App as AntApp} from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // We can't use this until this issue is solved https://github.com/epam/ketcher/issues/3711
  // <React.StrictMode>
  <AntApp style={{minHeight:"100%"}}>
    <App />
  </AntApp>
  // </React.StrictMode>,
)
