 import useFetch from '../../utils/useFetch';
import { useState } from 'react';
import SelectMaterialUI from '../../utils/SelectMaterialUI';
import { Box, Grid, TextField } from '@mui/material';

function DatosEnvio() {
  const { data: departments } = useFetch('https://api-colombia.com/api/v1/Department');

  const [departmentId, setDepartmentId] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);

    const handleCities = (value) => {
    setSelectedCity(null);
    setDepartmentId(value);
  }

  const { data: cities } = useFetch(departmentId ? `https://api-colombia.com/api/v1/Department/${departmentId}/cities` : null);

  return (
     <Box sx={{ flexGrow: 1 }} autoComplete="off">
        <Grid container spacing={2}>
          <Grid size={4}>
                <SelectMaterialUI
                idForTextField="departments" fieldName="Departamento" 
                data={departments ? departments.sort((a, b) => a.name.localeCompare(b.name)).map(department => ({ value: department.id, label: department.name })) : []} 
                defaultOption= "Seleccione un departamento" 
                onChange={(event) => handleCities(event.target.value)} 
                isRequired={true}
                />
          </Grid>
          <Grid size={4}>
                <SelectMaterialUI
                idForTextField="cities" fieldName="Ciudad" 
                data={cities ? cities.sort((a, b) => a.name.localeCompare(b.name)).reduce((acc, city) => [...acc, { value: city.id, label: city.name }], []) : []} 
                defaultOption= "Seleccione una ciudad" 
                onChange={(event) => setSelectedCity(event.target.value)} 
                isRequired={true}
                />
          </Grid>
          <Grid size={4}>
              <TextField id="address" label="Dirección de envío" variant="outlined" fullWidth margin='normal'  />
          </Grid>
        </Grid>
     </Box>
  );
}

export default DatosEnvio;
 
 
 