import { Provider } from 'react-redux';
import { store } from './redux/store';
import { TablesContainer } from './components/Tables';
import './App.css';

function App() {
  return (
    <Provider store={store}>
        <TablesContainer/>
    </Provider>
  );
}

export default App;
