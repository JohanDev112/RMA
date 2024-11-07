import { useState, useEffect } from "react";
import './Recursos.css'

export default function RecursosGrid() {
  const [recursos, setRecursos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await fetch(
          "/api/elements.controllers/getRecursos.controller"
        );

        if (!response.ok) {
          throw new Error("no se pudieron cargar los recursos :(");
        }

        const data = await response.json();
        console.log(data.recursos);

        setRecursos(data.recursos);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecursos();
  });

  if (loading) {
    return <div>Cargando... ^^ </div>;
  }

  if (error) {
    return <div>Error: {error} :c</div>;
  }

  return (
    <div className="document-grid-container">
      <div className="document-grid">
        {recursos.map((recurso) => (
          <div key={recurso.recursos_id} className="card">
            <div className="thumbnail-container">
              <img
                src={"/placeholder.svg?height-200&width=300"}
                alt={recurso.recurso_tema}
                className="thumbnail"
              />
              <div className='content'></div>
              <h2 className='document-description'>{recurso.recursos_descripcion}</h2>
              <button className="btn btn-white">{recurso.recursos_temas}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
