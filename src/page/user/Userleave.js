import React, { useEffect, useState } from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/user/Sidebar';
import Checkuser from './Checkuser';
import Form from './Userleave/Form';
import { auth, firestore } from '../../firebase/config'
import UserleavelTable from './Userleave/Userleave'
const Userleave = () => {
  const [dataLeave, setDataLeave] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((firebase) => {
      if (!!firebase) {
        const ref_leave = firestore.collection("leave").where("uid", "==", firebase.uid)
        ref_leave.onSnapshot(doc_leave => {
          let tempDataArray_leave = [];
          doc_leave.forEach(data_leave => {
            tempDataArray_leave = [
              ...tempDataArray_leave,
              {
              leave_date:data_leave.data().leave_date,
              leave_start:data_leave.data().leave_start,
              reson:data_leave.data().reson,
              type_leave_id:data_leave.data().type_leave_id,
              amount:data_leave.data().amount,
              leave_id:data_leave.id,
              uid:data_leave.data().uid
              }
            ]
          })
          setDataLeave(tempDataArray_leave)
          setLoading(false)
        })

      }
      
    })
    return () => {
      unSubscribe()
    }
  })

  return (
    <div>
      <Checkuser />
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
                      <h3 className="m-0 text-dark" onClick={()=>{console.log(dataLeave)}}>รายการลา</h3>
                      <Form />
                    </div>
                  </div>
                  <div className="card-body table-responsive ">

                    <table className="table table-hover ">
                      <thead className="thead-dark ">
                        <tr>
                          <th scope="col">วันที่แจ้ง</th>
                          <th scope="col">วันที่ลา</th>
                          <th scope="col">จำนวนวัน</th>
                          <th scope="col">ประเภทการลา</th>
                          <th scope="col">หมายเหตุ</th>
                          <th scope="col">สถานะ</th>
                          <th scope="col">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                         dataLeave.map((item,index)=>
                            <UserleavelTable data={item} key={index}/>
                         )
                       }
                      </tbody>
                      <tbody>
                      {
                        loading ?(
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                            </div></td>
                            </tr>
                         
                        )
                        : null
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
    </div >
  );
};

export default Userleave;