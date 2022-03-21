const buttonData = document.getElementById("enviarData");
let clicks = 0;

let progressBarContainer = null;
let progressBar = null;
let progressBarValue = 1;

let insertedDate;

let y;

function createProgressBar() {
  const createProgressBarContainer = document.createElement("div");
  const getContainerDocument = document.querySelector(".container");
  getContainerDocument.appendChild(createProgressBarContainer);
  progressBarContainer = document.querySelectorAll(".container > div");
  createProgressBarContainer.setAttribute("id", "progressBar");

  const createProgressBar = document.createElement("progress");
  createProgressBarContainer.appendChild(createProgressBar);
  progressBar = document.querySelector("progress");
  progressBar.setAttribute("value", 0);
}

buttonData.onclick = function countdown() {
  const getStartDate = localStorage.getItem("startDate");
  if (clicks === 0 && !getStartDate) {
    createProgressBar();
  }

  clicks++;

  // Resetando para não manter nada do valor salvo anteriormente no cache
  clearInterval(y);
  progressBarValue = 0;

  const data = document.getElementById("dataAlvo");

  // Salvando a data atual do momento que o botão for clicado
  localStorage.setItem("startDate", new Date().getTime());

  // Salvando o valor inserido no input para inserir no refresh
  localStorage.setItem("inputValue", data.value);

  //console.log(data.value, 'aqui')

  // Convertendo o formato do valor passado ao new Date a seguir para que não dê problema com fuso horario
  const dataValueFormat = data.value.replaceAll("-", ",");
  insertedDate = new Date(dataValueFormat).getTime();

  // Salvando a data em milissegundos
  localStorage.setItem("insertedDate", insertedDate);
  //console.log(insertedDate)
  const storedDateNumber = Number(localStorage.getItem("insertedDate"));
  //console.log(storedDateNumber, 'storedDateNumber')

  // Valor máximo da barra de progresso
  const progressBarMax = insertedDate - new Date().getTime();
  progressBar.setAttribute("max", progressBarMax / 1000);

  const x = setInterval(function () {
    const currentDate = new Date().getTime();
    let difference = insertedDate - currentDate;
    console.log(difference);

    // Barra de progresso aumentando o valor a cada segundo
    progressBar.setAttribute("value", progressBarValue++);
    //console.log(progressBar, 'fora do refreshe')

    // Transformando os milissegundos em dias/horas/minutos/segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Inserindo os valores no HTML
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Caso o timer zere
    if (difference < 0) {
      clearInterval(x);
      document.getElementById("days").innerHTML = "d";
      document.getElementById("hours").innerHTML = "o";
      document.getElementById("minutes").innerHTML = "n";
      document.getElementById("seconds").innerHTML = "e";
    }

    // Para que não execute 2 datas simultaneamente caso eu troque de data e clique em enviar
    if (clicks > 1) {
      clearInterval(x);
      clicks = 1;
    }
  }, 1000);
};

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //console.log('recarregou')

  const storedDateNumber = Number(localStorage.getItem("insertedDate"));

  insertedDate = storedDateNumber;

  // Valor a ser inserido no input, data anteriormente inserida ao clicar no botão
  const inputValue = localStorage.getItem("inputValue");

  // Atribuindo o valor ao input
  const data = document.getElementById("dataAlvo");
  data.setAttribute("value", inputValue);

  if (insertedDate > 0) {
    createProgressBar();
    const startDate = Number(localStorage.getItem("startDate"));

    const progressBarMax = insertedDate - startDate;
    console.log(progressBarMax / 1000);
    progressBar.setAttribute("max", progressBarMax / 1000);

    // Atributo value da barra de progresso sendo definido para que em cada refresh ele não zere e continue contando
    progressBarValue =
      progressBarValue + (new Date().getTime() - startDate) / 1000;

    y = setInterval(function () {
      const currentDate = new Date().getTime();
      let difference = insertedDate - currentDate;

      // Configurando o value da barra de progresso
      progressBar.setAttribute("value", progressBarValue++);
      //console.log(progressBar, 'refresh')

      // Transformando os milissegundos em dias/horas/minutos/segundos
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Inserindo os valores no HTML
      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      // Caso o timer zere
      if (difference < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "d";
        document.getElementById("hours").innerHTML = "o";
        document.getElementById("minutes").innerHTML = "n";
        document.getElementById("seconds").innerHTML = "e";
      }

      // Para que não execute 2 datas simultaneamente caso eu troque de data e clique em enviar
      if (clicks > 1) {
        clearInterval(x);
        clicks = 1;
      }
    }, 1000);
  }
}
