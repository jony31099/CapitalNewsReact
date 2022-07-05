//Ficheiro que irá conter o código para representar o formulário no ecrã
import React from "react";


//Mostrar os dados das categorias
const EscolheCategoria = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaCategorias.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.categoriaNome}</option>)
    })
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idCategoriaEscolhida}>
            <option value="">Selecione, por favor, uma Categoria</option>
            {opcoes}
        </select>
    )
}


//Mostrar os dados das categorias
const EscolheJornalista = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaJornalistas.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.Nome}</option>)
    })
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idJornalistaEscolhido}>
            <option value="">Selecione, por favor, um Jornalista</option>
            {opcoes}
        </select>
    )
}


//Mostrar os dados das categorias
const EscolheFotografia = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaFotografias.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.NomeFoto}</option>)
    })
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idFotografiaEscolhida}>
            <option value="">Selecione, por favor, uma Fotografia</option>
            {opcoes}
        </select>
    )
}










//Formulário para adicionar notícias
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        //Variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            tituloNoticia: "",
        bodyNoticia: "",
        dataNoticia: "",
        categoriaNoticiaFK: "",
        jornalistaNoticiaFK: "",
        fotografiaNoticiaFK: ""
        }
    }

    //Handler para manipular os dados escritos pelo utilizador na textbox e contém o título escrito pelo utilizador
    handlerTituloChange = (evento) => {
        // atribuição ao STATE os dados lidos
        this.setState({ tituloNoticia: evento.target.value });
    }

    //Handler para manipular os dados escritos pelo utilizador na textbox e contém o body escrito pelo utilizador
    handlerBodyChange = (evento) => {
        // atribuição ao STATE os dados lidos
        this.setState({ bodyNoticia: evento.target.value });
    }
    
    //Handler para manipular os dados escritos pelo utilizador na textbox e contém a data escrita pelo utilizador
    handlerDataChange = (evento) => {
        // atribuição ao STATE os dados lidos
        this.setState({ dataNoticia: evento.target.value });
    }

    //Handler para manipular os dados escritos pelo utilizador na textbox e contém a categoria escrita pelo utilizador
    handleCategoriaChange = (evento) => {
        this.setState({ categoriaNoticiaFK: evento.target.value });
    }

    //Handler para manipular os dados escritos pelo utilizador na textbox e contém o jornalista escrito pelo utilizador
    handleJornalistaChange = (evento) => {
        this.setState({ jornalistaNoticiaFK: evento.target.value });
    }

    //Handler para manipular os dados escritos pelo utilizador na textbox e contém o jornalista escrito pelo utilizador
    handleFotografiaChange = (evento) => {
        this.setState({ fotografiaNoticiaFK: evento.target.value });
    }


    //Função que irá exportar os dados para fora do formulário
    handleFormSubmit = (evento) => {
        //Impede que o browser efetue o submit do formulário
        evento.preventDefault();
        // preparar os dados para o envio
        let dadosForm={
            Titulo:this.state.tituloNoticia,
            Body:this.state.bodyNoticia,
            Data: this.state.dataNoticia,
            CategoriaFK: this.state.categoriaNoticiaFK,
            JornalistaFK: this.state.jornalistaNoticiaFK,
            FotografiaFK: this.state.fotografiaNoticiaFK,
            
        }
        // preparar os dados para exportação
        this.props.dadosRecolhidos(dadosForm);
    }



    


    componentDidUpdate(prevProps){
        //só vou alterar o estado se 'props' foi atualizado
        if(prevProps !== this.props){
            //passar os dados de 'props' para o 'state'
            this.setState(
                {
                    Titulo:this.state.tituloNoticia,
                    Body:this.state.bodyNoticia,
                    Data: this.state.dataNoticia,
                    CategoriaFK: this.state.categoriaNoticiaFK,
                    JornalistaFK: this.state.jornalistaNoticiaFK
                })
        }
    } 

    render() {
        // ler o conteúdo das variáveis State, dentro do Render
        const { dadosCategorias, dadosJornalistas, dadosFotografias} = this.props
        
        return (
            <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-4">
                    Titulo: <input type="text"
                            required
                            className="form-control"
                            name="tituloNoticia"
                            value={this.state.tituloNoticia}
                            onChange={this.handlerTituloChange} /><br />
                    <div className="body-form">Body: <textarea
                            required
                            className="form-control"
                            name="bodyNoticia"
                            value={this.state.bodyNoticia}
                            onChange={this.handlerBodyChange} /><br /></div>
                    
                    <div className="body-form">
                    Data: <input type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={this.state.dataNoticia}
                            className="form-control"
                            onChange={this.handlerDataChange} /><br />
                    </div>
                    
                    </div>
                    <div className="col-md-4">
                        
                    Categoria: <EscolheCategoria listaCategorias={dadosCategorias}
                            idCategoriaEscolhida={this.handleCategoriaChange}
                        /><br />

                    
                    </div>

                    <div className="col-md-4">
                    Jornalista: <EscolheJornalista listaJornalistas={dadosJornalistas}
                            idJornalistaEscolhido={this.handleJornalistaChange}
                        /><br />
                    </div>

                    <div className="col-md-4">
                    Jornalista: <EscolheFotografia listaFotografias={dadosFotografias}
                            idFotografiaEscolhida={this.handleFotografiaChange}
                        /><br />
                    </div>
                </div>
                <input type="submit" value="Adicionar Noticia" className="btn btn-outline-primary" />
               
            </form>
        )
    }
}

export default Formulario; 


