(() => {
  const main = document.querySelector("main");
  let isQuoteLoading = false;

  const createTitle = (text) => {
    const title = document.createElement("h1");
    title.textContent = text;
    title.className = "title";
    return title;
  };

  const createTypography = (text) => {
    const typography = document.createElement("p");
    typography.textContent = text;
    typography.className = "typography";
    return typography;
  };

  const createButton = (text, outline) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "button" + (!!outline ? " outline" : "");
    return button;
  };

  const createTextWrapper = (titleMessage, bodyMessage) => {
    const title = createTitle(titleMessage);
    const body = createTypography(bodyMessage);
    const textWrapper = document.createElement("div");
    textWrapper.className = "text-wrapper";
    textWrapper.append(title, body);
    return textWrapper;
  };

  const createContainer = () => {
    const container = document.createElement("div");
    return container;
  };

  const loadNewScreen = ({ oldContainer, newContainer }) => {
    oldContainer?.classList.add("hidden");
    clearTimeout(timeoutId);

    var timeoutId = setTimeout(() => {
      oldContainer && main.removeChild(oldContainer);
      main.appendChild(newContainer);
      newContainer.classList.add("container");
      isQuoteLoading = false;
    }, 500);
  };

  const handleGenerateQuote = async () => {
    if (isQuoteLoading) return;
    isQuoteLoading = true;

    const oldContainer = document.querySelector(".container");
    const response = await fetch("https://api.quotable.io/random").then((e) =>
      e.json()
    );

    const generateMoreBtn = createButton("Refletir mais", false);
    const loadHomeBtn = createButton("Voltar", true);

    generateMoreBtn.onclick = () => handleGenerateQuote();
    loadHomeBtn.onclick = () => loadNewScreen(generateHome());

    const heading = createTextWrapper(response.content, `- ${response.author}`);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "button-wrapper";
    buttonWrapper.append(generateMoreBtn, loadHomeBtn);

    const newContainer = document.createElement("div");
    newContainer.append(heading, buttonWrapper);

    loadNewScreen({ oldContainer, newContainer });
  };

  const generateHome = () => {
    const heading = createTextWrapper(
      "O poder da reflexão",
      "Sabia que tirar um tempinho para relaxar pode te tornar alguém bem mais produtivo? Aproveite esse tempinho para ver algumas frases relaxantes!"
    );
    const button = createButton("Refletir um pouco");
    button.onclick = () => !isQuoteLoading && handleGenerateQuote();

    const newContainer = createContainer();
    const oldContainer = document.querySelector(".container");

    newContainer.append(heading, button);

    return { oldContainer, newContainer };
  };

  window.onload = () => {
    loadNewScreen(generateHome());
  };
})();