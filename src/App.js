import { Switch } from 'react-router-dom';
import NotFound from './components/pages/404';
import Home from './components/pages/Home';
import Invoice from './components/pages/Invoice';
import Login from './components/pages/Login';
import Lop from './components/pages/Lop';
import Piutang from './components/pages/Piutang';
import PreviewFile from './components/pages/PreviewFile';
import PreviewInvoice from './components/pages/PreviewInvoice';
import PreviewPiutang from './components/pages/PreviewPiutang';
import Unbill from './components/pages/Unbill';
import Authenticated from './middleware/Authenticated';
import Gate from './middleware/Gate';

export default function App() {
  return (
    <Switch>
      <Gate exact path="/login" component={Login}></Gate>
      <Authenticated exact path="/" component={Home}></Authenticated>
      <Authenticated exact path="/unbill" component={Unbill}></Authenticated>
      <Authenticated exact path="/piutang" component={Piutang}></Authenticated>
      <Authenticated exact path="/lop" component={Lop}></Authenticated>
      <Authenticated
        exact
        path="/invoice/:io"
        component={Invoice}></Authenticated>
      <Authenticated
        exact
        path="/piutang/:id"
        component={Piutang}></Authenticated>
      <Authenticated
        exact
        path="/preview-piutang/:id"
        component={PreviewPiutang}></Authenticated>
      <Authenticated
        exact
        path="/preview-invoice/:id"
        component={PreviewInvoice}></Authenticated>
      <Authenticated
        exact
        path="/file/:id"
        component={PreviewFile}></Authenticated>

      <Gate exact path="/*" component={NotFound}></Gate>
    </Switch>
  );
}
