import React, { useEffect, useState } from 'react'
import { firestore } from '../../../firebase/config'
export default function Userleave(props) {
    const [leaveUser,setLeaveUser]=useState(props.data) // data leave user
    const [typeLeaveUser,setTypeLeaveUser]=useState([]) // type_leave of user
    const [appoveUser,setAppoveUser]=useState([])   //appove of user
    const refAppove =firestore.collection("appove")
    const refTypeLeave = firestore.collection("type_leave")
    const [status,setStatus]=useState([])
    useEffect(() => {
        //find type_leave of user
        refTypeLeave.onSnapshot(doc=>{
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

            //find type_leave of user
            let typeLeaveOfUser = tempArrayTypeLeave.find(data=>(data.type_leave_id===leaveUser.type_leave_id))
            setTypeLeaveUser(typeLeaveOfUser)
        })


        //find appove of user
        refAppove.onSnapshot(async(doc)=>{
            let tempArrayAppove = []
            doc.forEach(data=>{
                tempArrayAppove=[
                    ...tempArrayAppove,
                    {
                        id_appove:data.id,
                        leave_id:data.data().leave_id,
                        hr_appove:data.data().hr_appove,
                        hr_remark:data.data().hr_remark,
                        leave_appove:data.data().leave_appove,
                        leave_remark:data.data().leave_remark,
                        status:data.data().status
                    }
                ]
            })
            const appoveOfUser = await  tempArrayAppove.find(data=>data.leave_id===leaveUser.leave_id)
            await  setAppoveUser(appoveOfUser)
            await setStatus(appoveUser)
        })
    },[props])


    const handleEdit = () => {
        alert("edit")
        

    }
    const handleDelete =  () => {
       firestore.collection('leave').doc(appoveUser.leave_id).delete()
       .then(()=>{
            refAppove.doc(appoveUser.id_appove).delete()
       }).catch((err)=>console.log(err))
        
    }

   
       
           
    
   
       
    

    return (
        <tr >
            <td onClick={() => { console.log(status) }}>{leaveUser.leave_date}</td>
            <td>{leaveUser.leave_start}</td>
            <td>{leaveUser.amount}</td>
            <td>{typeLeaveUser.type_leave_name}</td>
            <td>{leaveUser.reson}</td>
            <td>
                <span className="badge badge-pill badge-dark">รออนุมัติ</span>
            </td>
            <td>
                <button className="btn btn-sm btn-outline-success mr-1" onClick={() => { handleEdit() }}>แก้ไข</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => { handleDelete() }}>ลบ</button>
            </td>
        </tr>
    )
}
