document.addEventListener("DOMContentLoaded", function(event) {


  // check authentication
  if (blockstack.isUserSignedIn()){
    var profile = blockstack.loadUserData().profile
      showProfile(profile)
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData){
      window.location = window.location.origin
    })
  }

  function showProfile(profile){
    var person = new blockstack.Person(profile)
    document.getElementById('username').innerHTML = person.name() ? person.name() : "No Name"
    document.getElementById('given-name').innerHTML = person.givenName() ? person.givenName() : "No given name"
    document.getElementById('family-name').innerHTML = person.familyName() ? person.familyName() : "No family name"
    document.getElementById('description').innerHTML = person.description() ? person.description() : "No description"

    if (person.avatarUrl()){
      document.getElementById('avatar-url').setAttribute('src', person.avatarUrl())
    }
    console.log(person.verifiedAccounts())//not working i dont know why
    // document.getElementById.('verified-accounts').innerHTML = person.verifiedAccounts() ? person.verifiedAccounts() : "No accounts verified"

    document.getElementById('address').innerHTML = person.address() ? person.address() : "No address"
    document.getElementById('birthdate').innerHTML = person.birthDate() ? person.birthDate() : "No birthdate"
    document.getElementById('connections').innerHTML = person.connections() ? person.connections() : "No connections"
    document.getElementById('organizations').innerHTML = person.organizations() ? person.organizations() : "No organizations"

    //personLegacy.js
  }
})
