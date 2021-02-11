import React from 'react'

export default function Employee(props) {
    return (
        <tr>
        <th scope="row">{props.data.fname + props.data.lname} </th>
        <td>{props.data.name}</td>
        <td><i className="far fa-envelope nav-icon"></i>{props.data.email}<br></br><i className="fas fa-phone-alt"></i>{props.data.phone}</td>
        <td>5</td>
        <td>
         <button className="btn btn-sm btn-outline-primary mr-1"><i className="far fa-edit"></i>แก้ไข</button>
         <button className="btn btn-sm btn-outline-danger mr-1"><i className="far fa-trash-alt"></i> ลบ</button>
        </td>
      </tr>
    )
}
