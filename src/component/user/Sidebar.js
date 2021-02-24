import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { auth} from '../../firebase/config'
const Sidebar = () => {
  const location = useLocation();
  const signOutLogin=()=>{
    auth.signOut()
    .then(()=>{
        console.log("logout success")
    }).catch((err)=>{
        console.log(err)
    })
  }
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/admin" className="brand-link">
          <img src={"dist/img/AdminLTELogo.png"} alt="#" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">LeaveManage</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link to="/user" className={`nav-link ${location.pathname === '/user' ? 'active' : null}`}>
                  <i className="fas fa-history nav-icon"></i>
                  <p>สรุปข้อมูลการลา</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/userleave" className={`nav-link ${location.pathname === '/userleave' ? 'active' : null}`}>
                  <i className="fas fa-history nav-icon"></i>
                  <p>รายการขอลา</p>
                </Link>
              </li>


              <li className="nav-item">
                <div className="nav-link " >
                  <i className="fas fa-sign-out-alt nav-icon"></i>
                  <p style={{cursor:"pointer"}} onClick={() => { signOutLogin() }} >ออกจากระบบ</p>
                </div>
              </li>

            </ul>

          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Sidebar;