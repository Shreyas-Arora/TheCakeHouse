import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cakes, setCakes] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cakes/')
      .then((res) => res.json())
      .then((data) => setCakes(data))
      .catch((err) => console.error('Failed to fetch cakes:', err))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cake Menu 🍰</h1>
      {cakes.map((cake) => (
        <div key={cake.id} style={{ marginBottom: "2rem" }}>
          <h2>{cake.name} - ₹{cake.price}</h2>
          <p>{cake.description}</p>
          <img
            src={cake.image}
            alt={`Image of ${cake.name}`}
            style={{ width: "300px", borderRadius: "12px" }}
          />

          {/* Order Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);

              fetch("http://localhost:8000/api/orders/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cake: cake.id,
                  name: formData.get("name"),
                  email: formData.get("email"),
                  quantity: parseInt(formData.get("quantity")),
                  message: formData.get("message"),
                }),
              })
                .then((res) => res.json())
                .then((data) => alert("Order Placed Successfully"))
                .catch(async (err) => {
                  const errorText = await err.response?.text?.();
                  alert("Error: " + (errorText || "in Placing the Order"))
                });
            }}
          >
            <input name="name" placeholder='Your Name' required />
            <input name='email' placeholder='Your Email' required />
            <input name='quantity' type='number' min='1' defaultValue='1' required />
            <input name='message' placeholder='Message (Optional)' />
            <button type='submit'>Place Order</button>
          </form>

        </div>
      ))}
    </div>
  )
}

export default App
