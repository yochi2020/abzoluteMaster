import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './page/Login'
import Leavelist from './page/admin/Leavelist'
import Leavetype from './page/admin/Leavetype'
import Employee from './page/admin/Employee';
import Summary from './page/admin/Summary';
import Userhome from './page/user/Userhome';
import Userleave from './page/user/Userleave';
import Pagenotfound from './component/Page-not-found';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login}/> 
        <Route path="/login" component={Login}/>
        <Route path="/leavelist" component={Leavelist} />
        <Route path="/leavetype" component={Leavetype} />
        <Route path="/employee" component={Employee}/>
        <Route path="/summary" component={Summary}/>
        <Route path="/user" component={Userhome}/>
        <Route path ="/userleave" component={Userleave}/>
        <Route component={Pagenotfound} />
      </Switch>
    </div>
  );
}

export default App;
