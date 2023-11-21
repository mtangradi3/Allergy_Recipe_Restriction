
const openai = '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';
const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';


function createRecipe() {
    const ingredientsInput = document.getElementById('ingredients').value;

    axios.post(apiEndpoint, {
        prompt: `Can you give me a recipe based on these ingredients: "${ingredientsInput}"`,
        max_tokens: 300
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai}`
        }
    })
        .then(response => {
            const resultText = response.data.choices[0].text.trim();
            document.getElementById('result').innerText = resultText;
        })
        .catch(error => {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error during request setup:', error.message);
            }
            console.error('Error config:', error.config);
        });
        
        document.getElementById('createRecipeButton').addEventListener('click', createRecipe);
}
