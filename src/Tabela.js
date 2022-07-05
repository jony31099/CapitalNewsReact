import React from "react";




//Definição da função que devolve o corpo da tabela
const Corpo = (props) => {
    //Lê e processa todos os objetos definidos dentro do array "dadosDasNoticias"
    const rows = props.dadosDasNoticias.map((row) => {
        return (
            <div>
            <tr key={row.id}>
                <div className="container-1">
                    <br />
                    <b className="b1" style={{color: "#5f9ea0"}}>{row.categoria}</b>
                    <br />
                    <br />
                    <img src={'Fotos/' + row.fotografia}
                        class="center"
                        border=" 5px "
                        height="300" 
                        width="500"/>
                    <br />
                    <br />

                    <h3 className="h3" style={{color: "white"}}>{row.titulo}</h3>
                    <br />
                    <p className="body">{row.body}</p>
                    <br />
                    <br />
                    <p className="data">{row.data} </p> 
                    <p className="jornalista">{row.jornalista}</p>
                </div> 
                
                
                
                
                
                <td>
                    
                    <button className="button"
                        onClick={() => props.noticiaEliminar(row.id)}
                    ><div className="Eliminar" style={{color: "white"}}>Eliminar</div></button>
                </td>
                  
                        
                
            </tr>

            </div>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{rows}</tbody>)
}

//Componente que junta os dois subcomponentes
class Tabela extends React.Component {

    render() {
        //Lê os dados que são recebidos pelo componente
        const { dadosNoticias, editaNoticiaOut, apagaNoticia } = this.props;

        return (
            <table className="table table-striped">
               
                <Corpo dadosDasNoticias={dadosNoticias} noticiaAtualizar={editaNoticiaOut} noticiaEliminar={apagaNoticia}/>
            </table>
        )
    }
}



export default Tabela



