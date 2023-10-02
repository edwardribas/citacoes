(() => {
  const main = document.querySelector('main')
  const reflectionTrigger = document.querySelectorAll('.reflect')
  let loading = false
  
  const resetPage = () => {
    const container = document.querySelector('.container')
    container.classList.add('hidden')


    setTimeout(() => {
      main.removeChild(container)
      window.location.reload();
    }, 500)
  }

  const handleGenerateQuote = async () => {
    if (loading) return
    loading = true
    const oldContainer = document.querySelector('.container')
    const response = await fetch('https://api.quotable.io/random').then(e => e.json())

    const newContainer = document.createElement('div')
    const title = document.createElement('h1')
    const author = document.createElement('p')
    const buttonReflectMore = document.createElement('button')
    const buttonBack = document.createElement('button')
    const buttonWrapper = document.createElement('div')
    const textWrapper = document.createElement('div')
    
    oldContainer.classList.add('hidden')

    textWrapper.className = 'text-wrapper'
    title.innerText = response.content
    title.classList.add('title')
    author.innerText = `- ${response.author}`
    author.classList.add('typography')
    buttonReflectMore.textContent = "Refletir mais"
    buttonBack.textContent = "Voltar"

    buttonReflectMore.onclick = () => handleGenerateQuote()
    buttonBack.onclick = () => resetPage()
    
    textWrapper.append(title, author)
    buttonBack.className = 'button outline back'
    buttonReflectMore.className = ('button reflect')
    buttonWrapper.classList.add('button-wrapper')
    buttonWrapper.append(buttonReflectMore, buttonBack)

    newContainer.classList.add('container')
    newContainer.append(textWrapper, buttonWrapper)
    
    setTimeout(() => {
      main.removeChild(oldContainer)
      main.appendChild(newContainer)
      loading = false
    }, 500)
  }

  reflectionTrigger.forEach(e => e.addEventListener('click', () => {
    if (!loading) handleGenerateQuote()
  }))
})()