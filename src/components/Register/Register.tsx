import React, {useState} from "react";

export const Register = (props : any) => {
    
    interface RegisterFormState {
        fName: string;
        lName: string;
        email: string;
        uId: string;
        pwd: string;
        cpwd: string;
        fNameError: string;
        lNameError: string;
        emailError: string;
        uIdError: string;
        pwdError: string;
        cpwdError: string;
    }

    const [isFValid, setIsFValid] = useState(true);
    const [isLValid, setIsLValid] = useState(true);
    const [isEValid, setIsEValid] = useState(true);
    const [isUValid, setIsUValid] = useState(true);
    const [isPValid, setIsPValid] = useState(true);
    const [isCValid, setIsCValid] = useState(true);
    const [isFocused, setIsFocused] = React.useState(false);
    const borderColor = isFocused ? 'none' : 'none';

    const handleFocus = () => {
        setIsFocused(true);
        setIsFValid(true);
        setIsLValid(true);
        setIsEValid(true);
        setIsUValid(true);
        setIsPValid(true);
        setIsCValid(true);
        let fNameError= "";
        let lNameError= "";
        let emailError= "";
        let uIdError= "";
        let pwdError= "";
        let cpwdError= "";
        setFormState({...formState, fNameError, lNameError, emailError, uIdError, pwdError, cpwdError});
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const [formState, setFormState] = useState<RegisterFormState>({
        fName: "",
        lName: "",
        email: "",
        uId: "",
        pwd: "",
        cpwd: "",
        fNameError: "",
        lNameError: "",
        emailError: "",
        uIdError: "",
        pwdError: "",
        cpwdError: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let duplicatUid = "lol";
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

        let fNameError= "";
        let lNameError= "";
        let emailError= "";
        let uIdError= "";
        let pwdError= "";
        let cpwdError= "";
        setFormState({...formState, fNameError, lNameError, emailError, uIdError, pwdError, cpwdError});

        if (!formState.fName)
        {
            fNameError = "First Name is required";
            setIsFValid(false);
        }

        if (!formState.lName)
        {
            lNameError = "Last Name is required.";
            setIsLValid(false);
        }

        if (!formState.email)
        {
            emailError = "Email is required.";
            setIsEValid(false);
        }
        else if (!/\S+@\S+\.\S+/.test(formState.email)) 
        {
            emailError = "Please enter Email in valid format: prefix@domain.com";
            setIsEValid(false);
        }

        if (!formState.uId)
        {
            uIdError = "Username is required.";
            setIsUValid(false);
        }
        else if (formState.uId === duplicatUid) // Logic to check for duplicate user id in the database
        {
            uIdError = "Username already exists.";  
            setIsUValid(false); 
        }

        if (!formState.pwd || !passwordRegex.test(formState.pwd))
        {
            console.log(passwordRegex.test(formState.pwd) + " " + formState.pwd);
            if (!formState.pwd)
                pwdError = "Password is required.";
            else if (!passwordRegex.test(formState.pwd))
                pwdError = "Please enter a valid password.";
            setIsPValid(false);
        }
        else
        {
            if (!formState.cpwd)
            {
                cpwdError = "Please renter password to confirm.";
                setIsCValid(false);
            }
            else
            {
                if (formState.pwd !== formState.cpwd)
                {
                    cpwdError = "Passwords do not match!";
                    setIsCValid(false);
                }
            }
            
        }

        if (fNameError || lNameError || emailError || uIdError || pwdError || cpwdError)
        {
            setFormState({...formState, fNameError, lNameError, emailError, uIdError, pwdError, cpwdError});
        }
        else
        {
            // Send information to database and go to home page
            setIsCValid(true);
            console.log("Account created successfully");
        }
    };

    return (
        <div className ="auth-form-container">
            <button className = "back" onClick={() =>props.onFormSwitch('start')}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back
            </button>

            <h2>Create Account</h2>
            <form className = "register-form" onSubmit = {handleSubmit}>
                {/* <label htmlFor = "fName">First Name</label> */}
                <input className = {isFValid ? "" : "invalid"} value = {formState.fName} onChange = {handleInputChange} type = "text" placeholder = "Enter First Name" id = "fName" name = "fName" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}/>
                {formState.fNameError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.fNameError}</span>}

                {/* <label htmlFor = "lName">Last Name</label> */}
                <input className = {isLValid ? "" : "invalid"} value = {formState.lName} onChange = {handleInputChange} type = "text" placeholder = "Enter Last Name" id = "lName" name = "lName" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}/>
                {formState.lNameError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.lNameError}</span>}

                {/* <label htmlFor = "email">Email</label> */}
                <input className = {isEValid ? "" : "invalid"} value = {formState.email} onChange = {handleInputChange} type = "text" placeholder = "Enter Email address" id = "email" name = "email" title="Email format: prefix@domain.com" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}/>
                {formState.emailError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.emailError}</span>}

                {/* <label htmlFor = "UserId">Username</label> */}
                <input className = {isUValid ? "" : "invalid"} value = {formState.uId} onChange = {handleInputChange} type = "text" placeholder = "Enter Username" id = "uId" name = "uId" title="Username should be unique" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}/>
                {formState.uIdError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.uIdError}</span>}

                {/* <label htmlFor = "password">New Password</label> */}
                <input className = {isPValid ? "" : "invalid"} value = {formState.pwd} onChange = {handleInputChange} type = "password" placeholder = "Enter Password" id = "pwd" name = "pwd" title="Your password should be at least 8 characters long and include a combination of uppercase and lowercase letters, numbers, and special characters." onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}></input>
                {formState.pwdError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.pwdError}</span>}

                {/* <label htmlFor = "password">Confirm Password</label> */}
                <input className = {isCValid ? "" : "invalid"} value = {formState.cpwd} onChange = {handleInputChange} type = "password" placeholder = "Confirm Password" id = "cpwd" name = "cpwd" ></input>
                {formState.cpwdError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.cpwdError}</span>}

                <button>Create Account</button>
            </form>
            <button className = "link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login</button>
        </div>
    )
}