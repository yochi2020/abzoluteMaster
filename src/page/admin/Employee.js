import React, { useEffect, useState } from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/admin/Sidebar';
import Checkadmin from './Checkadmin';
import Form from './Employee/Form';
import Userlist from './Employee/Employee'
import { firestore } from '../../firebase/config'
import axios from 'axios'
function Employee() {
  const ref = firestore.collection("user");
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(snapshot => {
      let tempDataArray = [];
      snapshot.forEach(doc => {
        tempDataArray = [
          ...tempDataArray,
          {
            email: doc.data().email,
            fname: doc.data().fname,
            lname: doc.data().lname,
            name: doc.data().name,
            phone: doc.data().phone,
            uid: doc.id,
            user_group: doc.data().user_group
          }
        ];
      })
      setUser(()=>tempDataArray)
      setLoading(false)
    })
    return () => {
    };
  });


  const deleteHandle = (uid) => {
    let obj={
      uid
    }
    axios.post("http://localhost:4000/deleteuser",obj)
  }


  const test = ()=>{

  }
  return (
    <div>
      <Checkadmin />
      <Navbar />
      <Sidebar />
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 text-dark" onClick={()=>console.log(user)}>พนักงาน</h3>
                      <Form />
                    </div>
                  </div>
                  <div className="card-body table-responsive ">
                    <table className="table table-hover ">
                      <thead className="thead-dark ">
                        <tr>
                          <th scope="col">ชื่อพนักงาน</th>
                          <th scope="col">ชื่อเล่น</th>
                          <th scope="col">ข้อมูลส่วนตัว</th>
                          <th scope="col">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loading ? (
                            <tr>
                              <td></td>
                              <td></td>
                              <td><div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                              </div></td>
                            </tr>
                          ) : null
                        }
                        {
                          user.map((item, index) => (
                            <Userlist key={index} data={item} delete={() => deleteHandle(item.uid)} />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* /.col-md-6 */}
              {/* /.col-md-6 */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
      {/* Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
      {/* /.control-sidebar */}
      <Footer />
    </div>
  );
}

export default Employee;