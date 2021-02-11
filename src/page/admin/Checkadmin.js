import React,{useEffect, useRef} from 'react';
import {auth,firestore} from '../../firebase/config'
import { useHistory } from 'react-router-dom'
export default function Checkadmin() {
    
    const history = useHistory();
    const ref = useRef(firestore.collection("user")).current;
    useEffect(()=>{
        const authUnsubscibe = auth.onAuthStateChanged((firebaseUser)=>{
            if(!!firebaseUser){
                ref.doc(firebaseUser.uid).onSnapshot(doc=>{
                    if(doc.data()){
                        if(doc.data().user_group!=='admin' ){
                            if(doc.data().user_group!=='hr'){
                                history.push("/user")
                            }
                        }
                    }
                })
            }else{
                history.push("/")
            }
        })
        return ()=>{
            authUnsubscibe();
        }
    },[ref])
    return (
        <div>
            
        </div>
    )
}
