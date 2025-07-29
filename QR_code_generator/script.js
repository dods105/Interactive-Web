const imageContainer = document.querySelector('.img-container')
const image = document.querySelector('img')
const button = document.querySelector('button')
const inputText = document.querySelector('input')


button.addEventListener('click', () => {
    console.log('generating')
    console.log(inputText.value)
    image.src = ''
    if (inputText.value.length > 0){
        imageContainer.style.display = 'block';
        image.src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + inputText.value;
    }else{
        imageContainer.style.display = 'none';
    }
})