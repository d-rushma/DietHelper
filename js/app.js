class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCalories();
    this._displayCaloriesLimit();
    this._displayCaloriesCosumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
    this._render();
  }
  _displayCalories() {
    const totalCalories = document.querySelector("#total");
    totalCalories.innerHTML = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const caloriesLimit = document.querySelector("#climit");
    caloriesLimit.innerHTML = this._calorieLimit;
  }
  _displayCaloriesCosumed() {
    const consumedEl = document.querySelector("#consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    consumedEl.innerHTML = consumed;
  }
  _displayCaloriesBurned() {
    const burnedEl = document.querySelector("#burned");
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    burnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const progressEl = document.querySelector("#calorie-progress");
    const remainingEl = document.querySelector("#remaining");
    const remaining = this._calorieLimit - this._totalCalories;
    remainingEl.innerHTML = remaining;
    if (remaining <= 0) {
      remainingEl.parentElement.parentElement.classList.remove("bg-light");
      remainingEl.parentElement.parentElement.classList.add("bg-danger");
      progressEl.classList.remove("bg-primary");
      progressEl.classList.add("bg-danger");
    } else {
      remainingEl.parentElement.parentElement.classList.remove("bg-danger");
      remainingEl.parentElement.parentElement.classList.add("bg-light");
      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-primary");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.querySelector("#calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
    progressEl.classList.add("bg-primary");
  }

  _displayNewMeal(meal) {
    const mealsEl = document.querySelector("#meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add("card", "my-2");
    mealEl.setAttribute("data-id", meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div
        class="fs-2 text-white text-center rounded-2 px-2 px-sm-5"
        style="background-color: rgb(189, 181, 189)"
      >
        ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>`;
    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.querySelector("#workout-items");
    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card", "my-2");
    workoutEl.setAttribute("data-id", workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div
        class="fs-2 text-white text-center rounded-2 px-2 px-sm-5"
        style="background-color: rgb(189, 181, 189)"
      >
        ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>`;
    workoutsEl.appendChild(workoutEl);
  }

  _render() {
    this._displayCalories();
    this._displayCaloriesCosumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); // to generate random hexadecimal
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); // to generate random hexadecimal
    this.name = name;
    this.calories = calories;
  }
}

class Main {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }
  _newMeal(e) {
    e.preventDefault();
    const name = document.querySelector("#meal-name");
    const calories = document.querySelector("#meal-calories");
    if (name.value === " " || calories.value === " " || calories.value <= 0) {
      alert("Enter valid inputs");
      return;
    }
    const meal = new Meal(name.value, +calories.value);
    this._tracker.addMeal(meal);
    name.value = "";
    calories.value = "";
    const collapseMeal = document.querySelector("#collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }
  _newWorkout(e) {
    e.preventDefault();
    const name = document.querySelector("#workout-name");
    const calories = document.querySelector("#workout-calories");
    if (name.value === " " || calories.value === " " || calories.value <= 0) {
      alert("Enter valid inputs");
      return;
    }
    const workout = new Workout(name.value, +calories.value);
    this._tracker.addWorkout(workout);
    name.value = "";
    calories.value = "";
    const collapseWorkout = document.querySelector("#collapse-workout");
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const main = new Main();
