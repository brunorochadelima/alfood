import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function FormRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    axios.post("http://localhost:8000/api/v2/restaurantes/",
      {
        nome: nomeRestaurante
      })

      .then(() => {
        alert("Restaurante cadstrado")
      })

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
  )

}
