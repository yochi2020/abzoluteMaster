import React,{useEffect,useState} from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/user/Sidebar'
import Checkuser from './Checkuser';
import {firestore,auth} from '../../firebase/config'
import   Userhome from './UserHome/Userhome'
const Userleave = () => {
    const [userId,setUserId]=useState([])
    const [appove,setAppove]=useState([])
    const [leave,setLeave]=useState([])
    const refAppove = firestore.collection("appove")
    const refLeave = firestore.collection("leave")
    const refUser = firestore.collection("user")
    const [leaveUser,setleaveUser]=useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{

      //เก็บค่ายูเซอร์
      const authUnsubscibe = auth.onAuthStateChanged((firebaseUser)=>{
        if(!!firebaseUser){
            refUser.doc(firebaseUser.uid).onSnapshot(doc=>{
                setUserId(doc.id)
            })
        }
      })

      //เก็บค่า Appove
      const appovesubscibe = refAppove.onSnapshot(doc=>{
        let tempArrayAppove =[]
        doc.forEach(data=>{
          tempArrayAppove=[
            ...tempArrayAppove,
            {
              appoveId:data.id,
              leaveId:data.data().leave_id,
              hr_appove:data.data().hr_appove,
              hr_remark:data.data().hr_remark,
              leave_appove:data.data().leave_appove,
              leave_remark:data.data().leave_remark,
              status:data.data().status
            }
          ]
        })
        setAppove(tempArrayAppove)
      })

      // เก็บค่า Leave
      const leavesubscibe =refLeave.onSnapshot(doc=>{
        let tempArrayLeave=[]
        doc.forEach(data=>{
          tempArrayLeave=[
            ...tempArrayLeave,
            {
              leaveId:data.id,
              type_leave_id:data.data().type_leave_id,
              uid:data.data().uid,
              amount:data.data().amount,
              leave_date:data.data().leave_date,
              leave_start:data.data().leave_start,
              reson:data.data().reson
            }
          ]
        })
        setLeave(tempArrayLeave)
        setLoading(false)
      })

      // หา Leave ของ user
      const findLeave = leave.filter(data=>(data.uid===userId))
      setleaveUser(findLeave)

    return ()=>{
      
    }
    },[userId])

    // หา  Leave ของยูเซอร์
    const findLeave = leave.filter(data=>(data.uid===userId))
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
                      <h3 className="m-0 text-dark" onClick={()=>{console.log(leaveUser)}} >รายการลาทั้งหมด</h3>
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
                        </tr>
                      </thead>
                      <tbody>
                          {
                            leaveUser.map((data,index)=>{
                              return <Userhome data={data} key={index}/>
                            })
                          }
                      </tbody>
                      <tbody>
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