module.exports = function validate(input) {
  if (input.name) {
    if (
      input.email &&
      input.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      if (input.password) {
        if (input.confirmPassword) {
          if (input.password === input.confirmPassword) {
            if (
              input.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
              )
            ) {
              return { success: true };
            } else {
              return { success: false, message: "Password should contain 8 chars, 1 lowercase, 1 uppercase, 1 digit and one of [!@#$%^&*]" };
            }
          } else {
            return { success: false, message: "Passwords do not match." };
          }
        } else {
          return { success: false, message: "Confirm Password is not entered" };
        }
      } else {
        return { success: false, message: "Password is not entered" };
      }
    } else {
      return { success: false, message: "Invalid email" };
    }
  } else {
    return { success: false, message: "Name is not entered" };
  }
};
