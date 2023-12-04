import React, { useState } from "react";
import axios from "axios";

const CreateMealBasedOnIngredients = () => {
    const [customIngredients, setCustomIngredients] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedMeal, setGeneratedMeal] = useState("");
    const [error, setError] = useState(null);

    const openaiApiKey = "Inset Key Here"; // Replace with your OpenAI API key
    const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const handleCustomIngredientsChange = (event) => {
        setCustomIngredients(event.target.value);
    };

    const handleCreateRecipe = async () => {
        try {
            setLoading(true);
            setError(null);

            const prompt = `Create recipe using: ${customIngredients}`;

            const response = await axios.post(
                apiEndpoint,
                {
                    prompt,
                    max_tokens: 300,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${openaiApiKey}`,
                    },
                }
            );

            const formattedText = response.data.choices[0].text.trim();
            setGeneratedMeal(formattedText);
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            setError("Failed to generate meal. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
            <h2>Create Meal Based on Ingredients</h2>
            <div>
                <label>
                    Custom Ingredient:
                    <input
                        type="text"
                        value={customIngredients}
                        onChange={handleCustomIngredientsChange}
                    />
                </label>
            </div>

            {/* Button to create the meal */}
            <button style={{ marginTop: "10px" }} onClick={handleCreateRecipe} disabled={loading}>
                {loading ? "Generating..." : "Try a new recipe"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {generatedMeal && (
                <div>
                    <h3>Generated Meal:</h3>
                    <pre>{generatedMeal}</pre>
                </div>
            )}
        </div>
    );
};

export default CreateMealBasedOnIngredients;