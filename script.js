const buttonData = document.getElementById('enviarData')
let clicks = 0

buttonData.onclick = function countdown() {

    clicks++

    
    const data = document.getElementById('dataAlvo')

    // Convertendo o formato do valor passado ao new Date a seguir para que não dê problema com fuso horario
    const dataValueFormat = data.value.replaceAll('-', ',')
    const dataInserida = new Date(dataValueFormat).getTime()
        
    const x = setInterval(function () {

        const dataAtual = new Date().getTime()


        let distancia = dataInserida - dataAtual

        //Transformando os milissegundos em dias/horas/minutos/segundos
        const days = Math.floor(distancia/ (1000 * 60 * 60 * 24))
        const hours = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor ((distancia % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor ((distancia % (1000 * 60)) / 1000)


        //Inserindo os valores no HTML
        document.getElementById('days').innerHTML = days
        document.getElementById('hours').innerHTML = hours
        document.getElementById('minutes').innerHTML = minutes
        document.getElementById('seconds').innerHTML = seconds


        // Caso o timer zere
        if (distancia < 0) {
            clearInterval(x)
            document.getElementById('days').innerHTML = 'd'
            document.getElementById('hours').innerHTML = 'o'
            document.getElementById('minutes').innerHTML = 'n'
            document.getElementById('seconds').innerHTML = 'e'
        }

        // Para que não execute 2 datas simultaneamente caso eu troque de data e clique em enviar
        if (clicks > 1) {
            clearInterval(x)
            clicks = 1
        }
    }, 1000)

    
}
