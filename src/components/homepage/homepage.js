import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Homepage = () => {
  const [crew, setCrew] = useState(null);
  const [name, setName] = useState();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/crew").then((response) => {
      if (response?.data) {
        setCrew(response.data);
      }
      if (response.data.length === 12) {
        setDisable(true);
      }
    });
  }, [name, disable, crew]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    axios
      .post("http://localhost:3001/api/v1/crew/add", { member: name })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/v1/crew/${id}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    setCrew(crew.filter((v) => v._id !== id));
  };
  return (
    <div className="main">
      <h2>Ajouter un(e) Argonaute</h2>
      <form className="new-member-form" onSubmit={handleSubmit}>
        <label htmlFor="member">Nom de l&apos;Argonaute</label>
        <input
          className="input-member"
          id="member"
          name="member"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!disable ? (
          <button className="submit-button" type="submit">
            Ajouter
          </button>
        ) : (
          <p>Equipage complet !</p>
        )}
      </form>
      <h2>- Membres de l'équipage -</h2>
      <section className="member-list">
        {crew?.map((v, _id) => {
          return (
            <div className="member">
              <ul className="list">
                <li className="name" key={_id}>
                  {v?.member}
                </li>
              </ul>
              <div className="delete-button">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(v._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Homepage;
