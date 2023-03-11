import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, Icon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

interface IMenuLateral {
    children: React.ReactNode
}

export const MenuLateral : React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            <Drawer variant={"permanent"}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
                    <Box 
                        width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center"
                    >
                        <Avatar 
                            sx={{height: theme.spacing(12), width: theme.spacing(12)}} //theme.spacing utiliza-se do tema para poder fazer as medidas, as quais sao multiplicadas por 8, entao nesse caso 12*8
                            alt="marcos paulo" 
                            src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png"
                        />
                    </Box>

                    <Divider/>

                    <Box flex={1}>
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Página inicial'/>
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}