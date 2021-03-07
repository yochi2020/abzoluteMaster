// import React, { useEffect, useState } from 'react';
// import Footer from '../../component/admin/Footer';
// import Navbar from '../../component/admin/Navbar';
// import Sidebar from '../../component/admin/Sidebar';
// import Checkadmin from './Checkadmin';
// import Form from './Employee/Form';
// import { firestore } from '../../firebase/config'
// import axios from 'axios'
// import { MDBDataTableV5 } from 'mdbreact';
// import $ from 'jquery'
// function Employee() {

//   const [user, setUser] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [editQuota,setEditQuota]=useState([])
//   const [editUser,setEditUser]=useState([])
//   const [quota,setQuota]=useState([])  //store all quota
//   const [quotaUser,setQuotaUser]=useState([])
//   const [typeLeave,setTypeLeave]=useState([])  // store all type_leave 
//   const refUser = firestore.collection("user");
//   const refTypeLeave  = firestore.collection("type_leave")
//   const refQuota = firestore.collection("quota")
//   const [datatable, setDatatable] = useState({
//     columns: [
//       {
//         label: 'ชื่อพนักงาน',
//         field: 'name',
//         width: 200,
//         attributes: {
//           'aria-controls': 'DataTable',
//           'aria-label': 'Name',
//         },
//       },
//       {
//         label: 'อีเมล',
//         field: 'email',
//         width: 200,
//       },
//       {
//         label: 'เบอร์โทร',
//         field: 'phone',
//         width: 200,
//       },
//       {
//         label: 'แก้ไข',
//         field: 'edit',
//         sort: 'asc',
//         width: 5,
//       },
//       {
//         label: 'ลบ',
//         field: 'delete',
//         sort: 'asc',
//         width: 5,
//       }
//     ],

//   });



//   const [testt,setTestt]=useState(0)
//   setTimeout(()=>{

//     if(testt>=1){

//     }else{

//      setTestt(testt+1)
//     }
//     $(".click").click()
//   },1500)
//   useEffect(() => {

//     //pull data Quota
//    const quotasubscrib= refQuota.onSnapshot(snapshot=>{
//       let tempArrayQuota=[]
//       snapshot.forEach(data=>{
//         tempArrayQuota=[
//           ...tempArrayQuota,
//           {
//             quota_id:data.id,
//             type_leave_id:data.data().type_leave_id,
//             uid:data.data().uid,
//             amount:data.data().amount
//           }
//         ]
//       })
//       setQuota(tempArrayQuota)
//     })

//     // pull data type_leave
//     const typeleavesubscrib= refTypeLeave.onSnapshot(snapshot=>{
//       let tempArrayTypeLeave=[]
//       snapshot.forEach(dataa=>{
//         tempArrayTypeLeave=[
//           ...tempArrayTypeLeave,
//           {
//             type_leave_id:dataa.id,
//             type_leave_name:dataa.data().type_leave_name
//           }
//         ]
//       })
//       setTypeLeave(tempArrayTypeLeave)
//     })



//     //pull data user
//     const usersubscrib= refUser.onSnapshot(snapshot => {
//       let tempDataArray = [];
//       snapshot.forEach(doc => {
//         tempDataArray = [
//           ...tempDataArray,
//           {
//             name: doc.data().fname + doc.data().lname+" " +"("+ doc.data().name+")",
//             email: doc.data().email,
//             phone:doc.data().phone,
//             uid: doc.id,
//             user_group: doc.data().user_group,
//             edit:<button  className="btn btn-sm btn-outline-success " data-toggle="modal" data-target="#staticBackdrop2" onClick={()=>{editHandle(doc.data())}}>แก้ไข</button>,
//             delete:<button  className="btn btn-sm btn-outline-danger" onClick={()=>{deleteHandle(doc.id)}}>ลบ</button> 
//           }
//         ];
//       })
//       setUser(()=>tempDataArray)
//       setLoading(false)

//     })


//     setDatatable({...datatable,rows:user})
//     let tempArrayFilterQuotaUser = quota.filter(data=>{
//       return data.uid==editUser.uid
//     })
//     setQuotaUser(()=>tempArrayFilterQuotaUser)


//     return () => {
//       usersubscrib()
//       quotasubscrib()
//       typeleavesubscrib()
//     };
//   },[]);


//   const deleteHandle = async (uid) => {
//     setTestt(Math.random())
//     let obj={
//       uid
//     }
//     var leaveId = '';
//     //delete leave of uerr
//     await firestore.collection('leave').where('uid','==',obj.uid)
//     .onSnapshot(doc=>{
//         doc.forEach(data=>{
//           firestore.collection("leave").doc(data.id)
//           .delete()
//           leaveId=data.id
//           firestore.collection("appove").where('leave_id','==',data.id)
//           .onSnapshot(doc=>{
//             doc.forEach(d=>{
//               firestore.collection("appove").doc(d.id)
//               .delete()
//             })
//           })

//         })
//         console.log(leaveId)
//     })
//     // delete quota of user
//      await firestore.collection("quota").where('uid','==',obj.uid)
//     .onSnapshot(doc=>{
//       doc.forEach(data=>{
//         console.log(data.data())
//         firestore.collection("quota").doc(data.id)
//         .delete()
//       })
//     })


//     // delete user
//     await axios.post("http://localhost:4000/deleteuser",obj)
//     .then( (uid)=>{
//       const refUser = firestore.collection("user").doc(uid.data)
//        refUser.delete()
//     })
//   }


//   const editHandle = (data)=>{

//     clearHandle()
//     firestore.collection("quota").where('uid','==',data.uid)
//     .onSnapshot(doc=>{
//       let tempArrayquota =[]
//       doc.forEach(data=>{
//         tempArrayquota=[
//           ...tempArrayquota,
//           {
//             amount:data.data().amount,
//             type_leave_id:data.data().type_leave_id,
//             uid:data.data().uid
//           }
//         ]
//       })
//       setEditQuota(tempArrayquota)
//       setEditUser(data)
//     })





//   }






//   //clear form edit
//   const clearHandle =()=>{
//     setTestt(Math.random())
//     setEditUser([])
//   }

//   const countAmount =(e,data)=>{

//     refQuota.doc(e.target.name)
//     .set({
//         amount:e.target.value,
//         type_leave_id:data.type_leave_id,
//         uid:data.uid
//     })

//   }


//   const submitHandle =()=>{
//     refUser.doc(editUser.uid)
//     .set(editUser)

//     console.log(editUser)

//     setTestt(Math.random())
//   }
//   return (
//     <div>
//       <Checkadmin />
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
//               <div className="col-lg-12" style={{height:'670px'}}>
//                 <div className="card">
//                   <div className="card-header ">
//                     <div className="d-flex justify-content-between">
//                       <h3 className="m-0 text-dark click" onClick={()=>{setTestt("9")}} >พนักงาน</h3>
//                       <Form />
//                     </div>
//                   </div>
//                   <div className="card-body table-responsive ">
//                   {
//                           loading ? (
//                               <div className="spinner-border mx-auto mr-4" style={{width:"3rem",height:"3rem"}} role="status">
//                               </div>


//                  ) : <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}  entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false}/>

//                 }
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



// {/* <!-- Modal of Edit user --> */}
// <div className="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div className="modal-dialog modal-xl">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true" onClick={()=>clearHandle}>&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//       <div className="container-fluid">
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="form-group">
//                       <label onClick={()=>{console.log(quotaUser)}}>อีเมล์</label>
//                       <input type="text" className="form-control" value={editUser.email} onChange={(e)=>setEditUser({...editUser,email:e.target.value})} ></input>
//                     </div>
//                     <div className="form-group">
//                       <label>ชื่อเล่น</label>
//                       <input type="text" value={editUser.name} onChange={(e)=>setEditUser({...editUser,name:e.target.value})} className="form-control" ></input>
//                     </div>
//                     <div className="form-group">
//                       <label>เบอร์โทรศัพ</label>
//                       <input type="text" value={editUser.phone} onChange={(e)=>setEditUser({...editUser,phone:e.target.value})} className="form-control" ></input>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="form-group">
//                       <label>ชื่อจริง</label>
//                       <input type="text" value={editUser.fname} onChange={(e)=>setEditUser({...editUser,fname:e.target.value})}  className="form-control"  ></input>
//                     </div>
//                     <div className="form-group">
//                       <label>นามสกุล</label>
//                       <input type="text" value={editUser.lname} onChange={(e)=>setEditUser({...editUser,lname:e.target.value})}  className="form-control"></input>
//                     </div>

//                   </div>
//                   <div className="col-md-3">
//                         {
//                           quotaUser.map((data,index)=>(
//                             <div key={index} className="form-group">

//                               <label>
//                               {
//                                 typeLeave.map((dataTypeLeave,keyDataTypeLeave)=>(
//                                   <div key={keyDataTypeLeave}>
//                                     {
//                                       dataTypeLeave.type_leave_id===data.type_leave_id?
//                                       <div>{dataTypeLeave.type_leave_name}</div>
//                                       :null
//                                     }
//                                   </div>
//                                 ))

//                               }
//                               </label>
//                               <input className="form-control" type="number" defaultValue={data.amount} min="0"  name={data.quota_id}  onChange={(e)=>{countAmount(e,data)}}  />
//                             </div>
//                           ))
//                         }
//                   </div>
//                 </div>
//                 </div>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>clearHandle}>ปิด</button>
//         <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>submitHandle()}>บันทึก</button>
//       </div>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// }
// export default Employee;



import React, { useEffect, useState } from 'react';
import Footer from '../../component/admin/Footer';
import Navbar from '../../component/admin/Navbar';
import Sidebar from '../../component/admin/Sidebar';
import Checkadmin from './Checkadmin';
import Form from './Employee/Form';
import { firestore } from '../../firebase/config'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact';
export default function Employee() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [typeLeave, setTypeLeave] = useState([])
  const [quotaOfUser, setQuotaOfUser] = useState([])
  const [dataEdit,setDataEdit]=useState({})
  const refUser = firestore.collection("user")
  const refQuota = firestore.collection("quota")
  const refLeave =firestore.collection("leave")
  const refTypeLeave = firestore.collection('type_leave')
  const refAppove =firestore.collection("appove")
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'ชื่อพนักงาน',
        field: 'name',
        width: 200,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'อีเมล',
        field: 'email',
        width: 200,
      },
      {
        label: 'เบอร์โทร',
        field: 'phone',
        width: 200,
      },
      {
        label: 'แก้ไข',
        field: 'edit',
        sort: 'asc',
        width: 5,
      },
      {
        label: 'ลบ',
        field: 'delete',
        sort: 'asc',
        width: 5,
      }
    ],

  });



 



  useEffect( () => {
    refTypeLeave.onSnapshot( doc=>{
      let tempArrayTypeLeave=[]
      doc.forEach( data=>{
        tempArrayTypeLeave= [
          ...tempArrayTypeLeave,
          {
            typeLeaveId:data.id,
            type_leave_name:data.data().type_leave_name
          }
        ]
      })
      setTypeLeave(tempArrayTypeLeave)
    })
    refUser.onSnapshot( doc => {
      let tempArrayUser = []
      doc.forEach(  data => {
        tempArrayUser =  [
          ...tempArrayUser,
          {
            email: data.data().email,
            fname: data.data().fname,
            lname: data.data().lname,
            name: data.data().name,
            phone: data.data().phone,
            uid: data.id,
            user_group: data.data().user_group,
            edit:<button  className="btn btn-sm btn-outline-success " data-toggle="modal" data-target="#staticBackdrop2" onClick={()=>{clickEditHandle(data.data(),data.id)}}>แก้ไข</button>,
            delete:<button  className="btn btn-sm btn-outline-danger" onClick={()=>{deleteHandle(data.id)}}>ลบ</button> 
          }
        ]
      })
        setUser(tempArrayUser)
        setLoading(false)
    })
    setDatatable({...datatable,rows:user})
    return (() => {
    })
  },[loading])


  const deleteHandle = (id)=>{
    refLeave.where("uid","==",id)
    .onSnapshot(doc=>{
      let tempArrayLeaveOfUser = []
      doc.forEach(data=>{
        tempArrayLeaveOfUser=[
          ...tempArrayLeaveOfUser,
          {
            leaveId:data.id,
            reason:data.data().reson
          }
        ]
      })
      tempArrayLeaveOfUser.forEach(dataLeaveOfUser=>{
        refAppove.where("leave_id","==",dataLeaveOfUser.leaveId)
        .onSnapshot(doc=>{
          doc.forEach(data=>{
            refAppove.doc(data.id).delete()
          })
        })
        
        refLeave.doc(dataLeaveOfUser.leaveId).delete()
      })
        refQuota.where("uid","==",id)
        .onSnapshot(doc=>{
          doc.forEach(data=>{
            refQuota.doc(data.id).delete()
          })
        })
        refUser.doc(id).delete()
    })
        // delete user
    axios.post("http://localhost:4000/deleteuser",{id})
    .then(()=>{
      console.log("Delete User Success")
      setLoading(true)
    })
  }


  const submitEditHandle = ()=>{
    console.log(dataEdit)

    test.forEach(dataChangeQuota=>{
      refQuota.doc(dataChangeQuota.quotaId).set({
        amount:dataChangeQuota.amount,
        type_leave_id:dataChangeQuota.type_leave_id,
        uid:dataEdit.uid
      })
    })
    console.log(dataEdit)
  }



  const clickEditHandle = (data,uid) =>{
    refQuota.where("uid","==",uid)
    .onSnapshot(doc=>{
      let tempArrayQuotaUser=[]
      doc.forEach(data=>{
        tempArrayQuotaUser=[
          ...tempArrayQuotaUser,
          {
            quotaId:data.id,
            type_leave_id:data.data().type_leave_id,
            amount:data.data().amount,
            uid:data.data().uid
          }
        ]
      })
    
      
      setQuotaOfUser(tempArrayQuotaUser)
      setDataEdit({...data,uid:uid})
    })
    console.log(typeLeave)
  }
  const [test,setTest]=useState([])

  //   const editHandle = (data)=>{

//     clearHandle()
//     firestore.collection("quota").where('uid','==',data.uid)
//     .onSnapshot(doc=>{
//       let tempArrayquota =[]
//       doc.forEach(data=>{
//         tempArrayquota=[
//           ...tempArrayquota,
//           {
//             amount:data.data().amount,
//             type_leave_id:data.data().type_leave_id,
//             uid:data.data().uid
//           }
//         ]
//       })
//       setEditQuota(tempArrayquota)
//       setEditUser(data)
//     })





//   }
  const quotaChange =(e)=>{
    const a =test
    const  eiei = {
      amount:e.target.value,
      quotaId:e.target.name,
      type_leave_id:e.target.id
    }
    a.push({...eiei})
    setTest(a)
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
              <div className="col-lg-12" style={{ height: '670px' }}>
                <div className="card">
                  <div className="card-header ">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 text-dark click" onClick={() => {console.log(typeLeave) }} >พนักงาน</h3>
                      <Form />
                    </div>
                  </div>
                  <div className="card-body table-responsive ">
                    {
                      loading ? (
                        <div className="spinner-border mx-auto mr-4" style={{ width: "3rem", height: "3rem" }} role="status">
                        </div>
                      ) : <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}  entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false}/>
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

 {/* <!-- Modal of Edit user --> */}
 <div className="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog modal-xl">
     <div className="modal-content">
       <div className="modal-header">
         <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" onClick={()=>{console.log(quotaOfUser)}}>&times;</span>
         </button>
       </div>
       <div className="modal-body">
       <div className="container-fluid">
                 <div className="row">
                   <div className="col-md-4">
                     <div className="form-group">
                       <label onClick={()=>{console.log(test)}}>อีเมล์</label>
                       <input type="text" className="form-control" value={dataEdit.email} onChange={(e)=>{setDataEdit({...dataEdit,email:e.target.value})}} />
                     </div>
                     <div className="form-group">
                       <label>ชื่อเล่น</label>
                       <input type="text" className="form-control" value={dataEdit.name} onChange={(e)=>{setDataEdit({...dataEdit,name:e.target.value})}}></input>
                     </div>
                     <div className="form-group">
                       <label>เบอร์โทรศัพ</label>
                     <input type="text"  className="form-control" value={dataEdit.phone} onChange={(e)=>{setDataEdit({...dataEdit,phone:e.target.value})}}></input>
                     </div>
                   </div>
                   <div className="col-md-4">
                     <div className="form-group">
                       <label>ชื่อจริง</label>
                       <input type="text"   className="form-control" value={dataEdit.fname} onChange={(e)=>{setDataEdit({...dataEdit,fname:e.target.value})}}></input>
                     </div>
                     <div className="form-group">
                       <label>นามสกุล</label>
                       <input type="text"   className="form-control" value={dataEdit.lname} onChange={(e)=>{setDataEdit({...dataEdit,lname:e.target.value})}}></input>
                     </div>

                   </div>
                   <div className="col-md-3">
                        {
                          quotaOfUser.map((data,index)=>(
                            <div className="form-group" key={index}>
                              {
                                typeLeave.map((dataTypeLeave,i)=>{
                                  if(dataTypeLeave.typeLeaveId===data.type_leave_id){
                                    return  <div key={i}>
                                      <label >{dataTypeLeave.type_leave_name}</label>
                                      <input type="number" className="form-control" name={data.quotaId} id={data.type_leave_id} defaultValue={data.amount} onChange={(e)=>{quotaChange(e)}}/>
                                    </div>
                                  }
                                })
                              }
                            </div>
                          ))
                        }
                   </div>
                 </div>
                 </div>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{}}>ปิด</button>
         <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{submitEditHandle()}}>บันทึก</button>
       </div>
     </div>
   </div>
 </div>
    </div>
  )
}
