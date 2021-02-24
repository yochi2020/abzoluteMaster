import React,{useEffect,useState} from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/user/Sidebar'
import Checkuser from './Checkuser';
import {firestore,auth} from '../../firebase/config'
import {MDBDataTableV5} from 'mdbreact'
import $ from 'jquery'
const Userleave = () => {
    const [userId,setUserId]=useState([])
    const [appove,setAppove]=useState([])
    const [leave,setLeave]=useState([])
    const [typeLeave,setTypeLeave]=useState([])
    const refAppove = firestore.collection("appove")
    const refLeave = firestore.collection("leave")
    const refUser = firestore.collection("user")
    const refTypeLeave = firestore.collection("type_leave")
    const [leaveUser,setleaveUser]=useState([])
    const [loading, setLoading] = useState(true)




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
          label: 'เหตุผล',
          field: 'reson',
          sort: 'disabled',
          width: 150,
        },
        {
          label: 'สถานะ',
          field: 'status',
          sort: 'disabled',
          width: 100,
        }
      ],})



     const [testt,setTestt]=useState(0)
     setTimeout(()=>{
   
       if(testt>=1){
   
       }else{
   
        setTestt(testt+1)
       }
       $(".click").click()
     },1500)
    useEffect(()=>{

      //เก็บค่ายูเซอร์
      const authUnsubscibe = auth.onAuthStateChanged((firebaseUser)=>{
        if(!!firebaseUser){
          refUser.doc(firebaseUser.uid).onSnapshot(doc=>{
            setUserId(doc.id)
          })
        }
      })

      // เก็บค่า type_leave
      const typeleavesubscibe =refTypeLeave.onSnapshot(doc=>{
        let tempArrayTypeLeave = []
        doc.forEach(data=>{
          tempArrayTypeLeave=[
            ...tempArrayTypeLeave,
            {
              type_leave_id:data.id,
              type_leave_name:data.data().type_leave_name
            }
          ]
        })
        setTypeLeave(tempArrayTypeLeave)
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
      refLeave.onSnapshot(doc=>{
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
      })
      setLoading(false)
      setleaveUser(findLeave)   
      setDatatable({...datatable,rows:leaveUser})
     
   
   
    },[testt])
    const [test,setTest]=useState([])
     // หา Leave ของ user
     const findLeave = leave.filter(data=>(data.uid===userId))
     const temparrayfindleave = findLeave



     findLeave.forEach((dataLeave,i)=>{
      appove.forEach(dataAppove=>{
        if(dataLeave.leaveId===dataAppove.leaveId){
          temparrayfindleave[i]={
            ...temparrayfindleave[i],
            ...dataAppove
          }
        }

      })
    })


    findLeave.forEach((dataLeave,i)=>{
      typeLeave.forEach(dataTypeLeave=>{
        if(dataLeave.type_leave_id===dataTypeLeave.type_leave_id){
          temparrayfindleave[i]={
            ...temparrayfindleave[i],
            type_leave_name:dataTypeLeave.type_leave_name
          }
        }
      })


      findLeave.forEach((dataLeave,i)=>{
        if(dataLeave.status==="y"){
          temparrayfindleave[i]={
            ...temparrayfindleave[i],
            status:<span className="badge badge-pill badge-dark">อนุมัติ</span>
          }
        }  
        if(dataLeave.status===""){
          temparrayfindleave[i]={
            ...temparrayfindleave[i],
            status:<span className="badge badge-pill badge-dark">รออนุมัติ</span>
          }
        }  
        if(dataLeave.status==="no"){
          temparrayfindleave[i]={
            ...temparrayfindleave[i],
            status:<span className="badge badge-pill badge-dark">ไม่อนุมัติ</span>
          }
        }  
      })



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
                      <h3 className="m-0 text-dark click" onClick={()=>{setTestt("9")}} >สรุปรายการลาทั้งหมด</h3>
                    </div>
                  </div>
                  <div className="card-body table-responsive ">
                    <MDBDataTableV5 data={datatable} entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}/>

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

// import React, { useEffect, useState } from 'react';
// import Footer from '../../component/admin/Footer';
// import Navbar from '../../component/admin/Navbar';
// import Sidebar from '../../component/user/Sidebar'
// import Checkuser from './Checkuser';
// import { firestore, auth } from '../../firebase/config'
// import { MDBDataTableV5 } from 'mdbreact'
// import $ from 'jquery'

// export default function Userhome() {
//   const [load, setLoad] = useState(true)
//   const [userId, setUserId] = useState([]) // id this user
//   const [typeLeave, setTypeLeave] = useState([])//type_leave all
//   const [leave, setLeave] = useState([]) //leave all
//   const [appove, setAppove] = useState([]) // appove all


//   const refUser = firestore.collection("user")
//   const refTypeLeave = firestore.collection("type_leave")
//   const refQuota = firestore.collection("quota")
//   const refLeave = firestore.collection("leave")
//   const refAppove = firestore.collection("appove")

//   const [leaveOfUser,setLeaveOfUser]=useState([])


//   const [datatable, setDatatable] = React.useState({
//     columns: [
//       {
//         label: 'วันที่แจ้ง',
//         field: 'leave_date',
//         width: 150,
//         attributes: {
//           'aria-controls': 'DataTable',
//           'aria-label': 'Name',
//         },
//       },
//       {
//         label: 'วันที่ลา',
//         field: 'leave_start',
//         width: 270,
//       },
//       {
//         label: 'จำนวนวัน',
//         field: 'amount',
//         width: 200,
//       },
//       {
//         label: 'ประเภทการลา',
//         field: 'type_leave_name',
//         sort: 'asc',
//         width: 100,
//       },
//       {
//         label: 'เหตุผล',
//         field: 'reson',
//         sort: 'disabled',
//         width: 150,
//       },
//       {
//         label: 'สถานะ',
//         field: 'status',
//         sort: 'disabled',
//         width: 100,
//       }
//     ],
//   })
//   console.log(1)
//   const [test,setTest]=useState(0)
//   setTimeout(()=>{

//     if(test>=1){

//     }else{

//       setTest(test+1)
//     }
//   },5000)
  
//   useEffect( () => {
//     console.log("2")
//     //เก็บไอดี ของยูเซอร์นี้
//     const authUnsubscibe = auth.onAuthStateChanged((firebaseUser) => {
//       if (!!firebaseUser) {
//         refUser.doc(firebaseUser.uid).onSnapshot(doc => {
//           setUserId(doc.id)
//         })
//       }
//     })


//     // // เก็บค่า type_leave
//     // const typeleavesubscibe = refTypeLeave.onSnapshot(doc => {
//     //   let tempArrayTypeLeave = []
//     //   doc.forEach(data => {
//     //     tempArrayTypeLeave = [
//     //       ...tempArrayTypeLeave,
//     //       {
//     //         type_leave_id: data.id,
//     //         type_leave_name: data.data().type_leave_name
//     //       }
//     //     ]
//     //   })
//     //   setTypeLeave(tempArrayTypeLeave)
//     // })
//     // //เก็บค่า Appove
//     // const appovesubscibe = refAppove.onSnapshot(doc => {
//     //   let tempArrayAppove = []
//     //   doc.forEach(data => {
//     //     tempArrayAppove = [
//     //       ...tempArrayAppove,
//     //       {
//     //         appoveId: data.id,
//     //         leaveId: data.data().leave_id,
//     //         hr_appove: data.data().hr_appove,
//     //         hr_remark: data.data().hr_remark,
//     //         leave_appove: data.data().leave_appove,
//     //         leave_remark: data.data().leave_remark,
//     //         status: data.data().status
//     //       }
//     //     ]
//     //   })
//     //   setAppove(tempArrayAppove)
//     // })



//     // เก็บค่า Leave
//     const leavesubscribe = refLeave.onSnapshot(async (doc) => {
//       let tempArrayLeave =  []
//       doc.forEach(async (data) => {
//         tempArrayLeave = await [
//           ...tempArrayLeave,
//           {
//             leaveId: data.id,
//             type_leave_id: data.data().type_leave_id,
//             uid: data.data().uid,
//             amount: data.data().amount,
//             leave_date: data.data().leave_date,
//             leave_start: data.data().leave_start,
//             reson: data.data().reson
//           }
//         ]
//       })
//       setLeave(await tempArrayLeave)
//       setLoad(false)
//       const findLeave = await leave.filter(data=>(data.uid===userId))
//       console.log(await leave)
//       setTimeout(async()=>{await setDatatable({...datatable,rows:findLeave})},10000)
      
//     })

   
//   },[test])
    

    
//   return (
//     <div>
//       <Checkuser />
//       <Navbar />
//       <Sidebar />
//       {/* Content Wrapper. Contains page content */}
//       <div className="content-wrapper">
//         {/* Content Header (Page header) */}
//         <div className="content-header">
//           <div className="container-fluid">
//             <div className="row mb-2">
//             </div>{/* /.row */}
//           </div>{/* /.container-fluid */}
//         </div>
//         {/* /.content-header */}
//         {/* Main content */}
//         <div className="content">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="card">
//                   <div className="card-header ">
//                     <div className="d-flex justify-content-between">
//                       <h3 className="m-0 text-dark click" onClick={() => console.log(datatable)}>รายการลาทั้งหมด</h3>
//                     </div>
//                   </div>
//                   <div className="card-body table-responsive ">
//                     {
//                       load ? (<div className="spinner-border mx-auto" style={{ width: "3rem", height: "3rem" }} role="status">
//                       </div>
//                       )
//                         : <MDBDataTableV5></MDBDataTableV5>
//                     }
//                   </div>
//                 </div>
//               </div>
//               {/* /.col-md-6 */}
//               {/* /.col-md-6 */}
//             </div>
//             {/* /.row */}
//           </div>
//           {/* /.container-fluid */}
//         </div>
//         {/* /.content */}
//       </div>
//       {/* /.content-wrapper */}
//       {/* Control Sidebar */}
//       <aside className="control-sidebar control-sidebar-dark">
//         {/* Control sidebar content goes here */}
//       </aside>
//       {/* /.control-sidebar */}
//       <Footer />
//     </div >
//   )
// }

