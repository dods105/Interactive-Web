const textInput = document.querySelector('#text')
const form = document.querySelector('form')
const displayResult = document.querySelector('#result')
const encrypt = document.querySelector('#encrypt');
const decrypt = document.querySelector('#decrypt');

let isEncrypt = true

encrypt.addEventListener('click', function(){
    isEncrypt = true;
})

decrypt.addEventListener('click', function(){
    isEncrypt = false;
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    displayResult.textContent = ''
    const text = textInput.value;
    let keyValue = document.querySelector('#input').value;

    if(keyValue === ''){
        alert('Input Value')
        return NaN
    }

    const key = parseInt(keyValue)

    let result = ''

    for(let i = 0; i < text.length; i++){
        let char = text[i];

        if(isEncrypt){

            if(char >= 'A' && char <= 'Z'){
                let asciiCase = char.charCodeAt(0);

                let decrypted = String.fromCharCode(((asciiCase - 65 + key + 26) % 26) + 65);
                console.log(decrypted)
                result+=decrypted
            }else if(char >= 'a' && char <= 'z'){
                let asciiCase = char.charCodeAt(0);

                let decrypted = String.fromCharCode(((asciiCase - 97 + key + 26) % 26) + 97);
                console.log(decrypted)
                result+=decrypted
            }else{
                result+=char
            }
        }else{
            if(char >= 'A' && char <= 'Z'){
                let asciiCase = char.charCodeAt(0);
    
                let decrypted = String.fromCharCode(((asciiCase - 65 - key + 26) % 26) + 65);
                console.log(decrypted)
                result+=decrypted
            }else if(char >= 'a' && char <= 'z'){
                let asciiCase = char.charCodeAt(0);
    
                let decrypted = String.fromCharCode(((asciiCase - 97 - key + 26) % 26) + 97);
                console.log(decrypted)
                result+=decrypted
            }else{
                result+=char
            }
        }
        
    }
    displayResult.textContent = result;
    displayResult.style.display = 'block'
})