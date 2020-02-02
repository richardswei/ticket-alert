import React, { Component } from 'react'

class CustomDropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
    console.log(this.state.listOpen)
  }

  render(){
    const{listOpen, headerTitle} = this.state
    return(
      <div className="btn-primary disabled dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <span>&#9652;</span>
            : <span>&#9662;</span>
          }
        </div>
        {listOpen && <div className="dd-list">
          {this.props.children}
        </div>}
      </div>
    )
  }
}

export default CustomDropdown
