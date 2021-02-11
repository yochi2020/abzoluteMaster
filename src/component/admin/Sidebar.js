import React from 'react';
import {Link,useLocation} from 'react-router-dom'
import {auth} from '../../firebase/config'
const Sidebar = () => {
  const location =useLocation();
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
          <span className="brand-text font-weight-light">Abzolute</span>
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
                    <Link to="/leavelist" className={`nav-link ${location.pathname==='/leavelist'?'active':null}`}>
                    <i className="fas fa-history nav-icon"></i>
                      <p>รายการลา</p>
                    </Link>
                  </li>
              <li className="nav-item has-treeview menu-open">
                <Link to="#" className={`nav-link ${ location.pathname==='/leavetype' || location.pathname==='/employee'?'active':null}`} >
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    ข้อมูลหลัก
                <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/leavetype" className={`nav-link ${location.pathname==='/leavetype'?'active':null}`}>
                    <i className="far fa-circle nav-icon" />
                      <p>ประเภทการลา</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/employee" className={`nav-link ${location.pathname==='/employee'?'active':null}`}>
                    <i className="far fa-circle nav-icon" />
                      <p>พนักงาน</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item has-treeview menu-open">
                <Link to="#" className={`nav-link ${location.pathname==='/summary'?'active':null}`}>
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    รายงาน
                <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/summary" className={`nav-link ${location.pathname==='/summary'?'active':null}`}>
                      <i className="far fa-circle nav-icon" />
                      <p>สรุปการลา</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                    <div  className="nav-link " >
                    <i className="fas fa-sign-out-alt nav-icon"></i>
                      <p style={{cursor:"pointer"}} onClick={()=>{signOutLogin()}}>ออกจากระบบ</p>
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