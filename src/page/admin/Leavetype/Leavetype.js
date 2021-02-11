import React from 'react'
export default function Leavetype(props) {
    const chanageHadle=(id,type_leave_name)=>{
        props.change(id,type_leave_name)
    }
    return (
        <tr>
            <th scope="row">{props.data.type_leave_name}</th>
            <td>
                <button className="btn btn-sm btn-outline-primary mr-1" data-toggle="modal" data-target="#exampleModal2" onClick={()=>{chanageHadle(props.data.id,props.data.type_leave_name)}}><i className="far fa-edit"></i>แก้ไข</button>
                <button className="btn btn-sm btn-outline-danger mr-1" onClick={props.delete}><i className="far fa-trash-alt"></i> ลบ</button>
            </td>
        </tr>
    )
}
