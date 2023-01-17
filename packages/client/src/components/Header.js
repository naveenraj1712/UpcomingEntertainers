import { Box, Button, Typography } from "@material-ui/core";
import UPLogo from "../assets/logo.svg";

const Header = () => {
    return(
        <Box style={{display: "flex", width: "100%", height: "50px", background: "linear-gradient(to right bottom, #05C033, #02C6C3)"}}>
            <div style={{width: "65px"}}>
            <img src={UPLogo} alt="Upcoming Entertainers" style={{height: "125px", width: "125px", position: "relative", top: "-16px", left: "-28px"}}/>
            </div>
            <Typography component="h1" style={{fontSize: "24px", padding: "5px", marginTop: "2px"}}>Upcoming Entertainers</Typography>
            <Button variant="text" style={{display: "flex", marginLeft: "auto"}}>Login</Button>
            <Button variant="text" style={{marginRight: "10px"}}>Signup</Button>
        </Box>
    )
}

export default Header;