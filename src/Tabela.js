import React from "react";

//Função que devolve o cabeçalho da tabela
function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Body</th>
                <th>Categoria</th>
                <th>Data</th>
                
            </tr>
        </thead>
    )
}

//Definição da função que devolve o corpo da tabela
const Corpo = (props) => {
    //Lê e processa todos os objetos definidos dentro do array "dadosDasNoticias"
    const rows = props.dadosDasNoticias.map((row) => {
        return (
            <tr key={row.id}>
                <td>{row.titulo}</td>
                <td>{row.body}</td>
                <td>{row.categoria}</td>
                <td>{row.data}</td>             
                
            </tr>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{rows}</tbody>)
}

//Componente que junta os dois subcomponentes
class Tabela extends React.Component {

    render() {
        //Lê os dados que são recebidos pelo componente
        const { dadosNoticias } = this.props;

        return (
            <table className="table table-striped">
                <Cabecalho />
                <Corpo dadosDasNoticias={dadosNoticias} />
            </table>
        )
    }
}


export default Tabela