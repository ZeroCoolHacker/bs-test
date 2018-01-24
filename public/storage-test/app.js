document.addEventListener("DOMContentLoaded", function(event) {
  //check authentication
  if (blockstack.isUserSignedIn()){
    var profile = blockstack.loadUserData().profile
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData){
      window.location = window.location.origin
    })
  }
  //Lets play with the storage
  //play with storage
  const STORAGE_FILE = 'mytasks.task'
  const encrypt = true
  const decrypt = true

  //add events to the controls
  document.getElementById('save').addEventListener('click', function(event) {
    event.preventDefault()
    let file = document.getElementById('save-file-name').value
    let content = document.getElementById('content-to-be-saved').value
    let msg = `save click event: file name to be saved is ${file} with content ${content}`
    console.log(msg)
    // create the file
    blockstack.putFile(file, content, encrypt).then((res) => {
      document.getElementById('error').innerHTML += `Saved File. :${res} <br>`
    }, (err) => {
      document.getElementById('error').innerHTML += `Could not save file:${err}`
    })
  })

  document.getElementById('read').addEventListener('click', function(event) {
    event.preventDefault()
    let file = document.getElementById('read-file-name').value
    blockstack.getFile(file, decrypt)
    .then((content) => {
      if(content != null){
        document.getElementById('file-content').innerHTML = content
        document.getElementById('error').innerHTML += "No errors"
      }
      else{
        document.getElementById('error').innerHTML = "Could not find the file"
      }
    },(err) => {
      document.getElementById('error').innerHTML = err
    }) //end then
  })

  document.getElementById('open-bucket').addEventListener('click', function(event) {
    let user_data = blockstack.loadUserData()
    let privKey = user_data.appPrivateKey
    let hubUrl = user_data.hubUrl
    let msg = `priv : ${privKey} || hub: ${hubUrl}`
    console.log(msg)
    document.getElementById('error').innerHTML = msg
    //load the bucket index
    blockstack.getAppBucketUrl(hubUrl, privKey).then((bucketcontent) => {
      document.getElementById('bucket-index').innerHTML = bucketcontent
    }, (err) => {
      document.getElementById('error').innerHTML = `Could not get the bucket url: Error: ${err}`
    })
  })

}) // end of DOMContentLoaded
