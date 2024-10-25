import MyTable from '@/Components/MyTable';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home(){
    return(
        <>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>                        
                    Sistema: Cadastro de Contatos
                </Typography>
                </Toolbar>
            </AppBar>
            <MyTable/>
        
        </>
    )
}