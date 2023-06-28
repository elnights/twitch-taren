import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook";

function IndexPopup() {
  const [data, setData] = useState("")
  const [volumes] = useStorage("volumes", {})

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 250,
      }}>
      <h2>
        Ебать ты Вася!
      </h2>
      <div>
        {Object.entries(volumes).map(([key, value]) => <div>{key}: {value.toString()}</div>)}
      </div>
    </div>
  )
}

export default IndexPopup
