import './css/PokeInsert.css'
import { IoMdAddCircleOutline } from 'react-icons/io'
import React, { useState } from 'react'

function PokeInsert({ onInsert }) {
   const [text, setText] = useState('')

   const onSubmit = (e) => {
      e.preventDefault()
      if (!text) return
      onInsert(text)
      setText('')
   }

   return (
      <form className="PokeInsert" onSubmit={onSubmit}>
         <input type="text" placeholder="포켓몬 이름을 입력하세요." value={text} onChange={(e) => setText(e.target.value)} />
         <button type="submit">
            <IoMdAddCircleOutline />
         </button>
      </form>
   )
}

export default PokeInsert
