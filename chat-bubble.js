document.addEventListener("DOMContentLoaded", function () {
  let isOpen = false;

  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
  fontLink.rel = "stylesheet";

  // Añadir el elemento link al head del documento
  document.head.appendChild(fontLink);

  function getScriptUrl(url) {
    const scripts = document.getElementsByTagName("script");

    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];

      const src = script.src;

      if (src && src.includes(url)) {
        return src;
      }
    }
    return null;
  }

  const scriptUrl = getScriptUrl(
    "https://ghimmel.github.io/chat-bubble/chat-bubble.js"
  );
  /* https://ghimmel.github.io/chat-bubble/chat-bubble.js */
  /* chat-bubble.js */
  /* https://cdn.jsdelivr.net/gh/GHimmel/chat-bubble@main/chat-bubble.js */

  const queryStringIndex = scriptUrl.indexOf("?");

  const params = {};

  if (queryStringIndex !== -1) {
    const queryString = scriptUrl.slice(queryStringIndex + 1);

    queryString.split("&").forEach(function (pair) {
      const keyValue = pair.split("=");
      params[keyValue[0]] = decodeURIComponent(keyValue[1] || "");
    });
    console.log(params);
    // Ahora puedes usar los parámetros de la consulta aquí
  } else {
    console.log("No hay parámetros de consulta en la URL del script.");
  }

  function hexToRgb(hex) {
    // Eliminar el # del inicio (si está presente)
    hex = hex.replace("#", "");

    // Separar los componentes de color
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  // Función para hacer más translúcido un color RGBA
  function rgba(color, alpha) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }

  const rgb = hexToRgb(params.color);

  // Crear los elementos HTML
  const chatContainer = document.createElement("div");
  const chatHeader = document.createElement("div");
  const chatBody = document.createElement("div");
  const chatButtons = document.createElement("div");
  const chatInputContainer = document.createElement("div");
  const chatInput = document.createElement("input");
  const chatSendButton = document.createElement("button");
  const toggleButtonContainer = document.createElement("div");
  const toggleButton = document.createElement("button");

  // Añadir clases y estilos
  /*  chatContainer.className = "chat-container"; */
  chatContainer.style.cssText = `
    position: fixed;
    right: 15px;
    bottom: 80px;
    transition: all 0.3s;
    display: flex;
    overflow: hidden; 
    flex-direction: column;
    padding: 0px;
    border-radius: 1rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font-family: 'Inter', sans-serif;
    scrollbar-gutter: stable;
    z-index:110
  `;

  /*  chatHeader.className = "chat-header"; */
  chatHeader.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding:6px 0px 12px 0px;
    border-bottom: 1px solid #d1d5db;
    color:${rgba(rgb, 0.9)};
  `;

  /* chatBody.className = "chat-body"; */
  chatBody.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow-y: auto;
    padding: 16px 0;
    color: #1f2937;
   
  `;

  /* chatButtons.className = "chat-buttons"; */
  chatButtons.style.cssText = `
    display: flex;
    gap: 16px;
    overflow-x: scroll;
    padding: 8px 0;
    color: #374151;
  `;

  /* chatInputContainer.className = "chat-input-container"; */
  chatInputContainer.style.cssText = `
    display: flex;
    gap: 8px;
    padding: 4px 0;
  `;

  /* chatInput.className = "chat-input"; */
  chatInput.placeholder = "Message ...";
  chatInput.style.cssText = `
    background-color: #e5e7eb;
    padding: 4px 8px;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    flex: 1;
    font-size: 16px;
    line-height: 180%;
  `;

  /* chatSendButton.className = "chat-send-button"; */
  chatSendButton.style.cssText = `
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${rgba(rgb, 0.8)};
  `;
  chatSendButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" d="M2.345 2.245a1 1 0 0 1 1.102-.14l18 9a1 1 0 0 1 0 1.79l-18 9a1 1 0 0 1-1.396-1.211L4.613 13H10a1 1 0 1 0 0-2H4.613L2.05 3.316a1 1 0 0 1 .294-1.071z" clip-rule="evenodd"></path>
    </svg>
  `;

  /* toggleButtonContainer.className = "toggle-button-container"; */
  toggleButtonContainer.style.cssText = `
    position: fixed;
    right: 15px;
    bottom: 1px;
    display: flex;
    justify-content: flex-end;
    padding: 8px 0;
  `;

  /* toggleButton.className = "toggle-button"; */
  toggleButton.style.cssText = `
    background-color: ${rgba(rgb, 1)};
    color: white;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px; /* Ajusta el ancho del botón según sea necesario */
    height: 60px; /* Ajusta el alto del botón según sea necesario */
`;

  toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 15 15" style="vertical-align: middle; margin-top:2px">
        <path fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" d="m5.5 11.493l2 2.998l2-2.998h4a1 1 0 0 0 1-1V1.5a.999.999 0 0 0-1-.999h-12a1 1 0 0 0-1 1v8.994c0 .552.447.999 1 .999z" clip-rule="evenodd"></path>
    </svg>
`;

  // Añadir contenido a los elementos
  const userInfo = document.createElement("div");
  userInfo.style.display = "flex";
  userInfo.style.alignItems = "center";
  userInfo.style.gap = "16px";

  const userName = document.createElement("p");
  userName.innerText = params.assistantName || "Assistant";

  userName.style.cssText = `
  font-size: 25px;
  padding:0px;
  line-height: 0px;
  font-weight: 600;
`;

  userInfo.appendChild(userName);

  const resetButton = document.createElement("button");
  resetButton.style.cssText = `
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 9999px;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    color:${rgba(rgb, 0.5)};
  `;
  resetButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M110.5 131.8C145.6 90.5 197.5 64 256 64c106.1 0 192 85.9 192 192h64C512 114.6 397.4 0 256 0C179.8 0 111.7 33.4 64.9 86.2L0 21.3V192h170.7zm291 248.4c-35.2 41.3-87 67.8-145.5 67.8c-106.1 0-192-85.9-192-192H0c0 141.4 114.6 256 256 256c76.2 0 144.3-33.4 191.1-86.2l64.9 64.9V320H341.3z"/></svg>`;
  resetButton.onclick = resetChat;

  resetButton.addEventListener("mouseenter", function () {
    this.style.transition = "transform 0.3s ease";
    this.style.transform = "rotate(180deg)";
  });

  resetButton.addEventListener("mouseleave", function () {
    this.style.transition = "transform 0.3s ease";
    this.style.transform = "rotate(0deg)";
  });

  chatHeader.appendChild(userInfo);
  chatHeader.appendChild(resetButton);

  const initialResponse = document.createElement("div");
  /* initialResponse.className = "chat-response"; */
  initialResponse.style.cssText = `
    background-color: ${rgba(rgb, 0.1)};
    align-self: flex-start;
    border-radius: 0.5rem;
    color:${rgba(rgb, 0.9)};
    line-height: 1.6rem;
    text-wrap: pretty;
    max-width: 90%;
  `;
  /* initialResponse.innerHTML = `<p>${params.m1 || ""}  </p>`; */

  const initialText = document.createElement("p");

  initialText.innerText = params.m1 || "";

  initialText.style.cssText = `
  padding: 10px 16px;
  margin:0px;
  font-size: 16px;
  line-height: 180%;
  white-space: normal;  
  overflow-wrap: break-word; 
  word-wrap: break-word;
`;

  initialResponse.appendChild(initialText);

  chatBody.appendChild(initialResponse);

  const addButtonQuestion = (question) => {
    const button = document.createElement("button");
    button.className = "chat-button";
    button.style.cssText = `
      padding:8px 16px;
      background-color: #e5e7eb; 
      text-wrap: nowrap; 
      border: none;
      border-radius: 0.25rem; 
      cursor: pointer;
      font-size: 16px;
    `;
    button.innerText = question;
    button.onclick = async () => {
      try {
        addMessageUserChat(question);
        await sendMessageFetch(question);
      } catch (error) {
        console.log(error);
      }
    };
    chatButtons.appendChild(button);
  };

  if (params.q1) {
    addButtonQuestion(params.q1);
  }
  if (params.q2) {
    addButtonQuestion(params.q2);
  }
  if (params.q3) {
    addButtonQuestion(params.q3);
  }

  chatInputContainer.appendChild(chatInput);
  chatInputContainer.appendChild(chatSendButton);

  chatContainer.appendChild(chatHeader);
  chatContainer.appendChild(chatBody);
  chatContainer.appendChild(chatButtons);
  chatContainer.appendChild(chatInputContainer);

  toggleButtonContainer.appendChild(toggleButton);

  document.body.appendChild(chatContainer);
  document.body.appendChild(toggleButtonContainer);

  chatContainer.style.height = "0";
  chatContainer.style.width = "0";
  chatContainer.style.border = "0";

  // Funciones de eventos
  function toggleChat() {
    if (isOpen) {
      chatContainer.style.height = "0";
      chatContainer.style.width = "0";
      chatContainer.style.border = "0";
      chatContainer.style.padding = "0px";
      toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 15 15" style="vertical-align: middle; margin-top:2px">
        <path fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" d="m5.5 11.493l2 2.998l2-2.998h4a1 1 0 0 0 1-1V1.5a.999.999 0 0 0-1-.999h-12a1 1 0 0 0-1 1v8.994c0 .552.447.999 1 .999z" clip-rule="evenodd"></path>
    </svg>
        `;
    } else {
      chatContainer.style.height = "80%";
      chatContainer.style.width = "425px";
      chatContainer.style.border = "1px solid #e5e7eb";
      chatContainer.style.padding = "12px";
      toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1024 1024" transform="rotate(180)">
      <path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/>
    </svg>
      `;
    }
    isOpen = !isOpen;
  }

  function resetChat() {
    chatBody.innerHTML = "";
    localStorage.removeItem(params.idAssistant);
  }

  const gray = hexToRgb("#0C0D0D");

  async function sendMessage() {
    const message = chatInput.value.trim();
    addMessageUserChat(message);

    try {
      await sendMessageFetch(message);
    } catch (error) {
      console.log(error);
    }
  }

  const addMessageUserChat = (message) => {
    if (message.trim() !== "") {
      const userMessage = document.createElement("div");
      userMessage.style.cssText = `
      background-color: ${rgba(gray, 0.1)};
      align-self: flex-end;
      border-radius: 0.5rem;
      color:${rgba(gray, 0.9)};
      line-height: 180%;
      text-wrap: pretty;
      max-width: 90%;
      `;

      const ques = document.createElement("p");

      ques.innerText = message || "";

      ques.style.cssText = `
      padding: 10px 16px;
      margin:0px;
      font-size: 16px;
      white-space: normal;  
      overflow-wrap: break-word; 
      word-wrap: break-word;
    `;

      userMessage.appendChild(ques);

      chatBody.appendChild(userMessage);
      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  const addMessageAssistantChat = (message) => {
    if (message.trim() !== "") {
      const assistantMessage = document.createElement("div");
      assistantMessage.style.cssText = `
      background-color: ${rgba(rgb, 0.1)};
      align-self: flex-start;
      border-radius: 0.5rem;
      color:${rgba(rgb, 0.9)};
      line-height: 180%;
      text-wrap: pretty;
      max-width: 90%;
      `;

      const response = document.createElement("p");

      response.innerText = message || "";

      response.style.cssText = `
      padding: 10px 16px;
      margin:0px;
      font-size: 16px;
      white-space: normal;  
      overflow-wrap: break-word; 
      word-wrap: break-word;
    `;

      assistantMessage.appendChild(response);

      chatBody.appendChild(assistantMessage);
      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  const deleteLastChile = () => {
    if (chatBody.children.length > 0) {
      const lastChild = chatBody.lastElementChild;
      chatBody.removeChild(lastChild);
    }
  };

  const addLoadAssistantChat = (message) => {
    if (message.trim() !== "") {
      const assistantMessage = document.createElement("div");
      assistantMessage.style.cssText = `
      background-color: ${rgba(rgb, 0.1)};
      align-self: flex-start;
      border-radius: 0.5rem;
      color:${rgba(rgb, 0.9)};
      text-wrap: pretty;
      max-width: 90%;
      `;

      const response = document.createElement("div");

      response.innerHTML = message || "";

      response.style.cssText = `
      padding: 11px 16px;
      margin:0px 0px 0px 0px;
      display: flex; 
      justify-content: center; 
      align-items: center; 
      
    `;

      assistantMessage.appendChild(response);

      chatBody.appendChild(assistantMessage);
      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  let testSendMessage = false;

  const sendMessageFetch = async (message) => {
    /// fetch para mandar mensaje

    if (testSendMessage) {
      return;
    }

    if (message.length <= 0) {
      return;
    }

    testSendMessage = true;

    try {
      const localChat = getLocalStorageMessage(params.idAssistant);
      // Enviar el mensaje al servidor usando Fetch
      const endpointUrl = "https://backend.gotaan.cloud/api/web/chat"; // Reemplaza con la URL de tu endpoint
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          idAssistant: params.idAssistant,
          type: "web",
          messageId: localChat?.messageId,
        }),
      };

      const addElementUser = [
        ...(localChat?.messages || []),
        ...[{ role: "user", message }],
      ];

      addLoadAssistantChat(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" ><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinners3DotsFade1.end-0.375s" dur="1.125s" values="1;0.2"/></circle><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4"><animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.225s" dur="1.125s" values="1;0.2"/></circle><circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3"><animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.45s" dur="1.125s" values="1;0.2"/></circle></svg>'
      );
      const response = await fetch(endpointUrl, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const addElementChat = [
        ...(addElementUser || []),
        ...(data.data.messages || []),
      ];

      saveLocalStorage(params.idAssistant, {
        messages: addElementChat,
        messageId: data.data.messageId,
      });

      deleteLastChile();
      addMessageAssistantChat(data.data.messages[0].message);
    } catch (error) {
      deleteLastChile();
      addMessageAssistantChat("There was an error ❌");
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      testSendMessage = false;
    }
  };

  const saveLocalStorage = (idAssistant, newMessages) => {
    localStorage.setItem(idAssistant, JSON.stringify(newMessages));
  };

  const getLocalStorageMessage = (idAssistant) => {
    return JSON.parse(localStorage.getItem(idAssistant));
  };

  const initChat = () => {
    const chatLocal = getLocalStorageMessage(params.idAssistant);
    if (chatLocal?.messages) {
      chatLocal?.messages.forEach((obj) => {
        if (obj.role == "user") {
          return addMessageUserChat(obj.message);
        }
        if (obj.role == "assistant") {
          return addMessageAssistantChat(obj.message);
        }
      });
    }
  };

  initChat();

  toggleButton.addEventListener("click", toggleChat);
  chatSendButton.addEventListener("click", sendMessage);
});
