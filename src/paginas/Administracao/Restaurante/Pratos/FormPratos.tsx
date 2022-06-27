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
import ITag from "../../../../interfaces/ITag";


export default function FormPrato() {
  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("")

  useEffect(() => {
   api.get<{ tags: ITag[]}>('tags/')
   .then(resposta => setTags(resposta.data.tags))
  }, [])

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
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

        <Button sx={{ marginTop: 2 }} variant="outlined" type="submit">
          Salvar
        </Button>
      </Box>
  );
}



