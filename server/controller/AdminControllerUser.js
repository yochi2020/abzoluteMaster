const admin = require('firebase-admin')
const serviceAccount = require("./path/to/abzolute-leave-firebase-adminsdk-bn6m7-69fa217661.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://abzolute-leave.firebaseio.com"
  });




  const registerUser =(req,res)=>{
    admin.auth().getUser("U1vsRxm6AfWQLSvj9i3mbisxpUo2")
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.table(`Successfully fetched user data:  ${JSON.stringify(userRecord)}`);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
    
    res.send("5555")
  }


  module.exports ={registerUser}