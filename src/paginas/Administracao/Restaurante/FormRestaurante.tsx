import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link as RouterLink } from "react-router-dom";

export default function FormRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      api
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros.id]);

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (parametros.id) {
      api
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Atualizado");
        });
    } else {
      api
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Cadastrado");
        });
    }
  }

  return (
    <>
          <Typography component="h1">Formulário de Restaurante</Typography>
          <Box component="form" onSubmit={aoSubmeterForm}>
            <TextField
              value={nomeRestaurante}
              onChange={(evento) => setNomeRestaurante(evento.target.value)}
              label="Nome do restaurante"
              variant="standard"
              fullWidth
              required
            />
            <Button sx={{ marginTop: 2 }} variant="outlined" type="submit">
              Salvar
            </Button>
          </Box>
    </>
  );
}
