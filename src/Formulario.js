//Ficheiro que irá conter o código para representar o formulário no ecrã
import React from "react";


//Mostrar os dados das categorias
const EscolheCategoria = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaCategorias.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.categoriaNome}</option>)
    });

    let editar_value = <option value="">Selecione uma Categoria</option>
    if(props.editCategorias != null){
        editar_value = <option value="">{props.editCategorias.categoria}</option>
    }
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idCategoriaEscolhida}>
            {editar_value}
            {opcoes}
        </select>
    )
}


//Mostrar os dados das categorias
const EscolheJornalista = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaJornalistas.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.nome}</option>)
    })
    let editar_value = <option value="">Selecione um Jornalista</option>
    if(props.editJornalistas != null){
        editar_value = <option value="">{props.editJornalistas.jornalista}</option>
    }
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idJornalistaEscolhido}>
            {editar_value}
            {opcoes}
        </select>
    )
}


//Mostrar os dados das categorias
const EscolheFotografia = (props) => {
    //Itera todas as categorias da lista de categorias e produz as options necessárias
    const opcoes = props.listaFotografias.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.imagem}</option>)
    })
    let editar_value = <option value="">Selecione uma Fotografia</option>
    if(props.editFotografias != null){
        editar_value = <option value="">{props.editFotografias.fotografia}</option>
    }
    //Criação do objeto <select></select>
    //Este mesmo objeto também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    //O parâmetro "idCategoriaEscolhida" irá receber o id da categoria que foi escolhida
    return (
        <select required
            className="form-select"
            onChange={props.idFotografiaEscolhida}>
            {editar_value}
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
        // preparar os dados para exportação
        if(this.props.dadosEditar == null){
            let dadosForm={
                Titulo:this.state.tituloNoticia,
                Body:this.state.bodyNoticia,
                Data: this.state.dataNoticia,
                CategoriaFK: this.state.categoriaNoticiaFK,
                JornalistaFK: this.state.jornalistaNoticiaFK,
                FotografiaFK: this.state.fotografiaNoticiaFK,
                
            }
            this.props.dadosRecolhidos(dadosForm);
        }
        else {
            let dadosForm={
                Id: this.props.dadosEditar.id,
                Titulo:this.state.tituloNoticia,
                Body:this.state.bodyNoticia,
                Data: this.state.dataNoticia,
                CategoriaFK: this.state.categoriaNoticiaFK,
                JornalistaFK: this.state.jornalistaNoticiaFK,
                FotografiaFK: this.state.fotografiaNoticiaFK,
            }
            this.props.dadosAtualizar(dadosForm)
        };
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

    convertDatas = (date) => {
        let data = new Date(date);
        return (data.getFullYear() + "-" + (data.getMonth() + 1 >= 10 ? data.getMonth() + 1 : "0" + (data.getMonth() + 1)) + "-" + (data.getDate() >= 10 ? data.getDate() : ("0" + data.getDate())));
    }

    render() {
        // ler o conteúdo das variáveis State, dentro do Render
        const { dadosCategorias, dadosJornalistas, dadosFotografias, dadosEditar} = this.props;
        return (
            <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
                <div className="row">
                <div className="categoria-form">
                        
                        Categoria: <EscolheCategoria listaCategorias={dadosCategorias} editCategorias={dadosEditar}
                                idCategoriaEscolhida={this.handleCategoriaChange}
                            /><br />
    
                        
                        </div>

                        <div className="dropdowns">
                    Fotografia: <EscolheFotografia listaFotografias={dadosFotografias} editFotografias={dadosEditar}
                            idFotografiaEscolhida={this.handleFotografiaChange}
                        /><br />
                    </div>

                    <div className="titulo-form">
                    Titulo: <input type="text"
                            required
                            className="form-control"
                            name="tituloNoticia"
                            value={dadosEditar == null ? this.state.tituloNoticia : dadosEditar.titulo                    }
                            onChange={this.handlerTituloChange} /><br />
                    </div>
                    <div className="body-form">Body: <textarea
                            required
                            className="form-control"
                            name="bodyNoticia"
                            value={dadosEditar == null ? this.state.bodyNoticia : dadosEditar.body}
                            onChange={this.handlerBodyChange} /><br /></div>
                    
                    

                    <div className="data-form">
                    Data: <input type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={dadosEditar == null ? this.state.dataNoticia : this.convertDatas(dadosEditar.data)}
                            className="form-control"
                            onChange={this.handlerDataChange} /><br />
                    </div>
                    
                    
                    

                    <div className="jornalista-form">
                    Jornalista: <EscolheJornalista listaJornalistas={dadosJornalistas} editJornalistas={dadosEditar}
                            idJornalistaEscolhido={this.handleJornalistaChange}
                        /><br />
                    </div>

                    <input type="submit" value="Adicionar Noticia" className="button-add" />
                    <br/><br/>
                    <input type="submit" value="Atualizar" className="button-add" />
                
                </div>
            </form>
        )
    }
}

export default Formulario; 


