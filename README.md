#Jokes page Functionality

1. The page is loaded initially
2. Using the componentDidMount() function we are getting all the categories of
   jokes and we are setting these categories in state 3.Then we are displaying
   the categories using the map function.
3. The categories are shown in the form of list Items.
4. we are then using popup, a third party package to generate the popup. when
   the listItem is clicked the list item changes color as it is selected. Also
   after clicking the list item we are also storing the category in the using
   the open function function and showing a spinner while the text is being
   loaded.
5. In the popup there is a button called "Next joke button" which when clicked
   call the function to fet details of the joke. On clicking this button again
   and again it generates different jokes of the same category as the category
   is not changing.
6. There is a cross button at the top right of the popup which is used to close
   the popup on clicking. The popup is created using the react-icons.
