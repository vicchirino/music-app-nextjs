export default function fetcher(url: string, data = undefined) {
  console.log("Data -->", data)
  console.log("JSON Data -->", JSON.stringify(data))
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "applicatopn/json",
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.status > 399 && res.status < 200) {
      throw new Error("")
    }
    return res.json()
  })
}
