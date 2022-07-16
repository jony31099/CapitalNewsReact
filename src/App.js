import React, { useState } from "react";
import "./App.css";
import Tabela from "./Tabela";
import Formulario from './Formulario';

var aux;

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


async function getJornalistas() {

  let resposta = await fetch("api/jornalistasAPI");
  if (!resposta.ok) {
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  // exportar os dados recebido
  return await resposta.json();
}


async function getFotografias() {

  let resposta = await fetch("api/fotografiasAPI");
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
  formData.append("JornalistaFK", novaNoticia.JornalistaFK);
  formData.append("FotografiaFK", novaNoticia.FotografiaFK);
  // entregar os dados à API
  console.log("passei aqui");
  let resposta = await fetch("api/noticiasAPI",
    {
      method: "POST",
      body: formData
    });
  if (!resposta.ok) {
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
  return await resposta.json();
}







async function apagaNoticia(idNoticia) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("id", idNoticia);
  // entregar os dados à API
  let resposta = await fetch("api/noticiasAPI/" + idNoticia,
    {
      method: "DELETE",
      body: formData
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro na eliminação dos dados do Prato",
      resposta.status)
  }
}



class App extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
      //Array que irá conter os dados das notícias vindos do API
      noticias: [],
      //Array que irá conter os dados das categorias vindos do API
      categorias: [],

      jornalistas: [],

      fotografias: [],


      
      loadState: "",
      
      errorMessage: null
    }
  }

  

  componentDidMount() {
    this.LoadNoticias();
    this.LoadCategorias();
    this.LoadJornalistas();
    this.LoadFotografias();
    
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




  //Carrega os jornalistas da API e adiciona-as ao array
  async LoadJornalistas() {
    
    try {
      this.setState({ loadState: "carregando dados" });
      // 1.
      let jornalistasVindasDaAPI = await getJornalistas();
      // 2.
      this.setState({ jornalistas: jornalistasVindasDaAPI,  loadState: "sucesso" });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Aconteceu um erro no acesso aos dados dos Jornalistas. ", erro);
    }
  }



  //Carrega as fotografias da API e adiciona-as ao array
  async LoadFotografias() {
    
    try {
      this.setState({ loadState: "carregando dados" });
      // 1.
      let fotografiasVindasDaAPI = await getFotografias();
      // 2.
      this.setState({ fotografias: fotografiasVindasDaAPI,  loadState: "sucesso" });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Aconteceu um erro no acesso aos dados dos Jornalistas. ", erro);
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


  


  handleApagaNoticia = async (idNoticia) => {
    try {
      // exporta os dados para a API
      await apagaNoticia(idNoticia);
      // recarregar a Tabela com os dados dos pratos
      this.LoadNoticias();
    } catch (error) {
      console.error("ocorreu um erro com a eliminação da noticia.")
    }
  }

  CarregaNoticiasFiltro = async (e) => {
    if(e.key == "Enter"){
      let noticiasVindasDaAPI = await getNoticias();
      let noticiasFiltradas = []
      noticiasVindasDaAPI.forEach(element => {
        if(element.titulo.includes(e.target.value) || element.body.includes(e.target.value)){
          noticiasFiltradas.push(element);
        }
      });
      this.setState({ noticias: noticiasFiltradas, loadState: "sucesso" });
      this.forceUpdate()
    }
  }

  



  
  render(){
    //Recupera os dados das states para usar dentro deste método
    const {noticias, noticia, categorias, jornalistas, fotografias} = this.state;

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
            <br />
            <img src="logo.png" alt="Logo" class="image" ></img>
            <div className="Form">
            <h4>Inserir uma nova Noticia:</h4>
            <Formulario noticiaIN={noticia} 
                        dadosCategorias={categorias} 
                        dadosJornalistas={jornalistas} 
                        dadosFotografias={fotografias} 
                        
                        dadosRecolhidos={this.handleGuardaNoticia} 
            />
            </div>
            <br />



            
            
        
        
            {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
            as 'fotos' devem ser lidas na API */}
          <div class="div-1">
          <input type="text" name="chave" placeholder="Encontre a sua Notícia..." className="search" onKeyPress={this.CarregaNoticiasFiltro}/>
            <Tabela dadosNoticias={noticias} 
                     
                     apagaNoticia={this.handleApagaNoticia}/></div>
            
          </div>)
      default:
        return null;
    }
    
    
  }
}

export default App;
