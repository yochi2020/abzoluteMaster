const axios = require('axios')
const qs = require('qs')
const sendDisAllowed =  (req,res)=>{

    if(req.params.allow==='notallowed'){
        axios({
            method:'post',
            url:'https://notify-api.line.me/api/notify',
            data:qs.stringify({ message: 'ไม่อนุมัติการลา  ของคุณ '+ req.params.fullName}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'Bearer saUKgFSkcrkTGOB9Oc6iiym8ZRcF6OJKEpuYUTAoC4F'
            },
              
        })
        .then(()=>{
            axios({
                method:'post',
                url:'https://notify-api.line.me/api/notify',
                data:qs.stringify({ message:  "หมายเหตุ "+req.params.reason}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':'Bearer saUKgFSkcrkTGOB9Oc6iiym8ZRcF6OJKEpuYUTAoC4F'
                },
                  
            })
            .then(()=>{
                
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }
    if(req.params.allow==='allow'){
        axios({
            method:'post',
            url:'https://notify-api.line.me/api/notify',
            data:qs.stringify({ message: req.params.reason +"  คุณ "+ req.params.fullName}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                
                'Authorization':'Bearer saUKgFSkcrkTGOB9Oc6iiym8ZRcF6OJKEpuYUTAoC4F'
            },
              
        })
        .then(()=>{
            axios({
                method:'post',
                url:'https://notify-api.line.me/api/notify',
                data:qs.stringify({ message: 'อนุมัติการลาแล้ว' }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    
                    'Authorization':'Bearer saUKgFSkcrkTGOB9Oc6iiym8ZRcF6OJKEpuYUTAoC4F'
                },
                  
            })
            .then(()=>{
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }
    
}



module.exports = {sendDisAllowed}

