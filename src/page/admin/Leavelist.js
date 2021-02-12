import React, { useState, useEffect } from 'react';
import Navbar from '../../component/admin/Navbar'
import Sidebar from '../../component/admin/Sidebar'
import Footer from '../../component/admin/Footer'
import Checkadmin from './Checkadmin';
import { firestore } from '../../firebase/config'
import Leavelist from './Leavelist/Leavelist';
const Admin = () => {
  const [appove, setAppove] = useState([])
  const refAppove = firestore.collection("appove")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    refAppove.onSnapshot(data => {
      let tempArray = []
      data.forEach(data => {
        tempArray = [
          ...tempArray,
          {
            hr_appove: data.data().hr_appove,
            hr_remark: data.data().hr_remark,
            leave_appove: data.data().leave_appove,
            leave_remark: data.data().leave_remark,
            leave_id: data.data().leave_id,
            status: data.data().status,
            id_appove: data.id
          }
        ]
      })
      setAppove(tempArray)
      setLoading(false)
    })
  }, [])
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
                      <h3 className="m-0 text-dark">รายการลา</h3>
                    </div>
                  </div>
                  <div className="card-body table-responsive ">

                    <table className="table table-hover ">
                      <thead className="thead-dark ">
                        <tr>
                          <th scope="col">ชื่อพนักงาน</th>
                          <th scope="col">ข้อมูลส่วนตัว</th>
                          <th scope="col">วันที่แจ้ง</th>
                          <th scope="col">วันที่ลา</th>
                          <th scope="col">จำนวนวัน</th>
                          <th scope="col">ประเภทการลา</th>
                          <th scope="col">เหตุผล</th>
                          <th scope="col">สถานะ</th>
                          <th scope="col">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          appove.map((data, index) => (
                            <Leavelist key={index} data={data}  />
                          ))
                        }
                      </tbody>
                      {
                        loading ?(
                            <tr>
                              <td></td>
                              <td></td>
                              <td><div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                            </div></td>
                            </tr>
                        )
                        : null
                      }
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
};

export default Admin;