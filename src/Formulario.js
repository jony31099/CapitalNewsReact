import React from "react";


const EscolheCategoria = (props) => {
    const opcoes = props.listaCategorias.map((opcao) => {
        return (<option key={opcao.id} value={opcao.id}>{opcao.categoriaNome}</option>)
    })
    return (
        <select required
            className="form-select"
            onChange={props.idCategoriaEscolhida}>
            <option value="">Selecione, por favor, uma Categoria</option>
            {opcoes}
        </select>
    )
}











class Formulario extends React.Component {

    constructor(props) {
        super(props);

        // variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            tituloNoticia: "",
        bodyNoticia: "",
        dataNoticia: "",
        categoriaNoticiaFK: ""
        }
    }

    handlerTituloChange = (evento) => {
        // eventuais validações dos dados podem ser aqui escritas...


        // atribuição ao STATE os dados lidos
        this.setState({ tituloNoticia: evento.target.value });
    }

    handlerBodyChange = (evento) => {
        // eventuais validações dos dados podem ser aqui escritas...


        // atribuição ao STATE os dados lidos
        this.setState({ bodyNoticia: evento.target.value });
    }
    
   
    handlerDataChange = (evento) => {
        // eventuais validações dos dados podem ser aqui escritas...


        // atribuição ao STATE os dados lidos
        this.setState({ dataNoticia: evento.target.value });
    }

    handleCategoriaChange = (evento) => {
        this.setState({ categoriaNoticiaFK: evento.target.value });
    }

    

    handleFormSubmit = (evento) => {
        
        evento.preventDefault();
        // preparar os dados para o envio
        let dadosForm={
            Titulo:this.state.tituloNoticia,
            Body:this.state.bodyNoticia,
            Data: this.state.dataNoticia,
            CategoriaFK: this.state.categoriaNoticiaFK,
            
        }
        // preparar os dados para exportação
        this.props.dadosRecolhidos(dadosForm);
    }

    render() {
        // ler o conteúdo das variáveis State, dentro do Render
        const { dadosCategorias } = this.props
        
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

                    Body: <input type="text"
                            required
                            className="form-control"
                            name="bodyNoticia"
                            value={this.state.bodyNoticia}
                            onChange={this.handlerBodyChange} /><br />

                    Data: <input type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={this.state.dataNoticia}
                            className="form-control"
                            onChange={this.handlerDataChange} /><br />
                    </div>
                    <div className="col-md-4">
                        
                    Categoria: <EscolheCategoria listaCategorias={dadosCategorias}
                            idCategoriaEscolhida={this.handleCategoriaChange}
                        /><br />
                    </div>
                </div>
                <input type="submit" value="Adicionar Noticia" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario; 


