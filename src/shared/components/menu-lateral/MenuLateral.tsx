import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, Icon, ListItemText, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";

interface IMenuLateral {
    children: React.ReactNode
}

interface IListItemLinkProps{
    label:string;
    to:string;
    icon:string;
    onClick: (()=>void )| undefined;
    children: React.ReactNode;
}

const ListItemLink: React.FC<IListItemLinkProps>= ({label, to, icon, onClick})=>{
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({path:resolvedPath.pathname, end:false}) //vendo se a opção ta selecionada ou não

    const handleClick = ()=>{
        navigate(to)
        onClick?.(); //se não for undefined ele executa
    }

    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}

export const MenuLateral : React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    
    const {toggleTheme} = useAppThemeContext();
    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
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
                            {drawerOptions.map(drawerOption=>(
                                <ListItemLink 
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    label={drawerOption.label}
                                    to={drawerOption.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                >
                                </ListItemLink>
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <List component='nav'>
                        <   ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Mudar tema"/>
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown? 0: theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}