import Cards from 'react-credit-cards-2';
import React, { useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Box, Grid, TextField, Button, Dialog, DialogContent } from "@mui/material";
import ConfirmacionPago from '../components/products-store/ConfirmacionPago';

function PaymentForm() {

    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focus: ''
    });
    const [modalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleInputFocus = (e) => {
        setState(prevState => ({ ...prevState, focus: e.target.name }));
    }

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
       if (/^\d{0,16}$/.test(value)) {
             handleInputChange(e);
        }
    }

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 4) return;

        if (value.length >= 3) {
            const month = value.slice(0, 2);
            
            if (parseInt(month) < 1 || parseInt(month) > 12) {
                value = '12' + value.slice(2);
            }

            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        handleInputChange({ target: { name: 'expiry', value } });
    };
        
    return (
        <div className='payment-container'>
             <div className='payment-form-containter'>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Grid container spacing={2} sx={{ maxWidth: 400, 
                                '& .MuiInputLabel-root': {
                                fontWeight: 'bold'
                }}}>

                    <Grid size={12} sm={6}>
                            <TextField 
                            name='number' 
                            label='Card number'
                            fullWidth 
                            onChange={handleNumberChange} 
                            onFocus={handleInputFocus}
                            slotProps={{
                                htmlInput: {
                                maxLength: 16,
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                                }
                            }}
                            value={state.number} />
                        </Grid>
                        <Grid size={12} sm={6}>
                            <TextField 
                                name='name'
                                label='Name'
                                fullWidth
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                slotProps={{ htmlInput: { maxLength: 20} }}
                                value={state.name}
                            />
                        </Grid>
                        <Grid size={6} sm={6}>
                            <TextField 
                                name='expiry'
                                label='MM/YY'
                                fullWidth
                                onChange={handleExpiryChange}
                                onFocus={handleInputFocus}
                                value={state.expiry}
                            />
                        </Grid>
                        <Grid size={6} sm={6}>
                            <TextField 
                                name='cvc'
                                label='CVC'
                                fullWidth
                                onChange={handleNumberChange}
                                onFocus={handleInputFocus}
                                slotProps={{ htmlInput: { maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' } }}
                                value={state.cvc}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </div>

            
             <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, maxWidth: 400 }} onClick={() => setModalOpen(true)}>
                        PAGAR
            </Button>

            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogContent>
                    {modalOpen && <ConfirmacionPago setModalOpen={setModalOpen} />}
                </DialogContent>
            </Dialog>
        </div>
        
    );

}

export default PaymentForm;