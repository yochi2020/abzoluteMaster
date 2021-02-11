import React,{useEffect, useRef, useState} from 'react';
import {auth,firestore} from '../../firebase/config'
import { Link,useHistory } from 'react-router-dom'
function Navbar() {
    const history = useHistory();
    const ref = useRef(firestore.collection("user")).current;
    const [user,setUser]=useState({});
    useEffect(()=>{
       const authUnsubscibe= auth.onAuthStateChanged(
            (firebaseUser)=>{
                if(!!firebaseUser){
                    ref.doc(firebaseUser.uid).onSnapshot(doc=>{
                        if(doc.data()){
                            const userData = {
                                email:doc.data().email,
                                fname:doc.data().fname,
                                lname:doc.data().lname,
                                name:doc.data().name,
                                phone:doc.data().phone,
                                uid:doc.data().uid,
                                user_group:doc.data().user_group
                            }
                            setUser(userData)
                        }else{
                            history.push("/")
                        }
                    })
                }else{
                    history.push("/")
                }
            }
        )
        return ()=>{
            authUnsubscibe()
        }
    })
    const signOutLogin=()=>{
        auth.signOut()
        .then(()=>{
            console.log("logout success")
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></Link>
                </li>
            </ul>

            <div className="btn-group" style={{ marginLeft: "75%" }}>
                <button  type="button" className="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.fname}
                </button>
                <div className="dropdown-menu">
                    <p className="dropdown-item" onClick={()=>console.log(user)}>ดูข้อมูลส่วนตัว</p>
                    <p className="dropdown-divider"></p>
                    <p className="dropdown-item" onClick={()=>{signOutLogin()}}>ออกจากระบบ</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;