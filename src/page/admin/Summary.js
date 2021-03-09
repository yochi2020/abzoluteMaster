import React,{useState,useEffect} from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/admin/Sidebar';
import Checkadmin from './Checkadmin';
import { firestore} from '../../firebase/config'
import {MDBDataTableV5} from 'mdbreact'
const Summary = () => {
  const [user,setUser]=useState([])
  const [appove,setAppove]=useState([])
  const [leave,setLeave]=useState([])
  const [leaveType,setLeaveType]=useState([])
  const refLeave = firestore.collection("leave")
  const refLeaveType= firestore.collection("type_leave")
  const refUser =firestore.collection("user")
  const refAppove =firestore.collection("appove")
  const [loading, setLoading] = useState(true)
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
        width: 5,
      },
      {
        label: 'เหตุผลที่ลา',
        field: 'reason',
        sort: 'asc',
        width: 5,
      },
      {
        label: 'สถานะ',
        field: 'status',
        sort: 'asc',
        width: 5,
      }
    ]
  });
  useEffect(()=>{
    refUser.onSnapshot(doc=>{
      let tempArrayUser=[]
      doc.forEach(data=>{
        tempArrayUser=[
          ...tempArrayUser,
          {
            uid:data.id,
            email:data.data().email,
            fname:data.data().fname,
            lname:data.data().lname,
            name:data.data().name,
            phone:data.data().phone,
            user_group:data.data().user_group,
          }
        ]
      })
      setUser(tempArrayUser)

    })
    refAppove.onSnapshot(doc=>{
      let tempArrayAppove =[]
      doc.forEach(data=>{
        tempArrayAppove=[
          ...tempArrayAppove,
          {
            leave_id:data.data().leave_id,
            status:data.data().status
          }
        ]
      })
      setAppove(tempArrayAppove)
      
    })
    //find all leave
    refLeave.onSnapshot(doc=>{
      let tempArrayLeave=[]
      doc.forEach(data=>{
        tempArrayLeave=[
          ...tempArrayLeave,
          {
            leave_id:data.id,
            type_leave_id:data.data().type_leave_id,
            uid:data.data().uid,
            leave_date:data.data().leave_date,
            leave_start:data.data().leave_start,
            reason:data.data().reson,
            amount:data.data().amount
          }
        ]
      })
      setLeave(tempArrayLeave)
    })
    refLeaveType.onSnapshot(doc=>{
      let tempArrayLeaveType =[]
      doc.forEach( (data)=>{
        tempArrayLeaveType=[
          ...tempArrayLeaveType,
          {
            LeaveTypeId:data.id,
            type_leave_name:data.data().type_leave_name
          }
        ]
      })
       setLeaveType(tempArrayLeaveType)
      setLoading(false)
       
    })
    console.log('useEffect')
    reLoad()

  },[loading])
  


const reLoad = ()=>{
  
  let  tempArrayLeave =leave
  tempArrayLeave.forEach((dataLeave,i)=>{
      leaveType.forEach((dataLeaveType)=>{
        if(dataLeave.type_leave_id===dataLeaveType.LeaveTypeId){
          tempArrayLeave[i]={
            ...tempArrayLeave[i],
            type_leave_name:dataLeaveType.type_leave_name
          }
          
        }
      })
      user.forEach(dataUser=>{
        if(dataLeave.uid===dataUser.uid){
          tempArrayLeave[i]={
            ...tempArrayLeave[i],
            name:dataUser.name
          }
        }
      })
      appove.forEach(dataAppove=>{
        if(dataLeave.leave_id===dataAppove.leave_id){
          let status =''
          switch (dataAppove.status) {
            case 'y':status = 'อนุมัติ'
              break;
              case 'no':status = 'ไม่อนุมัติ'
                break;
                case '':status = 'รออนุมัติ'
              break;
          }
          tempArrayLeave[i]={
            ...tempArrayLeave[i],
            status:<span className="badge badge-pill badge-dark">{status}</span>
          }
        }
      })
    })
    setDatatable({...datatable,rows:tempArrayLeave})
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
              <div className="col-lg-12" style={{height:'670px'}}>
                <div className="card">
                  <div className="card-header ">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 text-dark" onClick={()=>console.log(datatable)} >รายการลาทั้งหมด</h3>
                    </div>
                  </div>
                  <div className="card-body table-responsive " >
                  {
                        loading ?(
                              <div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                              </div>
                        )
                        : <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}  entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false}></MDBDataTableV5>
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

export default Summary;