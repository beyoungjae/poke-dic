import './css/PokeList.css'

function PokeList({ pokeLists, removePoke, toggleActive, evolvePoke, beforeEvolution }) {
   return (
      <div className="poke-list">
         {pokeLists.map((poke) => (
            <div className={`poke-card ${!poke.active ? 'inactive' : ''} ${poke.evolving ? 'evolving' : ''}`} key={poke.id} onDoubleClick={() => toggleActive(poke.id)}>
               <img src={poke.img} alt={poke.text} className="poke-image" />
               <div className="poke-info">
                  <h3>{poke.text}</h3>
                  <p>진화레벨: {poke.level}</p>
                  <button className="evolution-button" onClick={() => evolvePoke(poke.id)} disabled={!poke.active}>
                     진화
                  </button>
                  <button className="before-button" onClick={() => beforeEvolution(poke.id)} disabled={!poke.active}>
                     이전
                  </button>
                  <button className="remove-button" onClick={() => removePoke(poke.id)}>
                     삭제
                  </button>
               </div>
            </div>
         ))}
      </div>
   )
}

export default PokeList
