import React,{useState,useEffect} from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/admin/Sidebar';
import Checkadmin from './Checkadmin';
import Tabeluserleave from  './Summary/Summary'
import { firestore} from '../../firebase/config'
const Summary = () => {
  
  const [leave,setLeave]=useState([])
  const refLeave = firestore.collection("leave")
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    //find all leave
    const leavesubscribe =refLeave.onSnapshot(doc=>{
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
      setLoading(false)
    })
    return ()=>{
      leavesubscribe()
    }
  },[])
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
                      <h3 className="m-0 text-dark" >รายการลาทั้งหมด</h3>
                    </div>
                  </div>
                  <div className="card-body table-responsive ">
                    <table className="table table-hover ">
                      <thead className="thead-dark ">
                        <tr>
                        <th scope="col">ชื่อพนักงาน</th>
                          <th scope="col">วันที่แจ้ง</th>
                          <th scope="col">วันที่ลา</th>
                          <th scope="col">จำนวนวัน</th>
                          <th scope="col">ประเภทการลา</th>
                          <th scope="col">เหตุผลที่ลา</th>
                          <th scope="col">สถานะ</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            leave.map((data,index)=>{
                              return <Tabeluserleave data={data} key={index}/>
                            })
                          }
                      </tbody>
                      {
                        loading ?(
                          <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td><div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem"}} role="status">
                            </div></td>
                            </tr>
                            </tbody>
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
    </div >
  );
};

export default Summary;