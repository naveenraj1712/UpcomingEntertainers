import { Button, FormControl, TextField } from "@material-ui/core";
import { useState } from "react";

const LoginPage = () => {
    const [userCredentials, setUserCredentials] = useState({userName: '', password: ''});
    const onChangeInput = (e) => {
        console.log(e.target);
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }
    return (
        <FormControl variant="standard">
            <TextField value = {userCredentials.userName} label="User Name" name="userName" onChange={onChangeInput}/>
            <TextField value = {userCredentials.password} label="Password" name="password" onChange={onChangeInput}/>
            <Button variant="submit" onClick={()=>{console.log("Logged In")}}>Login</Button>
        </FormControl>
    )
}

export default LoginPage;