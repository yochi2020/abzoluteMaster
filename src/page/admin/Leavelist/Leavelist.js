import React, { useState, useEffect } from 'react'
import { firestore, auth } from '../../../firebase/config'
import axios from 'axios'
export default function Leavelist(props) {
    const [appove, setAppove] = useState([])
    const [leave, setLeave] = useState([])
    const [user, setUser] = useState([])
    const [typeLeave, setTypeLeave] = useState([])
    const refLeave = firestore.collection("leave")
    const refUser = firestore.collection("user")
    const refTypeLeave = firestore.collection("type_leave")
    const refAppove = firestore.collection("appove")
    const [reson, setReson] = useState(" ") //reson_notAllowed
    const userr = firestore.collection("user")

    useEffect(() => {
        setAppove(props.data)
        if (props.data.status === "") {
            setAppove({ ...props.data, status: "รออนุมัติ" })
            if (props.data.hr_appove !== '') {
                setAppove({ ...props.data, status: "รอหัวหน้าอนุมัติ" })
            }
            if (props.data.leave_appove !== '') {
                setAppove({ ...props.data, status: "รอhrอนุมัติ" })
            }
        }
        refLeave.onSnapshot(doc => { //ดึงLeave ทั้งหมด
            let tempArrayLeave = []
            doc.forEach(data => {
                tempArrayLeave = [
                    ...tempArrayLeave,
                    {
                        amount: data.data().amount,
                        leave_date: data.data().leave_date,
                        leave_start: data.data().leave_start,
                        reson: data.data().reson,
                        type_leave_id: data.data().type_leave_id,
                        uid: data.id,   //ไอดีของ leave
                        user_id: data.data().uid // ไอดีของ user
                    }
                ]
            })
            setLeave(tempArrayLeave)
        })

        refUser.onSnapshot(doc => { // ดึงยูเซอร์ทั้งหมด
            let tempArrayUser = []
            doc.forEach(data => {
                tempArrayUser = [
                    ...tempArrayUser,
                    {
                        email: data.data().email,
                        fname: data.data().fname,
                        lname: data.data().lname,
                        name: data.data().name,
                        phone: data.data().phone,
                        uid: data.id,
                        user_group: data.data().user_group
                    }
                ]
            })
            setUser(tempArrayUser)
        })

        refTypeLeave.onSnapshot(doc => { //ดึง TypeLeave ทั้งหมด
            let tempArrayTypeLeave = []
            doc.forEach(data => {
                tempArrayTypeLeave = [
                    ...tempArrayTypeLeave,
                    {
                        type_leave_name: data.data().type_leave_name,
                        id: data.id
                    }
                ]
            })
            setTypeLeave(tempArrayTypeLeave)
        })
        ///////////ทำต่อตรงนี้

        return () => {

        }
    }, [props.data])

    var appoveLeave = leave.filter(data => (data.uid === appove.leave_id))
    var appoveLeave_typeLeavejoin = appoveLeave.map(data => {
        return data.type_leave_id
    })
    var typeLeaveJoin = typeLeave.find(data => {
        return data.id === appoveLeave_typeLeavejoin.toString()
    })
    var testt = [{ ...typeLeaveJoin }]


    //หาค่ายูเซอร์
    const findUser = appoveLeave.map((data => {
        return data.user_id
    }))
    const userValue = user.find(data => (data.uid === findUser.toString()))

    const userValueShow = [{ ...userValue }]




    const notAllowed = (obj, reson,fname,lname,namee) => {

        console.log(appove)
        // const name = fname+" "+lname+ " ("+namee+") "
        // userr.doc(auth.currentUser.uid).onSnapshot(doc_user => {
        //       if (doc_user.data().user_group === 'hr') {
        //         refAppove.doc(obj.id_appove).set({ ...obj, hr_appove: "ไม่อนุมัติ", status: "no",hr_remark:reson })
        //       } else if (doc_user.data().user_group === 'admin') {
        //         refAppove.doc(obj.id_appove).set({ ...obj, leave_appove: "ไม่อนุมัติ", status: "no",leave_remark:reson })
        //       }
        //     axios.get("http://localhost:4000/allow/notallowed/"+reson+"/"+name)
        //         .then(() => {
        //         }).catch(err => console.log(err))
        // })

    }


    const allow = (obj,userValueShow) => {
        const name = userValueShow[0].fname+" "+userValueShow[0].lname +" ("+userValueShow[0].name+")"
        const reson = appoveLeave[0].reson
        userr.doc(auth.currentUser.uid).onSnapshot(doc_user => {
          if (doc_user.data().user_group === 'hr') {
            refAppove.doc(obj.id_appove).set({ ...obj, hr_appove: "อนุมัติ" })
            if (obj.leave_appove === 'อนุมัติ') {
              refAppove.doc(obj.id_appove).set({ ...obj, status: "y" })
              axios.get("http://localhost:4000/allow/allow/"+reson+"/"+name)
                .then((res) => {
                  console.log(res)
                }).catch(err => console.log(err))
            }
          } else if (doc_user.data().user_group === 'admin') {
            refAppove.doc(obj.id_appove).set({ ...obj, leave_appove: "อนุมัติ" })
            if (obj.hr_appove === 'อนุมัติ') {
              refAppove.doc(obj.id_appove).set({ ...obj, status: "y" })
              axios.get("http://localhost:4000/allow/allow/"+reson+"/"+name)
                .then((res) => {
                  console.log(res)
                }).catch(err => console.log(err))
            }
          }
        })
    
    
      }
    return (
        props.data.status === 'no' || props.data.status === 'y' ? (
            null
        ) : <tr>
                <th  scope="row">{
                    userValueShow.map((data, index) => (<div key={index}>{data.fname} {data.lname} ({data.name})               
                    <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">หมายเหตุ</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input className="form-control" value={reson} onChange={(e) => { setReson(e.target.value) }} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setReson("")}>ยกเลิก</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { notAllowed(props.data.id_appove, reson,data.fname,data.lname,data.name) }}>{props.data.id_appove}ตกลง</button>
                                </div>
                            </div>
                        </div>
                    </div></div>
                    ))}</th>
                <td>
                    {
                        userValueShow.map((data, index) => (
                            <div key={index}>
                                <i className="far fa-envelope nav-icon"></i>{data.email}<br></br>
                                <i className="fas fa-phone-alt"></i>{data.phone}
                            </div>
                        ))
                    }
                </td>
                <td>{appoveLeave.map((data,index)=><div key={index}>{data.leave_date}</div>)}</td>
                <td>{appoveLeave.map((data, index) => (<div key={index}>{data.leave_start}</div>))}</td>
                <td>{appoveLeave.map((data, index) => (<div key={index}>{data.amount}</div>))}</td>
                <td>{testt.map((data, index) => <div key={index}>{data.type_leave_name}</div>)}</td>
                <td>{appoveLeave.map((data, index) => (<div key={index}>{data.reson}</div>))}</td>
                <td>
                    <span className="badge badge-pill badge-dark">{appove.status}</span>
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-success mr-1" onClick={()=>{allow(props.data,userValueShow)}}>อนุมัติ</button>
                    {/* <button className="btn btn-sm btn-outline-danger" onClick={props.notAllowed} >ไม่อนุมัติ</button> */}
                    <button type="button" className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#staticBackdrop">
                        ไม่อนุมัติ {props.data.id_appove}
                    </button>
                </td>


            </tr>

    )
}
