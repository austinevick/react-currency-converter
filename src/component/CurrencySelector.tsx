
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputBase } from '@mui/material';
import { useResize } from '../useResize';


interface CurrencyProps {
    currencies: string[]
    currency: string
    onChange: (e: string) => void
}


export const CurrencySelector = ({ currencies, currency, onChange }: CurrencyProps) => {
    const { isVisible } = useResize(735)


    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: isVisible ? '300px' : '150px',
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),

            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }));



    return (
        <Select label="currencies" value={currency}
            id="currencies" onChange={(e: SelectChangeEvent) => {
                onChange(e.target.value)

            }} input={<BootstrapInput />}>
            {currencies.map((currency) => (
                <MenuItem

                    key={currency} value={currency}>{currency}</MenuItem>
            ))}
        </Select>
    )
}
