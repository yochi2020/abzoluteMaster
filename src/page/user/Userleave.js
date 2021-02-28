import React, { useEffect, useState, useRef } from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/user/Sidebar';
import Checkuser from './Checkuser';
import Form from './Userleave/Form';
import { auth, firestore } from '../../firebase/config'
import { MDBDataTableV5 } from 'mdbreact'
const Userleave = () => {
  const [userEdit, setUserEdit] = useState({
  })
  const [leaveOfUser, setleaveOfUser] = useState([])
  const [appove, setAppove] = useState([])
  const [typeLeave, setTypeLeave] = useState([])
  const [loading, setLoading] = useState(true)
  const refAppove = useRef(firestore.collection("appove")).current
  const refLeave = firestore.collection("leave")
  const refTypeLeave = firestore.collection("type_leave")
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'วันที่แจ้ง',
        field: 'leave_date',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'วันที่ลา',
        field: 'leave_start',
        width: 270,
      },
      {
        label: 'จำนวนวัน',
        field: 'amount',
        width: 200,
      },
      {
        label: 'ประเภทการลา',
        field: 'type_leave_name',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'หมายเหตุ',
        field: 'reson',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'สถานะ',
        field: 'status',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'จัดการ',
        field: 'config',
        sort: 'disabled',
        width: 100,
      }
    ]
  },)
  useEffect(() => {
    const unSubscribeLeaveOfUser = auth.onAuthStateChanged((firebase) => {
      if (!!firebase) {
        const ref_leave = firestore.collection("leave").where("uid", "==", firebase.uid)
        ref_leave.onSnapshot(doc_leave => {
          let tempDataArray_leave = [];
          doc_leave.forEach(data_leave => {
            tempDataArray_leave = [
              ...tempDataArray_leave,
              {
                leave_date: data_leave.data().leave_date,
                leave_start: data_leave.data().leave_start,
                reson: data_leave.data().reson,
                type_leave_id: data_leave.data().type_leave_id,
                amount: data_leave.data().amount,
                leave_id: data_leave.id,
                uid: data_leave.data().uid
              }
            ]
          })
          setleaveOfUser(() => tempDataArray_leave)
          setLoading(false)

        })
      }
    })

    const unSubscribeAppove = refAppove.onSnapshot(doc => {
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
      setAppove(() => tempArrayAppove)
    })
    const unSubscribeTypeLeave = refTypeLeave.onSnapshot(doc => {
      let tempArrayTypeLeave = []
      doc.forEach(data => {
        tempArrayTypeLeave = [
          ...tempArrayTypeLeave,
          {
            type_leave_id: data.id,
            type_leave_name: data.data().type_leave_name
          }
        ]
      })
      setTypeLeave(() => tempArrayTypeLeave)
    })
    reload()
    return () => {
      unSubscribeLeaveOfUser()
      unSubscribeAppove()
      unSubscribeTypeLeave()
    }
  }, [loading])
  const reload = () => {
    let tempArrayFindData = leaveOfUser
    tempArrayFindData.forEach((data, i) => {
      //find typeLeave
      typeLeave.forEach(dataTypeLeave => {
        if (dataTypeLeave.type_leave_id === data.type_leave_id) {
          tempArrayFindData[i] = {
            ...tempArrayFindData[i],
            type_leave_name: dataTypeLeave.type_leave_name,
          }
        }
      })
      //findAppove
      appove.forEach(dataAppove => {
        if (dataAppove.leave_id === data.leave_id) {
          let buttotDelete = <div><button onClick={(e) => { deleteHandle(e) }} className="btn btn-sm btn-outline-danger" id={dataAppove.appoveId} name={data.leave_id}>Delete</button></div>
          let status = ''
          switch (dataAppove.status) {
            case 'y': status = 'อนุมัติ'
              break;
            case 'no': status = 'ไม่อนุมัติ'
              break;
            case '': status = 'รออนุมัติ'
          }
          if (dataAppove.status != '') {
            tempArrayFindData[i] = ''
          } else {
            tempArrayFindData[i] = {
              ...tempArrayFindData[i],
              status: <span className="badge badge-pill badge-dark">{status}</span>,
              config: buttotDelete
            }
          }
        }
      })
    })
    setDatatable({ ...datatable, rows: tempArrayFindData })
  }
  const deleteHandle = (e) => {
    setLoading(true)
    const leaveId = e.target.name
    const appoveId = e.target.id
    refLeave.doc(leaveId).delete()
    refAppove.doc(appoveId).delete()
  }
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
              <div className="col-lg-12" style={{height:'670px'}}>
                <div className="card">
                  <div className="card-header ">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 text-dark">รายการขอลา</h3>
                      <Form />
                    </div>
                  </div>
                  <div className="card-body table-responsive " >
                    {
                      loading ? (
                        <div className="spinner-border mx-auto" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                      )
                        : <MDBDataTableV5 data={datatable} entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} searchTop searchBottom={false} />
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
    </div >
  );
};
export default Userleave;