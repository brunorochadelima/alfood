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
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../../api/api";
import IPrato from "../../../../interfaces/IPrato";
import IRestaurante from "../../../../interfaces/IRestaurante";

export default function AdminPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  
  useEffect(() => {
    api
      .get("pratos/")
      .then((response) => setPratos(response.data));
  }, []);

  function excluir(pratoAhSerExcluido: IPrato) {
    api.delete(`pratos/${pratoAhSerExcluido.id}/`)
    .then(() => {
      const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
      setPratos(listaPratos)
    } )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>[<a href={prato.imagem} target="_blank"  rel="noreferrer" >Ver imagem</a>]</TableCell>
              <TableCell>{<Link to={`/admin/pratos/${prato.id}`}>[Editar]</Link>}</TableCell>
              <TableCell><Button variant="outlined" color="error" onClick={() => excluir(prato)}>Exluir</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
