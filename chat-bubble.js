function sayHello() {
  // Creamos un contenedor para el chat
  var chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");

  // Creamos el bubble del chat
  var chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble");
  chatBubble.textContent = "Hola, ¿cómo estás?";

  // Añadimos el bubble del chat al contenedor
  chatContainer.appendChild(chatBubble);

  // Agregamos el contenedor al cuerpo de la página
  document.body.appendChild(chatContainer);

  // Creamos el CSS para el bubble del chat
  var chatBubbleCSS = `
        /* Estilos para el bubble del chat */
        .chat-container {
            width: 300px;
            margin: 20px auto;
        }

        .chat-bubble {
            background-color: #007bff; /* Color de fondo */
            color: white; /* Color del texto */
            border-radius: 10px; /* Bordes redondeados */
            padding: 10px 15px; /* Espacio interior */
            max-width: 70%; /* Ancho máximo del bubble */
            clear: both; /* Limpiar float */
        }
    `;

  // Creamos un elemento <style> y añadimos el CSS creado
  var styleElement = document.createElement("style");
  styleElement.textContent = chatBubbleCSS;

  // Añadimos el elemento <style> al head del documento
  document.head.appendChild(styleElement);
}

// Llamamos a la función sayHello() para mostrar el chat bubble cuando la página se carga
window.onload = sayHello;
