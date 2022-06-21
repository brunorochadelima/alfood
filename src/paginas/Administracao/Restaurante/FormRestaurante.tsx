import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`
        )
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros.id]);

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Atualizado");
        });
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Cadastrado");
        });
    }
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        label="Nome do restaurante"
        variant="standard"
      />
      <Button variant="outlined" type="submit">
        Salvar
      </Button>
    </form>
  );
}
