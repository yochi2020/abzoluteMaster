import React,{useState,useEffect} from 'react';
import {auth,firestore} from '../../../firebase/config'
const Form = () => {
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        fname:"",
        lname:"",
        phone:"",
        user_group:"employee"
    })
    const [userleave,setUserleave]=useState([]);
    const [leavetype,setLeavetype] = useState([]);
    const ref = firestore.collection("type_leave");
    const quota = firestore.collection("Quota")
    var allUserleave = [];
    
    useEffect(()=>{
      ref.onSnapshot(snapshot=>{
        let tempDataArray=[];
        let tempLeaveArray=[];
        snapshot.forEach(data=>{
          tempDataArray=[
            ...tempDataArray,
            {
              uid:data.id,
              leavetype:data.data().type_leave_name
            }
          ]

          tempLeaveArray=[
            ...tempLeaveArray,
            {
              uid:data.id,
              leavetype:data.data().type_leave_name,
              value:0
            }
          ]
        })
        setLeavetype(tempDataArray)
        setUserleave(tempLeaveArray)

      })
    })
    const clearForm=()=>{
        setData({
        email:"",
        password:"",
        name:"",
        fname:"",
        lname:"",
        })
    }
    const onSignup=(e)=>{
        e.preventDefault()       
        console.log(data.name)
        // auth.createUserWithEmailAndPassword(data.email,data.password)
        // .then(async (result)=>{
        //     if(!!result){
        //         const userRef =firestore.collection("user").doc(result.user.uid)
        //         const doc = await userRef.get();
        //         if(!doc.data()){
        //             await userRef.set({
        //                 uid:result.user.uid,
        //                 email:result.user.email,
        //                 name:data.name,
        //                 fname:data.fname,
        //                 lname:data.lname,
        //                 phone:data.phone,
        //                 user_group:data.user_group
        //             })

        //         }
        //     }
            
        //     allUserleave.map(item=>{  //เพิ่มจำนวนการลาของแต่ละคน
        //       return quota.add({user_id:result.user.uid,type_leave_id:item.uid,amount:item.value}).then(()=>{
        //         console.log("success")
        //       }).catch(err=>console.log(err))
        //     })
            
        //     clearForm();
        // })
        // .catch(err=>{
        //     alert(err.code)
        // })
        
    }
    const leaveChange=(e)=>{
      const indexForEdit = userleave.findIndex(item=>{
        return item.uid=== e.target.name
      })
      allUserleave[indexForEdit]={
              uid:e.target.name,
              value:e.target.value
      }
      //เมื่อเปลี่ยนค่าจำนวนการลา
    }
    allUserleave=[...userleave] // เก็บค่าการลา

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
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>อีเมล์</label>
                      <input type="text" className="form-control" value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}}></input>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}}></input>
                    </div>
                    <div className="form-group">
                      <label>ชื่อเล่น</label>
                      <input type="text" className="form-control" value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}></input>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>ชื่อจริง</label>
                      <input type="text" className="form-control" value={data.fname} onChange={e=>setData({...data,fname:e.target.value})} ></input>
                    </div>
                    <div className="form-group">
                      <label>นามสกุล</label>
                      <input type="text" className="form-control" value={data.lname} onChange={e=>{setData({...data,lname:e.target.value})}}></input>
                    </div>
                    <div className="form-group">
                      <label>เบอร์โทรศัพ</label>
                      <input type="text" className="form-control" value={data.phone} onChange={e=>{setData({...data,phone:e.target.value})}}></input>
                    </div>
                  </div>
                  <div className="col-md-2">
                    {
                      leavetype.map((item,index)=>(
                        <div className="form-group" key={index}>
                          <label htmlFor="inputState">{item.leavetype}</label>
                          <input className="form-control" type="number" defaultValue="0" min="0" id="example-number-input" name={item.uid} onChange={(e)=>{leaveChange(e)}} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิดหน้าจอ</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>{onSignup(e)}}>บันทึก</button>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Form;
