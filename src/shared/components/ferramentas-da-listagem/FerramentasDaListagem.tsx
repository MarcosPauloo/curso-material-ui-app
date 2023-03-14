import {Box, TextField, Button, Paper, Icon, InputAdornment} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Environment } from '../../environment';

interface IFerramentasDaListagemProps{
    children?: React.ReactNode;
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string)=>void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca='', mostrarInputBusca= false, aoMudarTextoDeBusca, textoBotaoNovo="Novo", mostrarBotaoNovo=true, aoClicarEmNovo
}) =>{
    const theme = useTheme();

    return(
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper} 
        >
            
            {mostrarInputBusca && (
                <TextField
                size='small'
                value={textoDaBusca}
                onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                placeholder={Environment.INPUT_DE_BUSCA}
                InputProps={
                    {
                        startAdornment:(
                            <InputAdornment
                                position='start'
                            >
                                <Icon>search</Icon>
                            </InputAdornment>
                        )
                    }
                }
                />
                )
            }

           {mostrarBotaoNovo && ( 
                <Box flex={1} display='flex' justifyContent='end'>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={aoClicarEmNovo}
                        disableElevation
                        endIcon={<Icon>add</Icon>}
                    >{textoBotaoNovo}</Button>
                </Box>
            )}
        </Box>
    )
}