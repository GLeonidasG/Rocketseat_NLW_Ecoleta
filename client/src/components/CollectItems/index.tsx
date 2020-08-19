import React, { MouseEvent } from 'react';

interface IState {
    liClassName:string
}

interface IProps {
    image?:string,
    title?:string
}

class CollectItems extends React.Component< IProps, IState >{
    constructor(props: IProps) {
        super(props);
        this.state = {
            liClassName: ""
        }
    }


    handleClick = (e:MouseEvent<HTMLLIElement>) =>{
        const { liClassName } = this.state
        if ( liClassName === "" ) this.setState({liClassName: 'selected'})
        else if ( liClassName === "selected" ) this.setState({liClassName: ''})
    }

    render() {
        return (
            <li onClick={this.handleClick} className={this.state.liClassName} >
                <img src="http://localhost:3333/uploads/baterias.svg" alt="Oleo de cozinha" />
                <span>Oleo de cozinha</span>
            </li>
        )
    }
}