const isEmpty = (string) =>  {
    if(string.trim() === '') return true;
    else return false;
  }
  
  const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  }

const isShort = (string) => {
  if(string.trim().length < 8) return true;
  else return false;
}

exports.validateChangeEmail = (data) => {
  let errors = {};
    if(isEmpty(data.newEmail)) {
      errors.newEmail = 'Email must not be empty'
    } else if(!isEmail(data.newEmail)){
      errors.newEmail = 'Must be a valid email address'
    }

    if(isEmpty(data.currentPassword)) errors.currentPassword = 'Must not be empty'
    if(isShort(data.currentPassword)) errors.currentPassword = 'Must be 8 or more characters'

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateSignupData = (data) => {
    let errors = {};
  
    if(isEmpty(data.email)) {
      errors.email = 'Email must not be empty'
    } else if(!isEmail(data.email)){
      errors.email = 'Must be a valid email address'
    }
  
    if(isEmpty(data.password)) errors.password = 'Must not be empty'
    if(isShort(data.password)) errors.password = 'Must be 8 or more characters'
    if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match'
    if(isEmpty(data.username)) errors.username = 'Must not be empty'

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {{
    let errors = {};

    if(isEmpty(data.email)) {
      errors.email = 'Email must not be empty'
    } else if(!isEmail(data.email)){
      errors.email = 'Must be a valid email address'
    }
    if(isEmpty(data.password)) errors.password = 'Must not be empty'; 

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}}