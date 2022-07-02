import React from "react";

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


const Corpo = (props) => {
    // 'map' funciona como um 'foreach()'
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



class Tabela extends React.Component {

    render() {

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