import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const MiApp = () => {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  //Funcion que carga todos mis personajes
  async function getPersonajes() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=10"
      );
      setPersonajes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
 //Funcion que escucha el buscador
  const handleChangeSearch = (e) => {
    setBusqueda(e.target.value);
    if (e.target.value === "") {
      getPersonajes();
    }
  };

  //Funcion para el boton de busqueda
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?character=${busqueda}`
      );
      setPersonajes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPersonajes();
  }, []);

  return (
    <div>
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="../assets/img/dona.PNG "
                alt=""
                width="50"
                height="40"
                className="d-inline-block align-text-top"
              />
              <img
                src="../assets/img/titulo.jpeg"
                alt=""
                width="100"
                height="50"
                className="d-inline-block align-text-top"
              />
            </a>
            <button onClick={getPersonajes} className="btn colordonus">
              {" "}
              NUEVOS PERSONAJES{" "}
            </button>
          </div>
        </nav>
      </div>
    {/* Buscador */}
      <div>
        <form className="d-flex">
          <div className="containerInput">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Buscar..."
              onChange={handleChangeSearch}
            ></input>
          </div>
          <button className="btn colordonus" onClick={handleChange}>
            {" "}
            Buscar
          </button>
        </form>
      </div>

      <div className="row container-fluid d-flex justify-content-center">
        {loading ? (
          <div className="spinner-container" >
            <div className="spinner-border" style={{width: "5rem", height: "5rem" }} role="status">
              <span class="visually-hidden"> </span>
            </div>
          </div>
        ) : personajes.length > 0 ? (
          personajes.map((personaje, index) => (
            <div key={index} className="card m-2" style={{ width: "15rem" }}>
              <img
                src={personaje.image}
                className="card-img-top"
                alt={personaje.character}
              />
              <div className="card-body">
                <h5 className="card-title">{personaje.character}</h5>
                <p className="card-text"> {personaje.quote} </p>
                <div href="#" className="btn colordonus">
                  {" "}
                  <Modal personaje={personaje} />{" "}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <img
              src="../assets/img/Homer-ouch.jpg "
              alt=""
              width="600"
              height="560"
              className="d-inline-block align-text-top"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiApp;
