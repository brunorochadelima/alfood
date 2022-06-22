import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");
  const [ordenar, setOrdenar] = useState("");

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  function carregarDados(url: string, opcoes: AxiosRequestConfig = {}) {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // a cada busca, montamos um objeto de opções
  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    if(ordenar) {
      opcoes.params.ordering = ordenar;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <TextField
           sx={{mb: 3}}
          label="Buscar Restaurante"
          variant="standard"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />

         <InputLabel id="ordenar">Ordenar por</InputLabel>
        <Select variant="standard" sx={{ minWidth: 150, mr: 2 }}
          labelId="ordenar"
          value={ordenar}
          label="Age"
          onChange={evento => setOrdenar(evento.target.value)}
        >
          <MenuItem value={''}>Padrão</MenuItem>
          <MenuItem value={'id'}>Por ID</MenuItem>
          <MenuItem value={'nome'}>Por Nome</MenuItem>
        </Select>

        <Button type="submit" variant="outlined">
          Buscar
        </Button>

      </form>
      
            

      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <br />
      {
        <Button
          style={{ marginRight: "1rem" }}
          variant="contained"
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </Button>
      }
      {
        <Button
          variant="contained"
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}
        >
          Próxima página
        </Button>
      }
    </section>
  );
};

export default ListaRestaurantes;
