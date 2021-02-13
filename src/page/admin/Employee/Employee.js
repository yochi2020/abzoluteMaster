import React from 'react'
export default function Employee(props) {
  return (
    <tr>
      <th scope="row">{props.data.fname + props.data.lname} </th>
      <td>{props.data.name}</td>
      <td><i className="far fa-envelope nav-icon"></i>{props.data.email}<br></br><i className="fas fa-phone-alt"></i>{props.data.phone}</td>
      <td>
        <button className="btn btn-sm btn-outline-primary mr-1" data-toggle="modal" data-target="#staticBackdrop2"><i className="far fa-edit"></i>แก้ไข</button>
        <button className="btn btn-sm btn-outline-danger mr-1" onClick={props.delete}><i className="far fa-trash-alt" ></i> ลบ</button>
        <div className="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">หมายเหตุddd</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                  <div className="form-group">
                      <label>อีเมล์</label>
                      <input type="text" className="form-control" ></input>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" ></input>
                    </div>
                    <div className="form-group">
                      <label>ชื่อเล่น</label>
                      <input type="text" className="form-control" ></input>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>ชื่อจริง</label>
                      <input type="text" className="form-control"  ></input>
                    </div>
                    <div className="form-group">
                      <label>นามสกุล</label>
                      <input type="text" className="form-control" ></input>
                    </div>
                    <div className="form-group">
                      <label>เบอร์โทรศัพ</label>
                      <input type="text" className="form-control" ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" >ยกเลิก</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" >ตกลง</button>
            </div>
          </div>
        </div>
      </div>
      </td>
    </tr>
  )
}
