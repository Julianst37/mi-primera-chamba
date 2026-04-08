import userProfile from "../../utils/usuario";
import ModalPersonalizada from "../../utils/ModalPersonalizada";
import { useContext, useEffect, useState } from 'react';
import { UsuarioContext } from './UsuarioContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Grid, TextField } from "@mui/material";
import boutiqueLogo from './imagenes/boutique.png'

function Login({ show, setShow }) {
    const navigate = useNavigate();
    const { login } = useContext(UsuarioContext);

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [incorrecto, setIncorrecto] = useState(false);
    const { name, username, password, avatar } = userProfile;
    

    useEffect(() => {
        if (incorrecto) {
        setTimeout(() => {
            setIncorrecto(false);
            setShow(false);
            navigate('/');
        }, 1000);
        }
    }, [incorrecto, navigate]);

    const handleLogin = () => {
        if (usernameInput === username && passwordInput === password) {
        setShow(false);
        setUsernameInput("");
        setPasswordInput("");
        login(userProfile);
        } else {
        setIncorrecto(true);
        }
    };
    

    return (
        <>
            <ModalPersonalizada
                    show={show}
                    onHide={() => { setShow(false); setIncorrecto(false); }}
                    title="Iniciar sesión"
                    acciones={
                        <button className="btn btn-primary" onClick={handleLogin}>
                            Confirmar
                        </button>
                    }
                >
                   <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }} autoComplete="off">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={boutiqueLogo} alt="Boutique Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Username"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {incorrecto && <p style={{ color: 'red' }}>Usuario o contraseña incorrectos</p>}
                   </Box>
            </ModalPersonalizada>
        </>
          
    );
}

export default Login;