import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../../firebase/config'
import axios from 'axios'
export default function Form() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    fname: "",
    lname: "",
    phone: "",
    user_group: "employee"
  })
  const [typeLeave,setTypeLeave]=useState([])

  const refUsr = firestore.collection("user")
  const refQuota = firestore.collection("quota")
  const refTypeLeave = firestore.collection("type_leave")

  const clearForm = () => {
    setData({
    email: "",
    password: "",
    name: "",
    fname: "",
    lname: "",
    phone: "",
    user_group: "employee"
    })

   }

  const onChangevalue = (e)=>{ //เปลี่ยนค่าจำนวนการลา
    let tempArrayTypeLeave = typeLeave
    let typeLeaveIndex = typeLeave.findIndex(data=>{
      return data.typeLeaveId===e.target.name
    })
    tempArrayTypeLeave[typeLeaveIndex]={
      ...tempArrayTypeLeave[typeLeaveIndex],
      value:e.target.value
    }
    setTypeLeave(tempArrayTypeLeave)
  }

  const onSignup = ()=>{
    axios.post("http://localhost:4000/register",data)
    .then(result=>{
      refUsr.doc(result.data.uid)
      .set(data)

      typeLeave.forEach( data=>{
        return  refQuota.add({
          type_leave_id:data.typeLeaveId,
          amount:data.value,
          uid:result.data.uid
        })
      })
      setTimeout(() => {
        window.location.reload()
      },2000);
    }).catch(err=>{
      console.log(err)
      alert(err)
    })

    // setInterval(()=>{window.location.reload()},10000)

  }
  useEffect(()=>{
    refTypeLeave.onSnapshot(doc=>{
      let tempArrayTypeLeave=[]
      doc.forEach(data=>{
        tempArrayTypeLeave=[
          ...tempArrayTypeLeave,
          {
            typeLeaveId:data.id,
            type_leave_name:data.data().type_leave_name,
            value:0
          }
        ]
      })
      setTypeLeave(tempArrayTypeLeave)
    })
    
  },[])



  return (
    <div>
      <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#staticBackdrop">เพิ่มพนักงาน</button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">เพิ่มพนักงาน</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={() => clearForm()}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label onClick={() => console.log(typeLeave)}>อีเมล์</label>
                      <input type="text" className="form-control" value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}} ></input>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}} ></input>
                    </div>
                    <div className="form-group">
                      <label>ชื่อเล่น</label>
                      <input type="text" className="form-control" value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}></input>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>ชื่อจริง</label>
                      <input type="text" className="form-control" value={data.fname} onChange={(e)=>{setData({...data,fname:e.target.value})}}></input>
                    </div>
                    <div className="form-group">
                      <label>นามสกุล</label>
                      <input type="text" className="form-control" value={data.lname} onChange={(e)=>{setData({...data,lname:e.target.value})}}></input>
                    </div>
                    <div className="form-group">
                      <label>เบอร์โทรศัพ</label>
                      <input type="text" className="form-control"value={data.phone} onChange={(e)=>{setData({...data,phone:e.target.value})}} ></input>
                    </div>
                  </div>
                  <div className="col-md-2">
                      {
                        typeLeave.map((data,index)=>(
                          <div className="form-group" key={index}> 
                            <label>{data.type_leave_name}</label>
                            <input type="number" className="form-control"  min="0" defaultValue="0" name={data.typeLeaveId} onChange={(e)=>{onChangevalue(e)}}/>
                          </div>
                        ))
                      }
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => clearForm()}>ปิดหน้าจอ</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {onSignup() }}>บันทึก</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
