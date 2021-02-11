import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom'
import {auth,firestore} from '../firebase/config'
import {useHistory} from 'react-router-dom'
const Login = () => {
  const [data,setData]=useState({email:"",password:""})
  const userRef = useRef(firestore.collection("user")).current;
  const history = useHistory();
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const authUnsubscribe = auth.onAuthStateChanged(
      (firebaseUser)=>{
        if(!!firebaseUser){
          setLoading(true)
          userRef.doc(firebaseUser.uid).onSnapshot(doc=>{
            if(doc.data().user_group==='admin'){
              history.push("/leavelist")
            }else{
              history.push("/user")
            }
          })
        }
      }
    )

    return ()=>{
      authUnsubscribe();
    }
  })
  const onEmailLogin=(e)=>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(data.email,data.password)
    .then(result=>{
    }).catch(err=>{
      alert(err.code)
    })
  }

    return (
      loading ? (
        <div className="spinner-border mx-auto" style={{width:"3rem",height:"3rem",top:"50%",left:"46%",marginTop:"-50px",marginLeft:"-100px",position:'fixed'}} role="status"></div>
      ) : 
      <div className="row mt-5" align="center">
          <div className="col-md-12">
          <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Abzolute</b></a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form action="../../index3.html" method="post">
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={e=>{setData({...data,password:e.target.value})}} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          
          {/* /.col */}
          <div className="col-12">
             
            <button  className="btn btn-primary btn-block" onClick={(e)=>{onEmailLogin(e)}}>Sign In </button>
          </div>
          {/* /.col */}
        </div>
      </form>
      {/* /.social-auth-links */}
      <p className="mb-1">
        <Link to ="forgot-password.html">I forgot my password</Link>
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>
          </div>
      </div>
    );
};

export default Login;