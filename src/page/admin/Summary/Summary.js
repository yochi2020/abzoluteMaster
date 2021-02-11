import React, { useState, useEffect } from 'react'
import { firestore } from '../../../firebase/config'
export default function Summary(props) {
    const [leave, setLeave] = useState(props.data)
    const [typeLeave, setTypeLeave] = useState([])
    const [typeLeaveUser, setTypeLeaveUser] = useState([])
    const [appove, setAppove] = useState([])
    const [appoveUser,setAppoveUser]=useState([])
    const [status,setStatus]=useState([])
    const refTypeLeave = firestore.collection("type_leave")
    const refAppove = firestore.collection("appove")
    useEffect(() => {
        //find all typeLeave
        const typeleavesubscribe = refTypeLeave.onSnapshot(doc => {
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
            setTypeLeave(tempArrayTypeLeave)
        })
        // find all appove
        const appovesubscribe = refAppove.onSnapshot(doc => {
            let tempArrayAppove = []
            doc.forEach(data => {
                tempArrayAppove = [
                    ...tempArrayAppove,
                    {
                        appoveId: data.id,
                        leave_id: data.data().leave_id,
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

        //find typeleave of user
        const findTypeLeave = typeLeave.filter(data => (data.type_leave_id === leave.type_leave_id))
        setTypeLeaveUser(findTypeLeave)


        //find appove of user
        const findAppove = appove.filter(data => (data.leave_id===leave.leave_id))
        setAppoveUser(findAppove)

        appoveUser.forEach(data=>{
            switch(data.status){
                case '':setStatus('รออนุมัติ')
                break
                case 'no':setStatus('ไม่อนุมัติ')
                break
                case 'y':setStatus("อนุมัติ")
            }
        })
    }, [typeLeave])



    return (
        <tr>
            <td onClick={() => { console.log(appoveUser) }}>{leave.leave_date}</td>
            <td>{leave.leave_start}</td>
            <td>{leave.amount}</td>
            <td>{typeLeaveUser.map((data, index) => { return <div key={index}>{data.type_leave_name}</div> })}</td>
            <td>{leave.reason}</td>
            <td><span className="badge badge-pill badge-dark">{status}</span></td>
        </tr>
    )
}
