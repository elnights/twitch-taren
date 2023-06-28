import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Ебать ты Вася!
      </h2>
      <div>Тут пока нихуя нет</div>
    </div>
  )
}

export default IndexPopup
