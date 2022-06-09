import React, { ChangeEvent, useEffect, useState }  from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userRegistration } from "../../services/Services";
import UserRegisterDTO from "../../models/UserRegisterDTO";
import { Grid, Typography, Button, InputLabel, Select, Box, TextField, FormControl } from "@mui/material";
import './RegisterUser.css';

function RegisterUser () {

    let navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState<String>("")

    const [userRegisterDTO, setUserRegisterDTO] = useState<UserRegisterDTO>(
        {   
            email: "",
            name: "",
            password: "",
            type: "",
            address: ""
          
        }
    );

    const [userResult, setUserResult] = useState<UserRegisterDTO>(
        {
            email: "",
            name: "",
            password: "",
            type: "",
            address: ""
        }
    );

    useEffect(() => {

        if(userResult.email?.includes("@")){
            navigate('/login');
        }

    }, [userResult, navigate]);

    function confirmPasswordHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmPassword(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setUserRegisterDTO({
            ...userRegisterDTO,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){

        e.preventDefault();
        
        if(confirmPassword === userRegisterDTO.password){
            try {
                await userRegistration(`/api/Users`, userRegisterDTO, setUserResult)
                alert('Usuario cadastrado com sucesso')
            } catch (error) {
                alert(error)
                alert('erro no formulário, tente novamente!')
            }

        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='register-user-background'>
            <Grid item xs={6} className='img-register-user'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='cadastre-se'>Cadastre-se</Typography>
                        
                        <TextField
                            value={userRegisterDTO.email}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='email' label='Email' variant='outlined' color="success" name='email' margin='normal' type='email' fullWidth />

                        <TextField
                            value={userRegisterDTO.name}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='name' label='Nome' variant='outlined' color="success" name='name' margin='normal' fullWidth />
                        
                        <TextField
                            value={userRegisterDTO.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password' label='Senha' variant='outlined' color="success" name='password' margin='normal' type='password' fullWidth />
                        
                        
                        <TextField
                            value={confirmPassword} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmPasswordHandle(e)}
                            id='confirmPassword' label='Confirmar Senha' variant='outlined' color="success" name='confirmPassword' margin='normal' type='password' fullWidth />
                        
                        <FormControl 
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            variant="outlined" color="success" fullWidth>
                            <InputLabel htmlFor="outlined-age-native-simple">Tipo de Usuário</InputLabel>
                            <Select
                            value={userRegisterDTO.type}
                            native
                            label="Tipo de Usuário"
                            inputProps={{
                                name: 'type',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value="REGULAR">Regular</option>
                            <option value="VULNERABILITY">Vulnerabilidade</option>
                            </Select>
                        </FormControl>

                        <TextField
                            value={userRegisterDTO.address}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='address' label='Endereço' variant='outlined' color="success" name='address' margin='normal' fullWidth />
                        
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Button type='submit' variant='contained' className="btn-cadastrar">
                                        Cadastrar
                                </Button>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default RegisterUser;