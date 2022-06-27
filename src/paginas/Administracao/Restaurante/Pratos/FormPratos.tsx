import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect} from "react";
import api from "../../../../api/api";
import IRestaurante from "../../../../interfaces/IRestaurante";
import ITag from "../../../../interfaces/ITag";


export default function FormPrato() {
  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("")
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState("")
  const [imagem, setImagem] = useState<File | null> (null)

  useEffect(() => {
   api.get<{ tags: ITag[]}>('tags/')
   .then(resposta => setTags(resposta.data.tags))
   api.get<IRestaurante[]>('restaurantes/')
   .then(resposta => setRestaurantes(resposta.data))
  }, [])

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
  }

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
     if(evento.target.files?.length) {
       setImagem(evento.target.files[0])
     } else {
      setImagem(null)
     }
  }

  return (
      <Box component="form" onSubmit={aoSubmeterForm}>
      <Typography component="h1">Formulário de Pratos</Typography>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do prato"
          variant="standard"
          fullWidth
          required
        />
       
       <TextField
          value={descricaoPrato}
          onChange={(evento) => setDescricaoPrato(evento.target.value)}
          label="Descrição do prato"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />

        <FormControl fullWidth margin="dense">
         <InputLabel id="tag">Tag</InputLabel>
         <Select labelId="tag" value={tag} onChange={(evento) => setTag(evento.target.value)}>
           {tags.map((tag) => <MenuItem key={tag.id} value={tag.id}>{tag.value}</MenuItem>)}
         </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
         <InputLabel id="restaurante">Nome do Restaurante</InputLabel>
         <Select labelId="restaurante" value={restaurante} onChange={(evento) => setRestaurante(evento.target.value)}>
           {restaurantes.map((restaurante) => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
         </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo}/>

        <Button sx={{ marginTop: 2 }} variant="outlined" type="submit">
          Salvar
        </Button>
      </Box>
  );
}



