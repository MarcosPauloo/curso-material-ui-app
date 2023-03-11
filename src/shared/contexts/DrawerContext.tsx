import { createContext, useContext, useState, useCallback } from "react";

interface IDrawerContextData {
    drawerOptions: IDrawerOptions[];
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[])=>void;
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () =>{
    return useContext(DrawerContext)
}

interface IAppDrawerOpen{
    children : React.ReactNode
}

interface IDrawerOptions{
    path: string;
    label: string;
    icon: string;
}

export const DrawerProvider: React.FC<IAppDrawerOpen> = ({children}) =>{
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    const handleDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[])=>{
        setDrawerOptions(newDrawerOptions);
    },[]);

    return(
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen,drawerOptions, setDrawerOptions: handleDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}