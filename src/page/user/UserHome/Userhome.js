import React, { useState, useEffect } from 'react'
import {firestore} from '../../../firebase/config'
export default function Userhome(props) {
    const [leaveUser, setLeaveUser] = useState(props.data)
    const [appove,setAppove]=useState([])
    const [appoveUser,setAppoveUser]=useState([])
    const [typeLeave,setTypeLeave]=useState([])
    const[typeLeaveUser,setTypeLeaveUser]=useState([])
    const refAppove = firestore.collection("appove")
    const refTypeLeave = firestore.collection("type_leave")
    const [status,setStatus]=useState()
    useEffect(() => {
        //เก็บค่า Appove
        const appovesubscibe = refAppove.onSnapshot(doc => {
            let tempArrayAppove = []
            doc.forEach(data => {
                tempArrayAppove = [
                    ...tempArrayAppove,
                    {
                        appoveId: data.id,
                        leaveId: data.data().leave_id,
                        hr_appove: data.data().hr_appove,
                        hr_remark: data.data().hr_remark,
                        leave_appove: data.data().leave_appove,
                        leave_remark: data.data().leave_remark,
                        status: data.data().status
                    }
                ]
            })
            setAppove(tempArrayAppove)
        })

        const typeleavesubscribe= refTypeLeave.onSnapshot(doc=>{
            let temArrayTypeLeave=[]
            doc.forEach(data=>{
                temArrayTypeLeave=[
                    ...temArrayTypeLeave,
                    {
                        typeLeaveId:data.id,
                        type_leave_name:data.data().type_leave_name
                    }

                ]
            })
            setTypeLeave(temArrayTypeLeave)
        })

        // find appove of user
        const findAppove =appove.filter(data=>(data.leaveId===leaveUser.leaveId))
        setAppoveUser(findAppove)


        //find typeleave
        const findTypeLeave = typeLeave.filter(data=>(data.typeLeaveId===leaveUser.type_leave_id))
        setTypeLeaveUser(findTypeLeave)
        
        appoveUser.forEach(data=>{
            switch(data.status){
                case "":setStatus('รออนุมัติ')
                break
                case "no": setStatus('ไม่อนุมัติ')
                break
                case "y":setStatus('อนุมัติ')
                break
            }
        })
        return ()=>{
            appovesubscibe()
            typeleavesubscribe()
        }
    },[appove] )
    
    return (
        <tr >
            <td onClick={() => { console.log(props) }}>{leaveUser.leave_date}</td>
            <td onClick={()=>{console.log(typeLeave)}}>{leaveUser.leave_start}</td>
            <td>{leaveUser.amount}</td>
            <td>{typeLeaveUser.map((data,index)=>(<div key={index}>{data.type_leave_name}</div>))}</td>
            <td>{leaveUser.reson}</td>
            <td><span className="badge badge-pill badge-dark">{status}</span></td>
        </tr>
    )
}
