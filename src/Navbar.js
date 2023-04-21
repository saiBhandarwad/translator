import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

 
export default function Navbar(props) {

  return (
    <>
    <nav className="navbar navbar-expand-lg  navbar-dark" style={{backgroundColor: "#5e1980"}}>
    <div className="container-fluid ">
    
      <Link className="navbar-brand d-flex" to="/"><ion-icon name="document-text-outline" size="large"></ion-icon>{props.name}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={"nav-link "+props.Home} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link "+ props.Translator} to="/translator" >Translator</Link>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    </>
  )
}
Navbar.propTypes={
    name:PropTypes.string.isRequired,
    title:PropTypes.string
}

Navbar.defaultProps = {
    name:'default name',
    title:'default title'
}