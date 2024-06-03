import React from 'react'
import { Button, Grid } from '@mui/material'

interface Dailpadprops {
    onButtonClick: (value: string) => void;
}
const Dialpad: React.FC<Dailpadprops> = ({onButtonClick}) => {
    const Buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    const handleButtonClick = (value: string) => {
        onButtonClick(value);
    }
  return (
    <Grid container spacing={1}>
        {Buttons.map((button) => (
            <Grid key={button} item xs={3}>
                <Button 
                    variant='contained'
                    onClick={() => handleButtonClick(button)}
                    fullWidth
                    size='large'
                    // color={button === '=' ? 'primary' : 'default'}
                >
                    {button}
                </Button>
            </Grid>

        ))}
    </Grid>
  )
}

export default Dialpad
