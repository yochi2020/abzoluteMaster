import React,{useEffect} from 'react';
import {auth,firestore} from '../../firebase/config'
import { useHistory } from 'react-router-dom'
export default function Checkuser() {
    const history = useHistory();
    const ref = firestore.collection("user");
    useEffect(()=>{
        
        const authUnsubscibe = auth.onAuthStateChanged((firebaseUser)=>{
            if(!!firebaseUser){
                ref.doc(firebaseUser.uid).onSnapshot(doc=>{
                    if(doc.data()){
                        if(doc.data().user_group!=='employee'){
                            history.push("/leavelist")
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
