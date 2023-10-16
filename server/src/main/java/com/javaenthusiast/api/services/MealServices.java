    package com.javaenthusiast.api.services;

    import com.javaenthusiast.exceptions.CustomDatabaseException;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.dao.DataAccessException;
    import org.springframework.jdbc.core.JdbcTemplate;
    import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
    import org.springframework.jdbc.core.namedparam.SqlParameterSource;
    import org.springframework.jdbc.core.simple.SimpleJdbcCall;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;

    import java.util.ArrayList;
    import java.util.Base64;
    import java.util.List;
    import java.util.Map;

    /**
     * Author: Marcus Tangradi
     */


    @Service
    public class MealServices {

        @Autowired
        private JdbcTemplate jdbcTemplate;


        public List<String> getAllIngredients() {
            List<String> allIngredients =  new ArrayList<>();
            List<Map<String, Object>> tempIngredients = new ArrayList<>();

            SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_ingredients");

            try {
                Map<String, Object> out = call.execute();
                tempIngredients = (List<Map<String, Object>>) out.get("#result-set-1");

                tempIngredients.forEach(tempMap ->{
                    allIngredients.add((String)tempMap.get("ingredient_name"));
                });

                // This check is no longer necessary as allIngredients is never null
                // if(allIngredients == null) {
                //     allIngredients = new ArrayList<>();
                // }
            } catch (DataAccessException e) {
                throw new CustomDatabaseException("Error getting all ingredients", e);
            }

            return allIngredients;
        }

        public void insertNewMeal(String mealName, MultipartFile mealImage, String email, List<String> ingredients) {

            // Prepare to call the stored procedure for creating a meal
            SimpleJdbcCall mealCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("create_meal");

            try {
                // Convert the MultipartFile to a byte array, which can be handled by the database as a BLOB
                byte[] imageBytes = mealImage.getBytes();

                // Using MapSqlParameterSource to pass parameters to the stored procedure
                SqlParameterSource mealIn = new MapSqlParameterSource()
                        .addValue("mealName", mealName)
                        .addValue("mealImage", imageBytes)  // Passing byte array instead of MultipartFile
                        .addValue("email", email);

                // Execute the stored procedure to create a meal
                mealCall.execute(mealIn);

            } catch (Exception e) {
                // Handle exceptions related to file handling and stored procedure execution.
                System.err.println(e);
                throw new CustomDatabaseException("Error creating new meal", e);
            }

            // Insert ingredients into the meal
            ingredients.forEach(tempIngredient ->{
                SimpleJdbcCall ingredientCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("meal_made_of_ingredient");

                SqlParameterSource in = new MapSqlParameterSource()
                        .addValue("ingredient_name", tempIngredient)
                        .addValue("meal_name", mealName);

                try {
                    ingredientCall.execute(in);

                } catch (DataAccessException e) {
                    // Handle exception related to the stored procedure here.
                    throw new CustomDatabaseException("Error inserting ingredients into new meal", e);
                }
            });
        }



        public List<Map<String, Object>> getAllMeals() {
            List<Map<String, Object>> allMeals =  new ArrayList<>();
            List<Map<String, Object>> tempMeals = new ArrayList<>();

            SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_all_meals");

            try {
                Map<String, Object> out = call.execute();
                tempMeals = (List<Map<String, Object>>) out.get("#result-set-1");

                tempMeals.forEach(tempMap -> {
                    Object imageBlob = tempMap.get("meal_image");
                    if (imageBlob != null && imageBlob instanceof byte[]) {
                        byte[] imageBytes = (byte[]) imageBlob;
                        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);
                        tempMap.put("meal_image", encodedImage);
                    }
                    allMeals.add(tempMap);
                });

            } catch (DataAccessException e) {
                throw new CustomDatabaseException("Error getting all meals", e);
            }

            return allMeals;
        }


        public List<String> getmealIngredients(String mealName) {
            List<String> mealIngredients =  new ArrayList<>();
            List<Map<String, Object>> tempIng = new ArrayList<>();

            SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_meal_ingredients");


            SqlParameterSource mealIn = new MapSqlParameterSource()
                    .addValue("meal_name", mealName);

            try {
                Map<String, Object> out = call.execute(mealIn);
                tempIng = (List<Map<String, Object>>) out.get("#result-set-1");

                tempIng.forEach(tempMap ->{
                    mealIngredients.add((String)tempMap.get("ingredient_name"));
                });

                // This check is no longer necessary as allIngredients is never null
                // if(allIngredients == null) {
                //     allIngredients = new ArrayList<>();
                // }
            } catch (DataAccessException e) {
                throw new CustomDatabaseException("Error a meal's ingredients", e);
            }

            return mealIngredients;

        }

        public List<Map<String, Object>> getAllMealsWithAllergy(String email) {
            List<Map<String, Object>>mealIngredients =  new ArrayList<>();
            List<Map<String, Object>> tempmal = new ArrayList<>();

            SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_possible_meals_with_allergy");


            SqlParameterSource mealIn = new MapSqlParameterSource()
                    .addValue("email", email);

            try {
                Map<String, Object> out = call.execute(mealIn);
                tempmal = (List<Map<String, Object>>) out.get("#result-set-1");

                tempmal.forEach(tempMap ->{
                    mealIngredients.add(tempMap);
                });

                // This check is no longer necessary as allIngredients is never null
                // if(allIngredients == null) {
                //     allIngredients = new ArrayList<>();
                // }
            } catch (DataAccessException e) {
                throw new CustomDatabaseException("Error getting possible meals with  allergies ", e);
            }

            return mealIngredients;


        }
    }
