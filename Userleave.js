import React, { useEffect, useState } from 'react'
import { firestore } from '../../../firebase/config'
export default function Userleave(props) {

    const [typeName,setTypeName]=useState([])
    const [eiei,setEiei]=useState([])
    const refTypeName= firestore.collection("type_leave")
    useEffect(()=>{
        refTypeName.onSnapshot(data=>{
            let tempDataArray=[]
            data.forEach(data=>{
                tempDataArray=[
                    ...tempDataArray,
                    {
                        type_id:data.id,
                        type_leave_name:data.data().type_leave_name
                    }
                ]
            })
            setTypeName(tempDataArray)
        })
        //     if(true){

        //     }
        // const test = typeName.find(data=>{
        //     return data.type_id===props.data.type_leave_id
        // })
        // setEiei(test)
    })
    return (
        <tr > 
            <td onClick={()=>{console.log(typeName)}}>
              
            </td>
            <td>
            {props.data.leave_start}

            </td>
            <td>
            </td>
            <td>{props.data.amount}</td>
            <td>ห</td>
            <td>ห</td>

            <td>
                <span className="badge badge-pill badge-dark">รออนุมัติ</span>
            </td>
        </tr>

    )
}
