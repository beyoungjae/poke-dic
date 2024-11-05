import React, { useState, useRef, useCallback } from 'react'
import PokeInsert from './components/PokeInsert'
import PokeList from './components/PokeList'
import PokeTemplate from './components/PokeTemplate'

function App() {
   const [pokeLists, setPokeLists] = useState([
      {
         id: 1,
         img: '/images/피츄.png',
         text: '피츄',
         level: 1,
         active: true,
      },
      {
         id: 2,
         img: '/images/꼬부기.png',
         text: '꼬부기',
         level: 1,
         active: true,
      },
      {
         id: 3,
         img: '/images/파이리.png',
         text: '파이리',
         level: 1,
         active: true,
      },
      {
         id: 4,
         img: '/images/이상해씨.png',
         text: '이상해씨',
         level: 1,
         active: true,
      },
      {
         id: 5,
         img: '/images/이브이.png',
         text: '이브이',
         level: 1,
         active: true,
      },
   ])

   const evolutionData = {
      피츄: { next: '피카츄', level: 1 },
      피카츄: { next: '라이츄', level: 2 },
      꼬부기: { next: '어니부기', level: 1 },
      어니부기: { next: '거북왕', level: 2 },
      이상해씨: { next: '이상해풀', level: 1 },
      이상해풀: { next: '이상해꽃', level: 2 },
      잉어킹: { next: '갸라도스', level: 1 },
      고라파덕: { next: '골덕', level: 1 },
      파이리: { next: '리자드', level: 1 },
      리자드: { next: '리자몽', level: 2 },
      탕구리: { next: '텅구리', level: 1 },
      또가스: { next: '또도가스', level: 1 },
   }

   const nextId = useRef(6)

   // 포켓몬 등록
   const onInsert = useCallback((text) => {
      const img = `/images/${text}.png`
      const poke = {
         id: nextId.current,
         img,
         text,
         level: 1,
         active: true,
      }

      setPokeLists((prevPokeLists) => prevPokeLists.concat(poke))
      nextId.current += 1
   }, [])

   // 포켓몬 삭제
   const removePoke = (id) => {
      setPokeLists((prevPokeLists) => prevPokeLists.filter((poke) => poke.id !== id))
   }

   // 포켓몬 더블클릭 시 비활성화, 활성화
   const toggleActive = (id) => {
      setPokeLists((prevPokeLists) => prevPokeLists.map((poke) => (poke.id === id ? { ...poke, active: !poke.active } : poke)))
   }

   // 포켓몬 진화
   const evolvePoke = (id) => {
      setPokeLists((prevPokeLists) =>
         prevPokeLists.map((poke) => {
            if (poke.id === id) {
               const evolution = evolutionData[poke.text]
               if (evolution && poke.level >= evolution.level) {
                  return {
                     ...poke,
                     text: evolution.next,
                     img: `/images/${evolution.next}.png`,
                     level: poke.level + 1,
                     evolving: true,
                  }
               }
            }
            return poke
         })
      )
      setTimeout(() => {
         setPokeLists((prevPokeLists) => prevPokeLists.map((poke) => (poke.id === id ? { ...poke, evolving: false } : poke)))
      }, 1000)
   }

   // 진화 이전단계로 돌리는 것
   const beforeEvolution = (id) => {
      setPokeLists((prevPokeLists) =>
         prevPokeLists.map((poke) => {
            if (poke.id === id) {
               const currentEvolution = Object.keys(evolutionData).find((key) => evolutionData[key].next === poke.text)

               if (currentEvolution) {
                  return {
                     ...poke,
                     text: currentEvolution,
                     img: `/images/${currentEvolution}.png`,
                     level: evolutionData[currentEvolution].level,
                  }
               }
            }
            return poke
         })
      )
   }

   return (
      <PokeTemplate>
         <PokeInsert onInsert={onInsert} />
         <PokeList pokeLists={pokeLists} removePoke={removePoke} toggleActive={toggleActive} evolvePoke={evolvePoke} beforeEvolution={beforeEvolution} />
      </PokeTemplate>
   )
}

export default App
