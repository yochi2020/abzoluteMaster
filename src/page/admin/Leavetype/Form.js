import React,{useState} from 'react';

const Form = ({addData}) => {
    const [dataleave,setDataleave]=useState("");

    return (
        <div>
            <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#staticBackdrop">เพิ่มประเภทการลา</button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">เพิ่มประเภทการลา</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                            <label>ชื่อประเภทการลา</label>
                            <input type="text" className="form-control"  value={dataleave} onChange={(e)=>setDataleave(e.target.value)} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิดหน้าจอ</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{addData(dataleave); setDataleave("")}}>บันทึก</button>      
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
