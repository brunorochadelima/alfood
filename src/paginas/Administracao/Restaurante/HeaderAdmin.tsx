import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Link,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

import React from "react";

export default function HeaderAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ marginTop: 2 }}>
        <Paper sx={{ p: 2 }}>
          {/* Aqui vai conteudo dos filhos */}
          <Outlet/>
          
          </Paper>
      </Container>
    </>
  );
}
