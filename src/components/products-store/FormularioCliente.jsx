import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";


function FormularioCliente() {

  const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur"
 });


  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box sx={{ flexGrow: 1 }} autoComplete="off">
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid size={4}>
           <TextField 
           id="name"
           label="Nombres" 
           variant="outlined" 
           margin='normal' 
           error={!!errors.name}
           helperText={errors.name?.message}
           required 
           fullWidth 
           sx={{
            '& .MuiFormHelperText-root': {
              marginLeft: 0
            }          
           }} 
           {...register("name", { required: 'El campo Nombres es obligatorio' })} />
        </Grid>
        <Grid size={4}>
           <TextField 
           id="lastname" 
           label="Apellidos" 
           variant="outlined" 
           margin='normal'
           error={!!errors.lastname}
           helperText={errors.lastname?.message}
           required 
           fullWidth 
           sx={{
            '& .MuiFormHelperText-root': {
              marginLeft: 0
            }          
          }} 
           {...register("lastname", { required: 'El campo Apellidos es obligatorio' })} />
        </Grid>
        <Grid size={4}>
            <TextField id="email" 
            label="Correo electrónico" 
            variant="outlined" 
            margin='normal' 
            error={!!errors.email}
            helperText={errors.email?.message}
            required 
            fullWidth 
            sx={{
            '& .MuiFormHelperText-root': {
              marginLeft: 0
            }
            }}
            {...register("email", { required: 'El campo Correo electrónico es obligatorio' })} />
        </Grid>
        <Grid size={4}>
            <TextField 
            id="phone" 
            label="Número de teléfono" 
            variant="outlined" 
            margin='normal' 
            error={!!errors.phone}
            helperText={errors.phone?.message}
            required 
            fullWidth 
            sx={{
            '& .MuiFormHelperText-root': {
              marginLeft: 0
            }
            }}

            {...register("phone", { required: 'El campo Número de teléfono es obligatorio' })} />
        </Grid>
      </Grid>
    </Box>
    </form>
  );
}

export default FormularioCliente;