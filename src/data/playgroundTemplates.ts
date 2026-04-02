export type Template = {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
};

export const playgroundTemplates: Template[] = [
  {
    id: "base",
    name: "Base (Hola Mundo)",
    html: `<h1>¡Hola, <span>Playground!</span> 🚀</h1>
<p>Edita el código en las pestañas y ve el resultado aquí al instante.</p>
<button id="mi-boton" class="btn">Pruébame</button>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  background: #ECF4E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  padding: 24px;
}
h1 { font-size: 2.5rem; font-weight: 900; color: #1a2e1d; }
h1 span { color: #5a8f97; }
p {
  color: #5a7a61;
  font-size: 1.1rem;
  max-width: 420px;
  text-align: center;
  line-height: 1.7;
}
.btn {
  background: #93BFC7;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover { background: #5a8f97; transform: translateY(-2px); }`,
    js: `const btn = document.getElementById('mi-boton');

btn.addEventListener('click', () => {
  btn.textContent = '¡Funciona! 🎉';
  console.log("¡El botón ha sido pulsado exitosamente!");
});`,
  },
  {
    id: "css-animation",
    name: "Animación CSS 3D",
    html: `<div class="card">
  <h2>Efecto Hover 3D</h2>
  <p>Pasa el ratón por encima para ver la animación</p>
</div>`,
    css: `body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #212121;
  font-family: sans-serif;
  perspective: 1000px;
}

.card {
  width: 250px;
  height: 350px;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
}

.card:hover {
  transform: rotateY(15deg) rotateX(10deg) scale(1.05);
}

.card h2 {
  transform: translateZ(50px);
  margin-bottom: 10px;
}
.card p {
  transform: translateZ(30px);
  opacity: 0.9;
}`,
    js: `console.log("Prueba moviendo el ratón sobre la tarjeta.");`
  },
  {
    id: "js-calculator",
    name: "Calculadora Básica",
    html: `<div class="calculator">
  <input type="number" id="num1" placeholder="Número 1">
  <input type="number" id="num2" placeholder="Número 2">
  <div class="actions">
    <button onclick="calculate('+')">+</button>
    <button onclick="calculate('-')">-</button>
    <button onclick="calculate('*')">×</button>
    <button onclick="calculate('/')">÷</button>
  </div>
  <div class="result" id="result">= ?</div>
</div>`,
    css: `body {
  font-family: monospace;
  background: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.calculator {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 260px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
}
input:focus { border-color: #5a8f97; }
.actions { display: flex; gap: 8px; }
button {
  flex: 1;
  padding: 12px;
  border: none;
  background: #93BFC7;
  color: white;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover { background: #5a8f97; }
.result {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding-top: 10px;
}`,
    js: `function calculate(operation) {
  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  const res = document.getElementById('result');
  
  if(isNaN(n1) || isNaN(n2)) {
    console.error("Por favor, introduce dos números válidos.");
    return;
  }
  
  let total;
  switch(operation) {
    case '+': total = n1 + n2; break;
    case '-': total = n1 - n2; break;
    case '*': total = n1 * n2; break;
    case '/': total = n1 / n2; break;
  }
  
  console.log(\`Operación: \${n1} \${operation} \${n2} = \${total}\`);
  res.textContent = "= " + total;
}`
  }
]
