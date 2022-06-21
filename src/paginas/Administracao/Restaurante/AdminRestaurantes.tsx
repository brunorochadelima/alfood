import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdminRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => setRestaurantes(response.data));
  }, []);

  function excluir(restauranteAhSerExcluido: IRestaurante) {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
    .then(() => {
      const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
      setRestaurantes(listaRestaurantes)
    } )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Restaurantes</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>{<Link to={`/admin/restaurantes/${restaurante.id}`}>[Editar]</Link>}</TableCell>
              <TableCell><Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Exluir</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
