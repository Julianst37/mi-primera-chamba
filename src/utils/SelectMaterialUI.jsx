import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function SelectMaterialUI({ idForTextField, fieldName, data, defaultOption, onChange, isRequired = false }) 
{
    return (
        <TextField
          id={idForTextField}
          select
          label= {fieldName}
          onChange={onChange}
          defaultValue={defaultOption}
          fullWidth
          margin='normal'
          required={isRequired}
        >
          <MenuItem value="" disabled>
            {defaultOption}
          </MenuItem>
          {data.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    );

}

export default SelectMaterialUI;