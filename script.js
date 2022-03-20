const buttonData = document.getElementById('enviarData')
let clicks = 0
const progressBar = document.querySelector('progress')
let progressBarValue = 1
let insertedDate

let y

buttonData.onclick = function countdown() {

    clicks++
    // Resetando para não manter nada do valor salvo anteriormente no cache
    clearInterval(y)
    progressBarValue = 0

    const data = document.getElementById('dataAlvo')

    // Convertendo o formato do valor passado ao new Date a seguir para que não dê problema com fuso horario
    const dataValueFormat = data.value.replaceAll('-', ',')
    insertedDate = new Date(dataValueFormat).getTime()

    localStorage.setItem('insertedDate', insertedDate)
    console.log(insertedDate)
    const storedDateNumber = Number(localStorage.getItem('insertedDate'))
    console.log(storedDateNumber, 'storedDateNumber')

    // Valor máximo da barra de progresso
    const progressBarMax = insertedDate - new Date().getTime()
    progressBar.setAttribute("max", progressBarMax/1000) 


    const x = setInterval(function () {

        const dataAtual = new Date().getTime()
        let difference = insertedDate - dataAtual

        // Barra de progresso aumentando o valor a cada segundo
        progressBar.setAttribute("value", progressBarValue++)
        //console.log(progressBar)

        // Transformando os milissegundos em dias/horas/minutos/segundos
        const days = Math.floor(difference/ (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor ((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor ((difference % (1000 * 60)) / 1000)


        // Inserindo os valores no HTML
        document.getElementById('days').innerHTML = days
        document.getElementById('hours').innerHTML = hours
        document.getElementById('minutes').innerHTML = minutes
        document.getElementById('seconds').innerHTML = seconds


        // Caso o timer zere
        if (difference < 0) {
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


if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //console.log('recarregou')

    
    const storedDateNumber = Number(localStorage.getItem('insertedDate'))

    insertedDate = storedDateNumber

    if (insertedDate > 0){
        progressBar.setAttribute("max", (insertedDate - new Date().getTime()/1000))
        
        y = setInterval(function () {
            
            const dataAtual = new Date().getTime()
            let difference = insertedDate - dataAtual
            
            // Barra de progresso aumentando o valor a cada segundo
            progressBar.setAttribute("value", progressBarValue++)
            // Console.log(progressBar, 'refresh')
            
            // Transformando os milissegundos em dias/horas/minutos/segundos
            const days = Math.floor(difference/ (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor ((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor ((difference % (1000 * 60)) / 1000)            
            
            // Inserindo os valores no HTML
            document.getElementById('days').innerHTML = days
            document.getElementById('hours').innerHTML = hours
            document.getElementById('minutes').innerHTML = minutes
            document.getElementById('seconds').innerHTML = seconds
            
            
            // Caso o timer zere
            if (difference < 0) {
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
}