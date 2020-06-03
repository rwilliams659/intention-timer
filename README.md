# Intention Timer - Group Project #

## About the Project ##  

This is a Turing School Front End module 1 group project. Our goal was to build an application that allows a user to set goals for their health and productivity, tied to an amount of time. Users will select an activity category, set the amount of time they want to spend on that activity, and start the timer. The app will log that activity to keep track of how the user has been spending their time. [See more information about the project here.](https://frontend.turing.io/projects/module-1/intention-timer-group.html)

## Group Members ##

**Contributer:** [Ian Holladay](https://github.com/holladayian)  
**Contributer:** [Kyle Jones](https://github.com/KJJones13)  
**Contributer:** [Rachel Williams](https://github.com/rwilliams659)  
**Project Manager:** [Scott Ertmer](https://github.com/sertmer)

## Project Progress ##  

#### Iteration 0 #####

Our first task was to build the layout of our Intention Timer application using HTML and CSS, without building in any JavaScript functionality. We used semantic HTML elements throughout where appropriate to ensure we make the application accessible, and tried to use as simple yet effective CSS as possible.

**Insert screenshot of form (not filled out)**

#### Iteration 1 ####

Next, we were tasked with creating an Activity class, with pre-defined properties and methods. We created this class with the understanding that class instances would be created and stored each time a user fills out the form pictured above, and that these instances would be used to create Past Activity cards later on as well.

#### Iteration 2 ####

This portion of the project involved several steps. First, we added functionality to the form by making each category button change border, text, and icon color when clicked, to the colors specified in our project brief.

**Insert image of form with button clicked (so color appears)**

Next, we added several form validation functions. The first disables any character that is not a number from being entered in the minutes and seconds form fields. The second checks to see if all of the form fields have an input, and if not, checks each individually and inserts error messages for those missing a value.

**Insert screenshot with form with error messages**

When a user has filled out all fields and clicks the "Start Activity" button, their information is stored as an instance of our Activity class. Additionally, that button click triggers a timer clock to display in place of the form. The timer clock has a circle outline that matches the color of the selected category, and displays the user-provided description and time.

**Insert giphy for filling out form & then timer clock displaying**

#### Iteration 3 ####

Next, we created a function to make our timer functional, using the setInterval method. We were able to achieve this so when a user clicks "Start", the timer begins counting down and continues down to 0 seconds. At this stage of the project, we added a temporary alert that pops up when the timer completes.

**Insert giphy of timer counting down from 5 seconds to 0**

#### Iteration 4 ####

Then, we removed the temporary alert and instead added functionality to display a congratulatory message when the timer reaches 0, along with a new "Log Activity" button.

**Insert screenshot of congratulatory message on timer**

When the user clicks this "Log Activity" button, a past Activity card appears on the right-hand side of the application, which displays the activity description, time, and a color-coded line matching the category type of that activity.

**Insert screenshot of 2-3 past activities displayed**

#### Iteration 5 ####

The last task of the project was to allow past activities to persist after a user refreshes the page. We used localStorage to achieve this, so past activities will persist even when a user navigates away from the application, until the local storage is cleared out.

#### Additional Features ####

We also made our application responsive, so it displays correctly on mobile as well.

**Insert mobile screenshot**
