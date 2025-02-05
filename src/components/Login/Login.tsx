import React, {useState} from "react";

export const Login = (props:any) => {
  
    interface LoginFormState {
        uId: string;
        pwd: string;
        uIdError: string;
        pwdError: string;
        validationError: string;
    }

    const [isUValid, setIsUValid] = useState(true);
    const [isPValid, setIsPValid] = useState(true);
    const [isFocused, setIsFocused] = React.useState(false);
    const borderColor = isFocused ? 'none' : 'none';

    const handleFocus = () => {
        setIsFocused(true);
        setIsUValid(true);
    };

    const handleBlur = () => {
        let uIdError = "";
        let pwdError = "";
        let validationError = "";
        setIsFocused(false);
        setIsUValid(true);
        setIsPValid(true);
        setFormState({...formState, uIdError, pwdError, validationError});
    };

    const [formState, setFormState] = useState<LoginFormState>({
        uId: "",
        pwd: "",
        uIdError: "",
        pwdError: "",
        validationError: "",
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
        
        let uIdError = "";
        let pwdError = "";
        let validationError = "";
        setFormState({...formState, uIdError, pwdError, validationError});
        setIsUValid(true);
        setIsPValid(true);

        if (!formState.uId)
        {
            uIdError = "Username is required.";
            setIsUValid(false);
        }

        if (!formState.pwd)
        {
            pwdError = "Password is required.";
            setIsPValid(false);
        }

        if (uIdError || pwdError)
        {
            setFormState({...formState, uIdError, pwdError, validationError});
        }
        else // Form fields are valid
        {
            // This is where WE NEED TO VALIDATE USER ID from the database!!!
            uIdError = "";
            pwdError = "";   
            setIsUValid(true);
            setIsPValid(true);
            if (formState.uId === "lol" && formState.pwd === "lol")
            {
                setFormState({...formState, uIdError, pwdError, validationError});
                console.log("Logged in successfully!");
            }
            else
            {
                validationError = "Invalid Username or Password";
                setFormState({...formState, uIdError, pwdError, validationError});
            }
        }
    };


    return (
        <div className = "auth-form-container">
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

            <h2 className="login">Login</h2>
            
            <form className = "login-form" onSubmit = {handleSubmit}>

                {/* <label htmlFor = "uId">Username</label> */}
                <input className = {isUValid ? "" : "invalid"} value = {formState.uId} onChange = {handleInputChange} type = "text" placeholder = "Enter Username" id = "uId" name = "uId" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}/>
                {formState.uIdError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.uIdError}</span>}
                
                {/* <label htmlFor = "password">Password</label> */}
                <input className = {isPValid ? "" : "invalid"} value = {formState.pwd} onChange = {handleInputChange} type = "password" placeholder = "Enter Password" id = "pwd" name = "pwd" onFocus={handleFocus} onClick={handleBlur} style={{ borderColor }}></input>
                {formState.pwdError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.pwdError}</span>}

                <button>Login</button>
                {formState.validationError && <span style={{color: "red", fontWeight: "bold", fontSize: "medium"}}>{formState.validationError}</span>}
            </form>
            <button className = "link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register</button>
        </div>
    )
}