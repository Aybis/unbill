import { Switch } from 'react-router-dom';
import NotFound from './components/pages/404';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Piutang from './components/pages/Piutang';
import Unbill from './components/pages/Unbill';
import Authenticated from './middleware/Authenticated';
import Gate from './middleware/Gate';

export default function App() {
  return (
    <Switch>
      <Gate exact path="/login" component={Login}></Gate>
      <Authenticated exact path="/" component={Home}></Authenticated>
      <Authenticated
        exact
        path="/list-unbill"
        component={Unbill}></Authenticated>
      <Authenticated
        exact
        path="/list-piutang"
        component={Piutang}></Authenticated>

      <Gate exact path="/*" component={NotFound}></Gate>
    </Switch>
  );
}
