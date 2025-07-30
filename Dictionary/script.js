const button = document.querySelector('button')
const inputText = document.querySelector('input')
const card = document.querySelector('.card')
const box = document.querySelector('#box')
const notFound = document.getElementById('not-found')


button.addEventListener('click', () =>{

    notFound.textContent = ''
    box.style.display = 'none'

    const text = inputText.value.toLocaleLowerCase()

    if(text){
        getData(text) 
    }else{
        word.textContent= ''
        definition.textContent = ''
        box.style.display = 'none'
    }
})

async function getData(text){
    const APIurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`

    const result = await fetch(APIurl).then(response => response.json())
    displayData(result,  text)

}

function displayData(result, word){

    console.log(result)

    if(result.title){
        notFound.innerText = `Can't find the meaning of ${word}`
    }else{
        box.style.display = 'block'
        const wordMeaning = result[0].meanings[1]
        console.log(result[0].meanings[1].definitions[0].definition); 

        document.getElementById('word').textContent = word

        document.getElementById('definition').textContent = '';
        document.getElementById('synonyms').textContent = '';
        document.getElementById('antonyms').textContent = '';

        wordMeaning.definitions.slice(0, 3).forEach((def, index) => {
            document.getElementById('definition').innerHTML += `${index + 1}. ${def.definition}<br>`;
        });
        
        // Show up to 3 synonyms
        const synonyms = wordMeaning.synonyms || [];
        if (synonyms.length > 0) {
            synonyms.slice(0, 5).forEach(synonym => {
                document.getElementById('synonyms').textContent += `${synonym}, `;
            });
        } else {
            document.querySelector('.synonym').style.display = 'none';
        }
        
        // Show up to 3 antonyms
        const antonyms = wordMeaning.antonyms || [];
        if (antonyms.length > 0) {
            antonyms.slice(0, 5).forEach(antonym => {
                document.getElementById('antonyms').textContent += `${antonym}, `;
            });
        } else {
            document.querySelector('.antonym').style.display = 'none';
        }

 
    }

    

}