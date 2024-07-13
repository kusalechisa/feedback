import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // check if user exists or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }

  return errors;
}

/** validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Confirm password does not match...!");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}
 
/** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/** ************************************************* */

/** validate password */
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password is required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have a special character");
  }

  return errors;
}

/** validate username */
function usernameVerify(errors = {}, values) {
  if (!values.username) {
    errors.username = toast.error("Username is required...!");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid Username...!");
  }

  return errors;
}

/** validate email */
function emailVerify(errors = {}, values) {
  if (!values.email) {
    errors.email = toast.error("Email is required...!");
  } else if (values.email.includes(" ")) {
    errors.email = toast.error("Invalid Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address...!");
  }

  return errors;
}
