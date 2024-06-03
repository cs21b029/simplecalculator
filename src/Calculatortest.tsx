import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Calculator.css'

const Calculator: React.FC = () => {
  const { register, setValue, watch } = useForm<{ display: string }>({
    defaultValues: { display: '0' },
  });

  const display = watch('display');

  const handleButtonClick = (value: string) => {
    if (display === '0' && value !== '.') {
      setValue('display', value);
    } else {
      setValue('display', display + value);
    }
  };

  const handleOperatorClick = (operator: string) => {
    setValue('display', display + ' ' + operator + ' ');
  };

  const handleClear = () => {
    setValue('display', '0');
  };

  const handleEquals = () => {
    try {
      let sanitizedExpression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      const result = eval(sanitizedExpression);
      setValue('display', result.toString());
    } catch (error) {
      setValue('display', 'Error');
    }
  };

  return (
    <div className="cal">
      <Box sx={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
      <TextField
        variant="outlined"
        value={display}
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 2, marginTop: '20px' }}
        {...register('display')}
      />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClear}
          >
            C
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleOperatorClick('%')}
          >
            %
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleOperatorClick('÷')}
          >
            ÷
          </Button>
        </Grid>
        {['7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((label) => (
          <Grid item xs={label === '0' ? 6 : 3} key={label}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (label === '=') handleEquals();
                else if (['+', '-', '×', '÷', '%'].includes(label)) handleOperatorClick(label);
                else handleButtonClick(label);
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
};

export default Calculator;
