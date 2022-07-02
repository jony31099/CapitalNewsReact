import React from "react";

import Tabela from "./Tabela";
import Formulario from './Formulario';



async function getNoticias() {

  let resposta = await fetch("api/noticiasAPI");
  if (!resposta.ok) {
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  // exportar os dados recebido
  return await resposta.json();
}

/**
 * Devolve uma lista com as categorias inscritas na BD da app
 * @returns 
 */
 async function getCategorias() {

  let resposta = await fetch("api/categoriasAPI");
  if (!resposta.ok) {
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  // exportar os dados recebido
  return await resposta.json();
}








/**
 * Insere os dados da nova noticia, através da API
 * @param {*} noticia 
 */
 async function adicionaNoticia(novaNoticia) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("Titulo", novaNoticia.Titulo);
  formData.append("Body", novaNoticia.Body);
  formData.append("Data", novaNoticia.Data);
  formData.append("CategoriaFK", novaNoticia.CategoriaFK);
  
  // entregar os dados à API
  let resposta = await fetch("api/noticiasAPI",
    {
      method: "POST",
      body: formData
    });
    console.log(resposta)
  if (!resposta.ok) {
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
  return await resposta.json();
}


class App extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
      //Array que irá conter os dados das notícias vindos do API
      noticias: [],
      //Array que irá conter os dados das categorias vindos do API
      categorias: [],
      
      loadState: "",
      
      errorMessage: null
    }
  }

  

  componentDidMount() {
    this.LoadNoticias();
    this.LoadCategorias();
    
  }

  //Carrega as notícias da API e adiciona-as ao array
  async LoadNoticias() {
    
    try {

      this.setState({ loadState: "carregando dados" });
      let noticiasVindasDaAPI = await getNoticias();
      
      this.setState({ noticias: noticiasVindasDaAPI, loadState: "sucesso" });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Aconteceu um erro no acesso aos dados das Noticias. ", erro);
    }
  }

  //Carrega as categorias da API e adiciona-as ao array
  async LoadCategorias() {
    
    try {
      this.setState({ loadState: "carregando dados" });
      // 1.
      let categoriasVindasDaAPI = await getCategorias();
      // 2.
      this.setState({ categorias: categoriasVindasDaAPI,  loadState: "sucesso" });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Aconteceu um erro no acesso aos dados das categorias. ", erro);
    }
  }

  


  /**
   * enviar os dados para a API
   * @param {*} noticia 
   */
   handleGuardaNoticia = async (dadosDaNoticiaACarregar) => {
    try {
      // exporta os dados para a API
      await adicionaNoticia(dadosDaNoticiaACarregar);
      // recarregar a Tabela com os dados das Noticias
      await this.LoadNoticias();
    } catch (erro) {
      console.error("ocorreu um erro com a adição da noticia", erro);
    }
  }

  
  render(){
    //Recupera os dados das states para usar dentro deste método
    const {noticias, categorias} = this.state;

    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar dados. Aguarde, por favor...</p>
      case "erro":
        return <p>Ocorreu um erro:
                {this.state.errorMessage + '.' ?? "Não sabemos qual..."}</p>
      case "sucesso":
        return (
          <div className="container">
            {/* adição do Formulário que há-de recolher os dados da nova fotografia
                   - dadosCaes: parâmetro de Entrada no componente
                   - dadosRecolhidos: parâmetro de Saída (exportação) do componente
            */}
            <h4>Inserir uma nova Noticia:</h4>
            <Formulario dadosCategorias={categorias}
              dadosRecolhidos={this.handleGuardaNoticia}
            />
            <hr />

            {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
            as 'fotos' devem ser lidas na API */}
            <Tabela dadosNoticias={noticias} />
          </div>)
      default:
        return null;
    }
    
    
  }
}

export default App;
