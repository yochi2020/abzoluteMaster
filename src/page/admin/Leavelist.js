import React, { useState, useEffect } from 'react';
import Navbar from '../../component/admin/Navbar'
import Sidebar from '../../component/admin/Sidebar'
import Footer from '../../component/admin/Footer'
import Checkadmin from './Checkadmin';
import { firestore, auth } from '../../firebase/config'
import { MDBDataTableV5 } from 'mdbreact'
import axios from 'axios'
export default function Leavelist() {
  const [deleteReason, setDeleteReason] = useState("")  //เห็นผลที่ไม่ให้ลา (ใช้คำว่าdeleteแทน)
  const [deleteData,setDeleteData]=useState({})
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [appove, setAppove] = useState([])
  const [leave, setLeave] = useState([])
  const [typeLeave, setTypeLeave] = useState([])
  const [quota, setQuota] = useState([])
  const refUser = firestore.collection('user')
  const refAppove = firestore.collection('appove')
  const refLeave = firestore.collection("leave")
  const refTypeLeave = firestore.collection("type_leave")
  const refQuota = firestore.collection("quota")

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'ชื่อพนักงาน',
        field: 'name',
        width: 200,
      },
      {
        label: 'วันที่แจ้ง',
        field: 'leave_date',
        width: 200,
      },
      {
        label: 'วันที่ลา',
        field: 'leave_start',
        width: 200,
      },
      {
        label: 'จำนวนวัน',
        field: 'amount',
        sort: 'asc',
        width: 2,
      },
      {
        label: 'ประเภทการลา',
        field: 'type_leave_name',
        sort: 'asc',
      },
      {
        label: 'เหตุผลที่ลา',
        field: 'reason',
        sort: 'asc',
      },
      {
        label: 'สถานะ',
        field: 'status2',
        sort: 'disabled',
      },
      {
        label: 'จัดการ',
        field: 'control',
        sort: 'disabled',
      }
    ]
  });
  useEffect(() => {
    const usersubscribe = refUser.onSnapshot(doc => {
      let tempArrayUser = []
      doc.forEach(data => {
        tempArrayUser = [
          ...tempArrayUser,
          {
            uid: data.id,
            fname: data.data().fname,
            lname: data.data().lname,
            name: data.data().name,
            phone: data.data().phone,
            user_group: data.data().user_group
          }
        ]
      })
      setUser(tempArrayUser)
    })

    const appovesubscribe = refAppove.onSnapshot(doc => {
      let tempArrayAppove = []
      doc.forEach(data => {
        tempArrayAppove = [
          ...tempArrayAppove,
          {
            appoveId: data.id,
            hr_appove: data.data().hr_appove,
            hr_remark: data.data().hr_remark,
            leave_appove: data.data().leave_appove,
            leave_remark: data.data().leave_remark,
            leave_id: data.data().leave_id,
            status: data.data().status
          }
        ]
      })
      setAppove(tempArrayAppove)
    })

    const leavesubscribe = refLeave.onSnapshot(doc => {
      let tempArrayLeave = []
      doc.forEach(data => {
        tempArrayLeave = [
          ...tempArrayLeave,
          {
            leaveId: data.id,
            leave_date: data.data().leave_date,
            leave_start: data.data().leave_start,
            reason: data.data().reson,
            type_leave_id: data.data().type_leave_id,
            uid: data.data().uid,
            amount: data.data().amount
          }
        ]
      })
      setLeave(tempArrayLeave)
    })


    const typeleavesubscribe = refTypeLeave.onSnapshot(doc => {
      let tempArrayTypeLeave = []
      doc.forEach(data => {
        tempArrayTypeLeave = [
          ...tempArrayTypeLeave,
          {
            typeLeaveId: data.id,
            type_leave_name: data.data().type_leave_name
          }
        ]
      })
      setTypeLeave(tempArrayTypeLeave)

    })

    const quotasubscribe = refQuota.onSnapshot(doc => {
      let tempArrayQuota = []
      doc.forEach(data => {
        tempArrayQuota = [
          ...tempArrayQuota,
          {
            quotaId: data.id,
            amount: data.data().amount,
            type_leave_id: data.data().type_leave_id,
            uid: data.data().uid
          }
        ]
      })
      setQuota(tempArrayQuota)
      setLoading(false)
    })
    reLoad()
    return (() => {
      appovesubscribe()
      leavesubscribe()
      typeleavesubscribe()
      quotasubscribe()
    })

  }, [loading])


  const reLoad = () => {
    let dataAll = leave

    dataAll.forEach((dataLeave, i) => {
      let deleteName = ''
      let deleteFname = ''
      let deleteLname = ''

      user.forEach(dataUser => {
        if (dataLeave.uid === dataUser.uid) {
          dataAll[i] = {
            ...dataAll[i],
            ...dataUser
          }
          deleteName = dataUser.name
          deleteFname = dataUser.fname
          deleteLname = dataUser.lname
        }
      })
      typeLeave.forEach(dataTypeLeave => {
        if (dataLeave.type_leave_id === dataTypeLeave.typeLeaveId) {
          dataAll[i] = {
            ...dataAll[i],
            type_leave_name: dataTypeLeave.type_leave_name
          }
        }
      })

      appove.forEach(dataAppove => {
        let status = ''
        if (dataLeave.leaveId === dataAppove.leave_id) {
          if (dataAppove.status === "") {
            status = 'รออนุมัติ'
            if (dataAppove.hr_appove != '') {
              status = 'รอหัวหน้าอนุมัติ'
            }
            if (dataAppove.leave_appove != '') {
              status = 'รอhrอนุมัติ'
            }
          } else {
            status = 'success' // อนุมัติหรือไม่อนุมัติแล้ว
          }
          dataAll[i] = {
            ...dataAll[i],
            status: status,
            status2: <span className="badge badge-pill badge-dark">{status}</span>,
            control: <div>
              <button className="btn btn-sm btn-outline-success mr-3" onClick={() => { appoveHandle(dataAppove, dataLeave.reason, deleteFname, deleteLname, deleteName) }}>
                อนุมัติ
              </button>
              <button className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => { clickDeleteHandle(dataAppove,  deleteFname, deleteLname, deleteName) }}>
                ไม่อนุมัติ
              </button>
            </div>
          }




        }
      })
    })

    const filterNotYed = dataAll.filter(data => {
      return data.status != 'success'
    })
    setDatatable({ ...datatable, rows: filterNotYed })
  }



 

  const appoveHandle = (obj, reason, fname, lname, name) => {
    // setLoading(true)
    // let fullName = fname + " " + lname + " " + " (" + name + " )";
    // console.log(fullName)
    // const reson = reason

    // refUser.doc(auth.currentUser.uid).onSnapshot(doc_user => {
    //   if (doc_user.data().user_group === 'hr') {
    //     refAppove.doc(obj.appoveId).set({ ...obj, hr_appove: "อนุมัติ" })
    //     if (obj.leave_appove === 'อนุมัติ') {
    //       refAppove.doc(obj.appoveId).set({ ...obj, status: "y" })
            refLeave.doc(obj.leave_id)
            .onSnapshot(doc=>{
              refQuota.where("type_leave_id","==",doc.data().type_leave_id).where('uid','==',doc.data().uid)
              .get()
              .then(querySnapshot=>{
                querySnapshot.forEach(data=>{
                  console.log(data.data())
                  
                })
              }).catch(err=>console.log(err))
            })
    //       axios.get("http://localhost:4000/allow/allow/" + reson + "/" + fullName)
    //         .then((res) => {
    //           console.log(res)
    //         }).catch(err => console.log(err))
    //     }
    //   } else if (doc_user.data().user_group === 'admin') {
    //     refAppove.doc(obj.appoveId).set({ ...obj, leave_appove: "อนุมัติ" })
    //     if (obj.hr_appove === 'อนุมัติ') {
    //       refAppove.doc(obj.appoveId).set({ ...obj, status: "y" })
    //       axios.get("http://localhost:4000/allow/allow/" + reson + "/" + fullName)
    //         .then((res) => {
    //           console.log(res)
    //         }).catch(err => console.log(err))
    //     }
    //   }
    // })
  }

  const clickDeleteHandle = (dataAppove,deleteFname,deleteLname,deleteName) => {
    setDeleteData({
      dataAppove:dataAppove,
      fname:deleteFname,
      lname:deleteLname,
      name:deleteName
    })
    
  }
  const deleteHandle = (appoveObj) => {
    setLoading(true)
    const fullName = deleteData.fname + " " + deleteData.lname + "(" + deleteData.name + ") "
    console.log(fullName)
    refUser.doc(auth.currentUser.uid).onSnapshot(doc_user => {
      if (doc_user.data().user_group === 'hr') {
        refAppove.doc(appoveObj.dataAppove.appoveId).set({ ...appoveObj.dataAppove, hr_appove: "ไม่อนุมัติ", status: "no", hr_remark: deleteReason })
      } else if (doc_user.data().user_group === 'admin') {
        refAppove.doc(appoveObj.dataAppove.appoveId).set({ ...appoveObj.dataAppove, leave_appove: "ไม่อนุมัติ", status: "no", leave_remark: deleteReason })
      }
      axios.get("http://localhost:4000/allow/notallowed/" + deleteReason + "/" + fullName)
        .then(() => {
        }).catch(err => console.log(err))
    })
    closeHandle()
  }


  const closeHandle =()=>{
    setLoading(true)
    setDeleteReason("")
  }
  return (
    <div>
      <Checkadmin />
      <Navbar />
      <Checkadmin />
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
              <div className="col-lg-12" style={{height:'670px'}}>
                <div className="card" >
                  <div className="card-header ">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 text-dark" >รายการลา</h3>
                    </div>
                  </div>
                  <div className="card-body table-responsive " >
                    {
                      loading ? (
                        <div className="spinner-border mx-auto" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                      )
                        : <MDBDataTableV5 searchBottom={false} hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop ></MDBDataTableV5>
                    }
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

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">เหตุผล</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>closeHandle()}>
                        <span aria-hidden="true" >×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <input type="text"  className="form-control" value={deleteReason}  onChange={(eventt)=>{setDeleteReason(eventt.target.value)}}/>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>closeHandle()}>ยกเลิก</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{deleteHandle(deleteData);}}>ไม่อนุมัติ</button>
                    </div>
                  </div>
                </div>
              </div>

    </div>
  )
}
