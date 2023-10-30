const addData = async (e) => {
  e.preventDefault();
  const { email, password } = inpval;

  // Check for spaces before or after the email address
  if (email.indexOf(" ") !== -1) {
    toast.error('Please enter a valid email address', {
      position: "top-center",
    });
    return;
  }
  
  if (email.length > 30) {
    toast.error('Email address should not exceed 30 characters', {
      position: 'top-center',
    });
    return;
  }

  if (email === "") {
    toast.error('email field is required', {
      position: "top-center",
    });
  } else if (!email.includes("@")) {
    toast.error('plz enter valid email address', {
      position: "top-center",
    });
  } else if (password === "") {
    toast.error('password field is required', {
      position: "top-center",
    });
  } else if (password.length < 5) {
    toast.error('password length should be greater than five', {
      position: "top-center",
    });
  } else {
    const userdata = await getUser(email);
    console.log("userdata", userdata);
    if (userdata) {
      // Verify the user password
      const isPasswordCorrect = await checkPassword(password, userdata.password);
      if (isPasswordCorrect) {
        // Hash the password before storing it in the session storage
        const hashedPassword = await bcrypt.hash(password, 10);
        userdata.password = hashedPassword;

        sessionStorage.setItem("authUser", JSON.stringify(userdata));
        // Check the user role and redirect to the page
        redirectUser(userdata);
      } else {
        toast.error('Invalid login details', {
          position: "top-center",
        });
      }
    } else {
      toast.error('User not found', {
        position: "top-center",
      });
    }
  }
}
