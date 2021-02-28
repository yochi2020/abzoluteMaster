import React, { useState, useEffect } from 'react';
import Navbar from '../../component/admin/Navbar'
import Sidebar from '../../component/admin/Sidebar'
import Footer from '../../component/admin/Footer'
import { firestore } from '../../firebase/config'
import Form from './Leavetype/Form';
import Leavetype from './Leavetype/Leavetype'
import Checkadmin from './Checkadmin';
const Admin = () => {
  const [data, setData] = useState(""); //Dat aedit
  const [di, setDi] = useState("") //Data Id
  const ref = firestore.collection("type_leave");
  const [dataleave, setDataleave] = useState([]);   //แสดงประเภทการลา
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot => {
      let tempDataArray = [];
      snapshot.forEach(data => {
        tempDataArray = [
          ...tempDataArray,
          {
            id: data.id,
            type_leave_name: data.data().type_leave_name
          }
        ]
      })
      setDataleave(tempDataArray)
      setLoading(false)
    }));
    return () => {
      unsubscribe()
    }
  },[ref])
  const addHandle = (obj) => {
    let tempData = {
      type_leave_name: obj
    }
    ref.add(tempData).then(() => {
      console.log("add success");
    }).catch(err => { console.log(err) })
  }

  const deleteHandle = (id) => {
    console.log("saf")
    ref
      .doc(id)
      .delete()
      .then(() => {
        alert("ลบข้อมูลเรียบร้อย");
      }).catch(err => {
        alert("ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่", err)
      })
  }

  const changeHandle = (id, type_leave_name) => {
    setData(type_leave_name)
    setDi(id)
  }
  const submitHandle = () => {
    const obj = {
      type_leave_name: data
    }
    ref.doc(di)
      .set(obj)
      .then(() => {
        console.log("edit success")
      }).catch(err => { console.log(err) })
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
              <div className="col-sm-6">
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}

          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12" style={{height:'670px'}}>
                <div className="card" >
                  <div className="card-header ">
                    <div className="d-flex justify-content-between" >
                      <h3 className="m-0 text-dark">ประเภทการลา</h3>
                      <Form addData={addHandle} />
                    </div>
                  </div>
                  <div className="card-body" >
                    <table className="table table-hover" >
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">ชื่อประเภท</th>
                          <th scope="col">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        loading ? (
                          <tr>
                              <td></td>
                              <td><div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                              </div></td>
                            </tr>
                        ) : null
                      }
                        {
                          dataleave.map((item, index) => (
                           
                              <Leavetype data={item} key={index} delete={() => deleteHandle(item.id)} change={(id, obj) => changeHandle(id, obj)} />
                           
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
      <div className="modal fade " id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={data} onChange={(e) => { setData(e.target.value) }} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { submitHandle() }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;