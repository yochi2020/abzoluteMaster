import React, { useEffect, useState } from 'react'
import { firestore, auth } from '../../../firebase/config'
export default function Userleave(props) {
    const [typeLeave, setTypeLeave] = useState([])
    const [appove,setAppove]=useState([])
    const refTypeLeave = firestore.collection("type_leave")
    const refAppove = firestore.collection("appove")
    const refLeave = firestore.collection('leave')
    useEffect(() => {
        refTypeLeave.onSnapshot(doc => {
            let tempTypeLeave = []
            doc.forEach(data => {
                tempTypeLeave = [
                    ...tempTypeLeave,
                    {
                        id_typeleave: data.id,
                        typeleavename: data.data().type_leave_name

                    }
                ]
            })
            setTypeLeave(tempTypeLeave)
        })

        refAppove.onSnapshot(doc => {
            let tempAppove = []
            doc.forEach(data => {
                tempAppove = [
                    ...tempAppove,
                    {
                        appove_id:data.id,
                        leave_id:data.data().leave_id,
                        hr_appove: data.data().hr_appove,
                        hr_remark:data.data().hr_remark,
                        leave_appove:data.data().leave_appove,
                        leave_remark:data.data().leave_remark,
                        status:data.data().status
                    }
                ]
            })
            setAppove(tempAppove)
        })
    },)

    // หาTypeLeave
    const findTypeLeave = typeLeave.find(data => (
        data.id_typeleave === props.data.type_leave_id
    ))
    const test = [{ ...findTypeLeave }]



    const handleEdit = () => {
        alert("edit")
        

    }
    const handleDelete =  () => {
        const findAppove = appove.find(data=>(
            data.leave_id===props.data.leave_id
        ))
        
        refAppove.doc(findAppove.appove_id).delete()
        .then(()=>{
            refLeave.doc(findAppove.leave_id).delete()
        .then(()=>{
            window.location.reload()
        }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))

        
        
    }

    return (
        <tr >
            <td onClick={() => { console.log(props) }}>{props.data.leave_date}</td>
            <td>{props.data.leave_start}</td>
            <td>{props.data.amount}</td>
            <td>{test.map((data, index) => (<div key={index}>{data.typeleavename}</div>))}</td>
            <td>{props.data.reson}</td>
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
