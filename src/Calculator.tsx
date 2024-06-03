import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import Dialpad from './DialPad';
import './Calculator.css';

interface CalculatorForm {
    expression: string;
}

const Calculator = () => {
    const [result, setResult] = useState<string | null>(null);
    const { register, handleSubmit, reset, getValues, formState } = useForm<CalculatorForm>(); 
    const { errors } = formState;

    const onSubmit = (data: CalculatorForm) => {
        try {
            const evalResult = eval(data.expression);
            setResult(evalResult.toString());
        } catch (error) {
            setResult('Error');
        }
    };

    const handleButtonClick = (value: string) => {
        const expression = getValues('expression') || '';
        reset({ expression: `${expression}${value}` });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        label="Enter"
                        variant="outlined"
                        fullWidth
                        value={getValues('expression') || ''}
                        InputProps={{ readOnly: true }}
                        {...register('expression', { required: true})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Dialpad onButtonClick={handleButtonClick} />
                </Grid>
                {result && (
                    <Grid item xs={12}>
                        <TextField
                            label="Result"
                            value={result}
                            disabled
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default Calculator;
