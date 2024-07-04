document.getElementById('dietPlannerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get selected meal time and diet preference
    var mealTime = document.getElementById('mealTime').value;
    var dietPreference = document.getElementById('dietPreference').value;

    console.log('Selected Meal Time:', mealTime);
    console.log('Selected Diet Preference:', dietPreference);

    // Get the container where the meal plan will be displayed
    var mealPlanTableBody = document.getElementById('mealPlanTableBody');

    // Clear any existing meal plan
    mealPlanTableBody.innerHTML = '';

    // Array containing meal plan data for all 7 days
    var mealPlanData = [
        {
      day: 'Day 1',
      breakfast: {
        vegetarian: "Masala Oats: Cook rolled oats with water, turmeric, cumin seeds, mustard seeds, chopped onions, tomatoes, and green chilies. Serve with a side of yogurt.",
        nonVegetarian: "Grilled Fish: Marinate fish fillets with lemon juice, turmeric, chili powder, and coriander powder. Grill until cooked. Serve with a side of mixed vegetable salad."
      },
      lunch: {
        vegetarian: "Chickpea Spinach Curry: Cook chickpeas with spinach, onions, tomatoes, ginger, garlic, and Indian spices. Serve with brown rice or whole wheat roti.",
        nonVegetarian: "Chicken Sandwich: Fill whole wheat bread with grilled chicken slices, lettuce, tomatoes, and cucumber. Serve with a side of yogurt."
      },
      dinner: {
        vegetarian: "Paneer Tikka: Marinate paneer cubes with yogurt and spices like garam masala, turmeric, and chili powder. Grill or bake until golden. Serve with mint chutney and salad.",
        nonVegetarian: "Tandoori Chicken: Marinate chicken with yogurt and tandoori spices like garam masala, ginger, garlic, and chili powder. Grill until charred. Serve with mint chutney and salad."
      }
    },
      {
        day: 'Day 2',
        breakfast: {
          vegetarian: "Vegetable Upma: Cook semolina with mustard seeds, curry leaves, onions, green chilies, and mixed vegetables. Serve with coconut chutney.",
          nonVegetarian: "Egg Bhurji: Scramble eggs with onions, tomatoes, green chilies, and spices like turmeric, cumin, and coriander. Serve with whole wheat toast."
        },
        lunch: {
          vegetarian: "Vegetable Khichdi: Cook rice and lentils with mixed vegetables like carrots, peas, and cauliflower. Season with cumin seeds, turmeric, and ginger. Serve with yogurt.",
          nonVegetarian: "Fish Curry: Cook fish with coconut milk, onions, tomatoes, ginger, garlic, and spices like turmeric, coriander, and cumin. Serve with brown rice."
        },
        dinner: {
          vegetarian: "Dal Tadka: Cook lentils with onions, tomatoes, ginger, garlic, and spices. Temper with cumin seeds, mustard seeds, and dried red chilies. Serve with steamed rice.",
          nonVegetarian: "Mutton Curry: Cook mutton with onions, tomatoes, ginger, garlic, and spices like garam masala, coriander, and cumin. Serve with brown rice or whole wheat roti."
        }
      },
      // Repeat the above structure for Day 3 to Day 7
      {
        day: 'Day 3',
        breakfast: {
          vegetarian: "Vegetable Sandwich: Fill whole wheat bread with sliced cucumber, tomatoes, bell peppers, and lettuce. Serve with a side of yogurt.",
          nonVegetarian: "Chicken Soup: Cook chicken with mixed vegetables, onions, garlic, and spices. Serve hot with a slice of whole wheat bread."
        },
        lunch: {
          vegetarian: "Vegetable Stir-Fry: Stir-fry mixed vegetables like bell peppers, broccoli, carrots, and beans with tofu or paneer. Season with soy sauce and ginger. Serve with quinoa.",
          nonVegetarian: "Egg Curry: Boil eggs and cook in a tomato-onion gravy with Indian spices. Serve with brown rice or whole wheat roti."
        },
        dinner: {
          vegetarian: "Vegetable Biryani: Cook basmati rice with mixed vegetables, onions, tomatoes, and biryani spices like cloves, cardamom, and saffron. Serve with cucumber raita.",
          nonVegetarian: "Beef Stew: Cook beef with potatoes, carrots, onions, and spices. Serve hot with a slice of whole wheat bread."
        }
      },
      {
        day: 'Day 4',
        breakfast: {
          vegetarian: "Poha: Cook flattened rice with mustard seeds, curry leaves, onions, green chilies, and peanuts. Garnish with lemon juice and fresh coriander.",
          nonVegetarian: "Salmon Salad: Grill salmon fillets and serve over mixed greens, cherry tomatoes, cucumber, and avocado. Dress with olive oil and lemon juice."
        },
        lunch: {
          vegetarian: "Vegetable Soup: Make a hearty soup with mixed vegetables, lentils, onions, tomatoes, and spices like cumin, coriander, and turmeric. Serve with whole wheat bread.",
          nonVegetarian: "Shrimp Pasta: Cook shrimp with garlic, tomatoes, spinach, and chili flakes. Toss with cooked pasta and a drizzle of olive oil."
        },
        dinner: {
          vegetarian: "Mushroom Risotto: Cook Arborio rice with mushrooms, onions, garlic, and vegetable broth. Stir in Parmesan cheese and butter until creamy.",
          nonVegetarian: "Lamb Chops: Marinate lamb chops with rosemary, garlic, olive oil, salt, and pepper. Grill until desired doneness. Serve with roasted vegetables."
        }
      },
      {
        day: 'Day 5',
        breakfast: {
          vegetarian: "Smoothie Bowl: Blend frozen berries, banana, spinach, and almond milk until smooth. Top with granola, sliced fruits, and nuts.",
          nonVegetarian: "Turkey Bacon Omelette: Fill an omelette with turkey bacon, bell peppers, onions, and cheese. Serve with whole wheat toast."
        },
        lunch: {
          vegetarian: "Quinoa Salad: Mix cooked quinoa with black beans, corn, cherry tomatoes, bell peppers, and avocado. Dress with lime juice and olive oil.",
          nonVegetarian: "Beef Stir-Fry: Stir-fry beef strips with broccoli, bell peppers, carrots, and onions in a soy-ginger sauce. Serve with brown rice."
        },
        dinner: {
          vegetarian: "Eggplant Parmesan: Bread and bake eggplant slices until golden. Layer with marinara sauce and mozzarella cheese. Bake until bubbly.",
          nonVegetarian: "Chicken Caesar Salad: Grill chicken breast and slice. Toss with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing."
        }
      },
      {
        day: 'Day 6',
        breakfast: {
          vegetarian: "Yogurt Parfait: Layer Greek yogurt with granola, sliced fruits, and honey. Repeat layers until the glass is full.",
          nonVegetarian: "Sausage Breakfast Burrito: Fill a whole wheat tortilla with scrambled eggs, cooked sausage, cheese, and salsa."
        },
        lunch: {
          vegetarian: "Caprese Sandwich: Layer sliced tomatoes, fresh mozzarella, and basil leaves on whole wheat bread. Drizzle with balsamic glaze.",
          nonVegetarian: "Pulled Pork Sandwich: Slow-cook pork shoulder with barbecue sauce until tender. Serve on a whole wheat bun with coleslaw."
        },
        dinner: {
          vegetarian: "Vegetarian Chili: Cook kidney beans, black beans, tomatoes, onions, bell peppers, and spices in a slow cooker. Serve with cornbread.",
          nonVegetarian: "Salmon with Roasted Vegetables: Bake salmon fillets with a mix of seasonal vegetables tossed in olive oil, salt, and pepper."
        }
      },
      {
        day: 'Day 7',
        breakfast: {
          vegetarian: "Avocado Toast: Mash ripe avocado on whole wheat toast. Top with sliced tomatoes, red pepper flakes, and a drizzle of olive oil.",
          nonVegetarian: "Ham and Cheese Croissant: Fill a croissant with sliced ham, Swiss cheese, and Dijon mustard. Warm in the oven until cheese melts."
        },
        lunch: {
          vegetarian: "Mediterranean Bowl: Combine cooked quinoa, chickpeas, cucumber, tomatoes, olives, and feta cheese. Dress with lemon-tahini dressing.",
          nonVegetarian: "Shrimp Tacos: Grill shrimp with taco seasoning. Fill tortillas with shrimp, cabbage slaw, avocado slices, and salsa."
        },
        dinner: {
          vegetarian: "Vegetable Paella: Cook Arborio rice with saffron, bell peppers, tomatoes, peas, and artichokes. Serve with lemon wedges.",
          nonVegetarian: "Beef Tacos: Cook ground beef with taco seasoning. Fill tortillas with beef, lettuce, cheese, and salsa."
        }
      }
    ];
  
    // Loop through the meal plan data and display the appropriate meal based on meal time and diet preference
    mealPlanData.forEach(function(day) {
      var meal = '';
      switch(mealTime) {
        case 'breakfast':
          meal = day.breakfast[dietPreference];
          break;
        case 'lunch':
          meal = day.lunch[dietPreference];
          break;
        case 'dinner':
          meal = day.dinner[dietPreference];
          break;
        default:
          meal = 'Invalid meal time';
      }
  
      // Create table row and insert meal details
      var row = document.createElement('tr');
      var dayCell = document.createElement('td');
      dayCell.textContent = day.day;
      var mealCell = document.createElement('td');
      mealCell.textContent = meal;
      row.appendChild(dayCell);
      row.appendChild(mealCell);
      mealPlanTableBody.appendChild(row);
    });
  
    // Display the popup
    document.getElementById('dietPlanPopup').style.display = 'block';
  });
  
  function closePopup() {
    // Close the popup
    document.getElementById('dietPlanPopup').style.display = 'none';
  }
  