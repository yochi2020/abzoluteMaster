import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase/config'

const Form = () => {
    const [data, setData] = useState({
        leave_date: "",
        leave_start: "",
        reson: "",
        amount: "",
        type_leave_id: "",
        uid: ""
    })
    const [amount, setAmount] = useState({
        min: 0,
        max: 5,
    })  //จำนวนการลา
    const [user, setUser] = useState([])
    const [typeLeave, setTypeLeave] = useState([]) //
    const [quota, setQuota] = useState([])  // quota all
    const [quotaUser, setQuotaUser] = useState([]) // quota of user
    const refTypeLeave = firestore.collection("type_leave")
    const refUser = firestore.collection("user")
    const refQuota = firestore.collection("quota")
    const refAppove =firestore.collection("appove")
    const refLeave = firestore.collection("leave")

    useEffect(() => {

        // info user
        auth.onAuthStateChanged((firebaseUser) => {
            if (!!firebaseUser) {
                refUser.doc(firebaseUser.uid).onSnapshot(doc => {
                    setUser({ ...doc.data(), id: doc.id })
                })
            }
        })

        // find TypeLeave all
        refTypeLeave.onSnapshot(doc => {
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

        refQuota.onSnapshot(doc => {
            let tempArrayQuota = []
            doc.forEach(data => {
                tempArrayQuota = [
                    ...tempArrayQuota,
                    {
                        quotaId: data.id,
                        type_leave_id: data.data().type_leave_id,
                        amount: data.data().amount,
                        uid: data.data().uid
                    }
                ]
            })
            setQuota(tempArrayQuota)
        })


        //find quota of user
        const quotaUser = quota.filter(data => data.uid === user.id)
        setQuotaUser(quotaUser)

        


    },[user])

    const fomatDate = (e) => {
        let leaveDate = new Date()
        let fomatLeaveDate = leaveDate.getDay()+"/"+leaveDate.getMonth()+"/"+leaveDate.getFullYear()
        let d = new Date(e.target.value)
        let dt = d.getDate();
        let mn = d.getMonth() +1;
        let yy = d.getFullYear();
        setData({ ...data, leave_start: dt + '/' + mn + '/' + yy ,leave_date:fomatLeaveDate})
    }

    const checkQuota = (e) => {
        const checkQuotaOfUser = quotaUser.find(data => data.type_leave_id === e.target.id)
        setAmount({ ...amount, max: checkQuotaOfUser.amount })
        setData({...data,type_leave_id:e.target.id,uid:user.id})
    }


    const clearData = () => {
        setData({
            leave_id: "",
            leave_date: "",
            leave_start: "",
            reson: "",
            amount: "",
            type_leave_id: "",
            uid: ""
        })
        document.getElementById("myDate").value=""
        document.getElementById("myAmount").value=""
        document.getElementById("myReson").value=""
    }

    const submitData= ()=>{
         refLeave.add(data)
        .then((result)=>{
            let obj=  {
                leave_id:result.id,
                leave_appove:"",
                hr_appove:"",
                leave_remark:"",
                hr_remark:"",
                status:"",
            }
            refAppove.add(obj).then(()=>{
                console.log("success")
            }).catch(err=>{console.log(err)})
            clearData()
        }).catch(err=>{console.log(err)})
    }
    return (
        <div>
            <div className="dropdown">
                <button onClick={(e) => { console.log(data) }} className="btn btn-sm btn-info dropdown-toggle mr-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    ยื่นเรื่องขอลา
                        </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        typeLeave.map((dataTypeLeave, index) => {
                            return <div key={index} className="dropdown-item" onClick={(e) => { checkQuota(e) }} id={dataTypeLeave.type_leave_id} data-toggle="modal" data-target="#staticBackdrop" >{dataTypeLeave.type_leave_name}</div>
                        })
                    }
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={()=>{clearData()}}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label onClick={() => { console.log(data) }}>วันที่ลา</label>
                                        <input type="date" id="myDate"  onChange={(e) => {  fomatDate(e) }} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">จำนวนการลา</label>
                                        <input id="myAmount"   type="number" min={amount.min} max={amount.max} onChange={(e)=>{setData({...data,amount:e.target.value})}} className="form-control" />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="" >เหตุผล</label>
                                            <textarea id="myReson" className="form-control" onChange={(e) => setData({ ...data, reson: e.target.value })} ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{clearData()}}>Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{submitData()}} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
